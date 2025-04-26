import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { courseId, topic, scheduledAt, duration } = await req.json();
    if (!session.user.id) {
        return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
    }

    const mentorship = await db.mentorship.create({
        data: {
            courseId,
            mentorId: "MENTOR_ID", // Replace with actual mentor ID logic
            menteeId: session.user.id,
            topic,
            scheduledAt: new Date(scheduledAt),
            duration
        }
    });
    return NextResponse.json(mentorship);
}   