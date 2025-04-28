import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { submissionId: string } }) {
  try {
    // Check if the user is authenticated and is a tutor
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to review a submission" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can review submissions" },
        { status: 403 }
      );
    }

    const { submissionId } = params;
    const { grade, feedback } = await req.json();

    if (!grade) {
      return NextResponse.json(
        { error: "Grade is required" },
        { status: 400 }
      );
    }

    // Verify the submission exists and the tutor has permission
    const submission = await db.projectSubmission.findUnique({
      where: { id: submissionId },
      include: {
        project: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (submission.project.course.tutorId !== session.user.id) {
      return NextResponse.json(
        { error: "You do not have permission to review this submission" },
        { status: 403 }
      );
    }

    const updatedSubmission = await db.projectSubmission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback: feedback || undefined,
      },
    });

    return NextResponse.json(
      { success: "Submission reviewed successfully", submission: updatedSubmission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reviewing submission:", error);
    return NextResponse.json(
      { error: "Failed to review submission. Please try again." },
      { status: 500 }
    );
  }
}