import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const code = searchParams.get("code");

     if (!code) {
          return NextResponse.json(
               { error: "Access code is required." },
               { status: 400 },
          );
     }

     try {
          const registrant = await db.awarenessProgramRegistration.findUnique({
               where: { accessCode: code },
               select: { fullName: true, email: true },
          });

          if (registrant) {
               return NextResponse.json({
                    name: registrant.fullName,
                    email: registrant.email,
               });
          } else {
               return NextResponse.json(
                    { error: "Invalid or unregistered access code." },
                    { status: 404 },
               );
          }
     } catch (error) {
          console.error("Verification error:", error);
          return NextResponse.json(
               { error: "An error occurred during verification." },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
