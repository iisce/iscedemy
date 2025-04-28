import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { projectId: string } }) {
  try {
    // Check if the user is authenticated and is a tutor
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to update an assignment" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can update assignments" },
        { status: 403 }
      );
    }

    const { projectId } = params;
    const { title, description, dueDate, courseId } = await req.json();

    if (!title || !description || !courseId) {
      return NextResponse.json(
        { error: "Title, description, and courseId are required" },
        { status: 400 }
      );
    }

    // Verify the course and assignment exist and belong to the tutor
    const course = await db.course.findUnique({
      where: { id: courseId, tutorId: session.user.id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or you do not have permission to update assignments for this course" },
        { status: 404 }
      );
    }

    const assignment = await db.project.findUnique({
      where: { id: projectId, courseId },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    const updatedAssignment = await db.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json(
      { success: "Assignment updated successfully", assignment: updatedAssignment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating assignment:", error);
    return NextResponse.json(
      { error: "Failed to update assignment. Please try again." },
      { status: 500 }
    );
  }
}