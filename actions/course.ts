'use server'
import { db } from '@/lib/db';
import { UpdateCourseSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateCourse =  async (
    values: z.infer<typeof UpdateCourseSchema>
    ) => {
        const validatedFields = UpdateCourseSchema.safeParse(values);
        
        if (!validatedFields.success){
            return { error: validatedFields.error.errors[0].message};
        }

        const {id, title, textSnippet, description, conclusion, summary} = validatedFields.data;

  try {
    const updatedCourse = await db.course.update({
      where: { id },
      data: {
        title,
        textSnippet,
        description,
        conclusion,
        summary,
      },
    });

    if (!updatedCourse) {
        return { error: 'something went wrong'};
    }
    return revalidatePath(`/tutor`);
  } catch (error) {
    console.error('Error updating course:', error);
    
    return { error: 'Failed to update course' };
  }
};
