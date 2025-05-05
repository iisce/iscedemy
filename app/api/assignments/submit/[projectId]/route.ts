import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { projectId: string } }) {
  try {
    // Check if the user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to submit an assignment" },
        { status: 401 }
      );
    }

    const { projectId } = params;
    const { content, fileUrl } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Submission content is required" },
        { status: 400 }
      );
    }

    // Verify the assignment exists
    const assignment = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    // Check if the user has already submitted
    const existingSubmission = await db.projectSubmission.findFirst({
      where: { projectId, userId: session.user.id },
    });

    if (existingSubmission) {
      return NextResponse.json(
        { error: "You have already submitted this assignment" },
        { status: 400 }
      );
    }

    if (!session.user.id) {
      return NextResponse.json(
        { error: "User ID is missing in the session" },
        { status: 400 }
      );
    }

    const submission = await db.projectSubmission.create({
      data: {
        projectId,
        userId: session.user.id,
        content,
        fileUrl: fileUrl || undefined,
        submittedAt: new Date(),
      },
    });

    return NextResponse.json(
      { success: "Assignment submitted successfully", submission },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting assignment:", error);
    return NextResponse.json(
      { error: "Failed to submit assignment. Please try again." },
      { status: 500 }
    );
  }
}