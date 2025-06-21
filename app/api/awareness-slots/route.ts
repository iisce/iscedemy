import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
     try {
          const count = await db.awarenesssProgramRegistration.count();
          return NextResponse.json({ count });
     } catch (error) {
          console.error("Error fetching slot count:", error);
          return NextResponse.json({ count: 0 }, { status: 500 });
     } finally {
          await db.$disconnect();
     }
}
