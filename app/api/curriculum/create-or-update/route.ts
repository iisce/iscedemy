import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreateCurriculumSchema } from "@/schemas";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    // Check if the user is authenticated and is a tutor
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to create or update a curriculum" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can create or update a curriculum" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = CreateCurriculumSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Validation failed: " + validatedData.error.message },
        { status: 400 }
      );
    }

    const { courseId, modules } = validatedData.data;

    // Step 1: Fetch existing curriculum and lessonKeys outside transaction
    const existingCurriculum = await db.curriculum.findUnique({
      where: { courseId },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    const oldLessons = existingCurriculum?.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        lessonKey: lesson.lessonKey,
        moduleId: lesson.moduleId,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        videoUrl: lesson.videoUrl,
        order: lesson.order,
      }))
    ) || [];

    const existingLessonKeys = new Set(
      (await db.lesson.findMany({ select: { lessonKey: true } })).map(l => l.lessonKey)
    );

    // Step 2: Use a transaction for atomic operations
    const result = await db.$transaction(async (prisma) => {
      try {
        // Create or update the curriculum
        const curriculum = await prisma.curriculum.upsert({
          where: { courseId },
          update: {},
          create: {
            courseId,
          },
        });

        // Collect existing and new modules
        const existingModules = existingCurriculum?.modules || [];
        const newModulesMap = new Map<string, any>(); // Map of module order to module data

        // Process modules (update existing or create new)
        for (const moduleData of modules) {
          const existingModule = existingModules.find(m => m.order === moduleData.order);
          if (existingModule) {
            await prisma.module.update({
              where: { id: existingModule.id },
              data: {
                headingNumber: moduleData.headingNumber,
                headingName: moduleData.headingName,
                headingDescription: moduleData.headingDescription,
                duration: moduleData.duration,
                order: moduleData.order,
              },
            });
            newModulesMap.set(moduleData.order.toString(), { id: existingModule.id, lessons: [] });
          } else {
            const newModule = await prisma.module.create({
              data: {
                curriculumId: curriculum.id,
                headingNumber: moduleData.headingNumber,
                headingName: moduleData.headingName,
                headingDescription: moduleData.headingDescription,
                duration: moduleData.duration,
                order: moduleData.order,
              },
            });
            newModulesMap.set(moduleData.order.toString(), { id: newModule.id, lessons: [] });
          }
        }

        // Process lessons
        const newLessonsMap = new Map<string, string>(); // Map of lessonKey to lessonId
        for (const moduleData of modules) {
          const moduleInfo = newModulesMap.get(moduleData.order.toString());
          const moduleId = moduleInfo.id;

          for (const lessonData of moduleData.lessons) {
            let lessonKey = lessonData.lessonKey || uuidv4();
            if (existingLessonKeys.has(lessonKey) && lessonData.lessonKey !== oldLessons.find(l => l.lessonKey === lessonKey)?.lessonKey) {
              let attempts = 0;
              const maxAttempts = 5;
              while (attempts < maxAttempts) {
                lessonKey = uuidv4();
                if (!existingLessonKeys.has(lessonKey)) break;
                attempts++;
              }
              if (attempts >= maxAttempts) {
                throw new Error("Unable to generate a unique lessonKey after multiple attempts.");
              }
            }

            const existingLesson = oldLessons.find(l => l.lessonKey === lessonKey);
            if (existingLesson) {
              await prisma.lesson.update({
                where: { id: existingLesson.id },
                data: {
                  title: lessonData.title,
                  description: lessonData.description || "",
                  duration: lessonData.duration,
                  videoUrl: lessonData.videoUrl || "",
                  order: lessonData.order,
                  moduleId,
                },
              });
              newLessonsMap.set(lessonKey, existingLesson.id);
            } else {
              const newLesson = await prisma.lesson.create({
                data: {
                  lessonKey,
                  title: lessonData.title,
                  description: lessonData.description || "",
                  duration: lessonData.duration,
                  videoUrl: lessonData.videoUrl || "",
                  order: lessonData.order,
                  moduleId,
                },
              });
              newLessonsMap.set(lessonKey, newLesson.id);
              existingLessonKeys.add(lessonKey);
            }
          }
        }

        // Delete modules and lessons not in the new structure
        if (existingCurriculum) {
          const modulesToDelete = existingModules
            .filter(m => !modules.some(md => md.order === m.order))
            .map(m => m.id);

          if (modulesToDelete.length > 0) {
            await prisma.module.deleteMany({
              where: { id: { in: modulesToDelete } },
            });
          }

          const lessonsToDelete = oldLessons
            .filter(l => !Array.from(newLessonsMap.keys()).includes(l.lessonKey))
            .map(l => l.id);

          if (lessonsToDelete.length > 0) {
            await prisma.lesson.deleteMany({
              where: { id: { in: lessonsToDelete } },
            });
          }
        }

        return { curriculum, newLessonsMap };
      } catch (error) {
        console.error("Transaction failed at step:", error);
        throw error; // Re-throw to rollback the transaction
      }
    });

    // Step 3: Create Progress for new lessons outside the transaction
    const { curriculum, newLessonsMap } = result;
    const newLessonIds = Array.from(newLessonsMap.values()).filter(id => 
      !oldLessons.some(l => l.id === id)
    ); // Only new lessons

    if (newLessonIds.length > 0) {
      const existingProgress = await db.progress.findMany({
        where: { lessonId: { in: newLessonIds } },
        select: { lessonId: true },
      });

      const lessonsWithoutProgress = newLessonIds.filter(
        (id) => !existingProgress.some((p) => p.lessonId === id)
      );

      const users = await db.user.findMany({ where: { role: "STUDENT" } });
      const progressData = [];
      for (const lessonId of lessonsWithoutProgress) {
        for (const user of users) {
          progressData.push({
            userId: user.id,
            lessonId,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      if (progressData.length > 0) {
        await db.progress.createMany({
          data: progressData,
        });
      }
    }

    return NextResponse.json(
      { success: "Curriculum created/updated successfully", curriculum },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating/updating curriculum:", error);
    return NextResponse.json(
      { error: "Failed to create/update curriculum. Please try again." },
      { status: 500 }
    );
  }
}