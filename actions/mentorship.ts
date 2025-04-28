"use server";

import { db } from "@/lib/db";

export const completeSession = async (mentorshipId: string, notes: string | undefined) => {
  try {
    await db.mentorship.update({
      where: { id: mentorshipId },
      data: {
        completed: true,
        notes: notes || undefined,
      },
    });
    return { success: "Session marked as completed successfully" };
  } catch (error) {
    console.error("Error completing mentorship session:", error);
    return { error: "Failed to complete session. Please try again." };
  }
};