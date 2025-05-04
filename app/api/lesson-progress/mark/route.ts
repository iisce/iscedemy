import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    if (!session.user.id) {
        return NextResponse.json({ error: "User ID not found in session" }, { status: 401 });
      }

    const { lessonId } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });
    }

    const existingProgress = await db.progress.findUnique({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lessonId,
        },
      },
    });

    if (existingProgress) {
      if (existingProgress.completed) {
        return NextResponse.json({ message: "Lesson already marked as completed" }, { status: 200 });
      }
      await db.progress.update({

        where: {
          id: existingProgress.id,
        },
        data: {
          completed: true,
          updatedAt: new Date(),
        },
      });
    } else {
      await db.progress.create({
        data: {
          userId: session.user.id,
          lessonId: lessonId,
          completed: true,
        },
      });
    }

    // Also update the CompletedLesson model
    const existingCompletedLesson = await db.completedLesson.findUnique({
      where: {
        lessonId_userId: {
          lessonId: lessonId,
          userId: session.user.id,
        },
      },
    });

    if (!existingCompletedLesson) {
      await db.completedLesson.create({
        data: {
          lessonId: lessonId,
          userId: session.user.id,
          completedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: "Lesson marked as completed" }, { status: 200 });
  } catch (error) {
    console.error("Error marking lesson as completed:", error);
    return NextResponse.json({ error: "Failed to mark lesson as completed" }, { status: 500 });
  }
}