"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(data: { id: string; name: string }) {
  try {
    const updatedUser = await db.user.update({
      where: { id: data.id },
      data: { name: data.name },
    });
    revalidatePath("/student/profile");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update profile" };
  }
}