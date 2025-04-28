import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Handles the creation of a mentorship slot.
 *
 * This function processes a POST request to create a mentorship slot for a tutor.
 * It performs the following steps:
 * - Verifies the user's authentication and role as a tutor.
 * - Validates the request payload for required fields: `courseId`, `scheduledAt`, `duration`, and `topic`.
 * - Ensures the specified course exists and belongs to the authenticated tutor.
 * - Checks that the scheduled date is in the future.
 * - Creates a new mentorship slot in the database.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response indicating the success or failure of the operation.
 *
 * Possible response statuses:
 * - 200: Mentorship slot created successfully.
 * - 400: Missing required fields or invalid scheduled date.
 * - 401: User is not authenticated.
 * - 403: User is not authorized to create mentorship slots.
 * - 404: Course not found or user lacks permission for the course.
 * - 500: Internal server error during mentorship slot creation.
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to create a mentorship slot" },
        { status: 401 }
      );
    }

    if (session.user?.role !== "TUTOR") {
      return NextResponse.json(
        { error: "Unauthorized: Only tutors can create mentorship slots" },
        { status: 403 }
      );
    }

    const { courseId, scheduledAt, duration, topic, meetingUrl } = await req.json();

    if (!courseId || !scheduledAt || !duration || !topic) {
      return NextResponse.json(
        { error: "Course ID, scheduled date, duration, and topic are required" },
        { status: 400 }
      );
    }

    // Verify the course exists and belongs to the tutor
    const course = await db.course.findUnique({
      where: { id: courseId, tutorId: session.user.id },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found or you do not have permission to create mentorship slots for this course" },
        { status: 404 }
      );
    }

    // Ensure the scheduled time is in the future
    const scheduledDate = new Date(scheduledAt);
    if (scheduledDate <= new Date()) {
      return NextResponse.json(
        { error: "Scheduled date must be in the future" },
        { status: 400 }
      );
    }

    const mentorship = await db.mentorship.create({
      data: {
        courseId,
        mentorId: session.user.id ?? "",
        scheduledAt: scheduledDate,
        duration,
        meetingUrl: meetingUrl || "",
        topic,
      },
    });

    return NextResponse.json(
      { success: "Mentorship slot created successfully", mentorship },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating mentorship slot:", error);
    return NextResponse.json(
      { error: "Failed to create mentorship slot. Please try again." },
      { status: 500 }
    );
  }
}