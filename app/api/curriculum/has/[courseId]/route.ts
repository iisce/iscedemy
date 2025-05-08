import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { courseId } = params;

    if (!courseId || typeof courseId !== "string") {
      return NextResponse.json({ error: "Invalid CourseId" }, { status: 400 });
    }

    const session = await auth();
    console.log("Session:", session);

    if (!session) {
      console.log("No session found. Request Headers:", req.headers.entries());
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

    // Return appropriate response based on curriculum existence
    return NextResponse.json(
      { hasCurriculum: !!curriculum },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking curriculum existence:", error);
    return NextResponse.json(
      { error: "Failed to check curriculum existence" },
      { status: 500 }
    );
  }
}