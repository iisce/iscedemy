import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { projectId, content, fileUrl } = await req.json();
    if (!session.user.id) return NextResponse.json({ error: "User ID is missing" }, { status: 400 });

    const submission = await db.projectSubmission.create({
        data: {
            projectId,
            userId: session.user.id,
            content,
            fileUrl
        }
    });
    return NextResponse.json(submission);
}