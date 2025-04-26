import { auth } from "@/auth";
import { db } from "@/lib/db";
import { CreateCurriculumSchema } from "@/schemas";
import { NextResponse } from "next/server";

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

    // Use a transaction to ensure atomicity
    const result = await db.$transaction(async (prisma) => {
      // Check if a curriculum already exists for this course
      const existingCurriculum = await prisma.curriculum.findUnique({
        where: { courseId },
      });

        // First, delete all lessons associated with the modules of this curriculum
      if (existingCurriculum) {
        await prisma.lesson.deleteMany({
            where:{
                module: {
                    curriculumId: existingCurriculum.id,
                },
            },
        });

        // Then Delete the existing modules 
        await prisma.module.deleteMany({
          where: { curriculumId: existingCurriculum.id },
        });
      }

      // Create or update the curriculum
      const curriculum = await prisma.curriculum.upsert({
        where: { courseId },
        update: {},
        create: {
          courseId,
        },
      });

      // Create modules and lessons
      for (const moduleData of modules) {
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

        for (const lessonData of moduleData.lessons) {
          await prisma.lesson.create({
            data: {
              moduleId: newModule.id,
              title: lessonData.title,
              description: lessonData.description || "",
              duration: lessonData.duration,
              videoUrl: lessonData.videoUrl || "",
              order: lessonData.order,
            },
          });
        }
      }

      return curriculum;
    });

    return NextResponse.json(
      { success: "Curriculum created/updated successfully", curriculum: result },
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