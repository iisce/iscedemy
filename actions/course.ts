'use server'
import { COURSE_PRICING } from '@/lib/course-pricing';
import { db } from '@/lib/db';
import { formatClassDays, toSlug } from '@/lib/utils';
import { CreateCourseSchema, UpdateCourseSchema } from '@/schemas';
import { ProgramType } from '@prisma/client';
import { z } from 'zod';

export async function createCourse(values: z.infer<typeof CreateCourseSchema> ) {
  try {
    const validatedFields = CreateCourseSchema.safeParse(values);
    
    const existingCourse = await db.course.findFirst({
      where: { title: toSlug(validatedFields.data?.title || ''), tutorId: validatedFields.data?.tutorId },
    });

    if (existingCourse) {
      return { error: "A course with this title already exists for this tutor." };
    }

    const prices = COURSE_PRICING[validatedFields.data?.programType as ProgramType];
    if (!prices) {
      return { error: "Invalid program type." };
    }

    const newCourse = await db.course.create({
      data: {
        title: toSlug(validatedFields.data?.title || ''),
        textSnippet: validatedFields.data?.textSnippet  ?? '',
        description: validatedFields.data?.description ?? '',
        conclusion: validatedFields.data?.conclusion ?? '',
        summary: validatedFields.data?.summary ?? '',
        programType: validatedFields.data?.programType,
        duration: validatedFields.data?.duration ?? '',
        category: validatedFields.data?.category ?? '',
        videoUrl: validatedFields.data?.videoUrl ?? '',
        noOfClass: validatedFields.data?.noOfClass ?? '',
        classDays: formatClassDays(validatedFields.data?.classDays ||''),
        certificate: validatedFields.data?.certificate ?? false,
        overView: validatedFields.data?.overView ?? '',
        virtualPrice: prices.virtualPrice,
        physicalPrice: prices.physicalPrice,
        image: validatedFields.data?.image || "/images/placeholder-course.jpg",
        tutorId: validatedFields.data?.tutorId!,
      },
    });

    return { success: "Course created successfully", course: newCourse };    
  } catch (error) {
    console.error("Error creating course:", error);
    return { error: "Failed to create course. Please try again." };
  }
}


export async function updateCourse(values: z.infer<typeof UpdateCourseSchema>) {
  try {
    const validatedData = UpdateCourseSchema.parse(values);

    const existingCourse = await db.course.findUnique({
      where: { id: validatedData.id },
    });

    if (!existingCourse) {
      return { error: "Course not found." };
    }

    // If programType is updated, update the prices accordingly
    const updatedProgramType = validatedData.programType || existingCourse.programType;
    const prices = COURSE_PRICING[updatedProgramType as ProgramType];

    const updatedCourse = await db.course.update({
      where: { id: validatedData.id },
      data: {
        title: validatedData.title,
        textSnippet: validatedData.textSnippet,
        description: validatedData.description,
        conclusion: validatedData.conclusion,
        summary: validatedData.summary,
        programType: updatedProgramType,
        duration: validatedData.duration || existingCourse.duration,
        category: validatedData.category || existingCourse.category,
        videoUrl: validatedData.videoUrl || existingCourse.videoUrl,
        noOfClass: validatedData.noOfClass || existingCourse.noOfClass,
        classDays: validatedData.classDays || existingCourse.classDays,
        certificate: validatedData.certificate ?? existingCourse.certificate,
        overView: validatedData.overView !== undefined ? validatedData.overView : existingCourse.overView,
        virtualPrice: prices.virtualPrice,
        physicalPrice: prices.physicalPrice,
        image: validatedData.image || existingCourse.image,
      },
    });

    return { success: "Course updated successfully", course: updatedCourse };
  } catch (error) {
    console.error("Error updating course:", error);
    return { error: "Failed to update course. Please try again." };
  }
}
