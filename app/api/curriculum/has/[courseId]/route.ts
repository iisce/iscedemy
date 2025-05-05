import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Handles the GET request to check if a curriculum exists for a given course ID.
 *
 * @param req - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters.
 * @param context.params.courseId - The ID of the course to check for curriculum existence.
 * 
 * @returns A JSON response indicating whether the curriculum exists or an error message with the appropriate HTTP status code:
 * - 200: If the curriculum existence check is successful.
 * - 400: If the provided courseId is invalid.
 * - 401: If the user is not authenticated.
 * - 403: If the user is not authorized (not a tutor).
 * - 500: If an internal server error occurs.
 * 
 * @throws Logs an error to the console if an exception occurs during the process.
 */
export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { courseId } = params;

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json({ error: "Invalid CourseId" }, { status: 400 });
    }

    // Check if the user is authenticated and is a tutor
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to check curriculum status" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can check curriculum status" },
        { status: 403 }
      );
    }

    const curriculum = await db.curriculum.findUnique({
      where: { courseId },
    });

    return NextResponse.json({ hasCurriculum: !!curriculum }, { status: 200 });
  } catch (error) {
    console.error("Error checking curriculum existence:", error);
    return NextResponse.json(
      { error: "Failed to check curriculum existence" },
      { status: 500 }
    );
  }
}