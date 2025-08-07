import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
     try {
          const recentRegistrants =
               await db.awarenessProgramRegistration.findMany({
                    take: 3,
                    orderBy: { createdAt: "desc" },
                    select: { fullName: true, industry: true },
               });
          return NextResponse.json(
               recentRegistrants.map((r) => ({
                    name: r.fullName,
                    industry: r.industry || "Tech",
               })),
          );
     } catch (error) {
          console.error("Error fetching recent registrants:", error);
          return NextResponse.json([], { status: 500 });
     } finally {
          await db.$disconnect();
     }
}
