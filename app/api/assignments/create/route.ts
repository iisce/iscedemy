import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Check if the user is authenticated and is a tutor
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to create an assignment" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can create assignments" },
        { status: 403 }
      );
    }

    const { title, description, dueDate, courseId } = await req.json();

    if (!title || !description || !courseId) {
      return NextResponse.json(
        { error: "Title, description, and courseId are required" },
        { status: 400 }
      );
    }

    // Verify the course exists and belongs to the tutor
    const course = await db.course.findUnique({
      where: { id: courseId, tutorId: session.user.id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or you do not have permission to create assignments for this course" },
        { status: 404 }
      );
    }

    const assignment = await db.project.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        courseId,
      },
    });

    return NextResponse.json(
      { success: "Assignment created successfully", assignment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Failed to create assignment. Please try again." },
      { status: 500 }
    );
  }
}