'use server';

import { db } from '@/lib/db';

export const fetchTutorById = async (id: string) => {
  try {
    console.log(`Attempting to fetch user with ID: ${id}`);
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return {
        image: user.image || 'PalmTechnIQ',
        name: user.name || 'Unknown Tutor',
      };
    } else {
      console.warn(`No tutor data found for ID: ${id}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};

export const getTutorById = async (tutorId: string) => {
  try {
    const tutor = await db.user.findUnique({
      where: { id: tutorId },
      include: {
        Course: true, 
      },
    });

    if (!tutor) {
      throw new Error(`No tutor found with ID: ${tutorId}`);
    }
    console.log("Fetched tutor:", tutor); 
    return tutor;
  } catch (error) {
    console.error(`Error fetching tutor with ID ${tutorId}:`, error);
    return null;
  }
};


export const getAllTutors = async () => {
  try {
    const tutors = await db.user.findMany({
      where: {
        role: 'TUTOR'
      },
      include: {
        Course: true,
      },
    });
    return tutors;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
};
