import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
     try {
          const count = await db.awarenessProgramRegistration.count({
               where: { status: "confirmed" },
          });

          return NextResponse.json(
               { count },
               {
                    status: 200,
                    headers: {
                         "Cache-Control":
                              "no-store, no-cache, must-revalidate, proxy-revalidate",
                    },
               },
          );
     } catch (error) {
          console.error("API error:", error);
          return NextResponse.json(
               { error: "Failed to fetch registrant count" },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
