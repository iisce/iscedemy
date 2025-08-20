import { db } from "@/lib/db";
import { eventNotificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     try {
          const { fullName, email } = await request.json();
          console.log("Received registration email request:", {
               fullName,
               email,
          });

          if (!fullName || !email) {
               return NextResponse.json(
                    { error: "Full name and email are required" },
                    { status: 400 },
               );
          }

          const registrant = await db.awarenessProgramRegistration.findFirst({
               where: { email },
          });
          console.log("Registrant query result:", registrant);

          if (!registrant) {
               console.warn("No registrant found for email:", email);
               return NextResponse.json(
                    { error: "Registrant not found" },
                    { status: 404 },
               );
          }

          await db.awarenessProgramRegistration.update({
               where: { id: registrant.id },
               data: { status: "CONFIRMED" }, // Ensure status is set to CONFIRMED
          });
          console.log("Updated registration to confirmed:", { email });

          await eventNotificationEmail(
               fullName,
               email,
               "PalmTechnIQ Lunchpad - AI Na The Future Program 2025",
               "August 30, 2025",
               "22rd Chicken Republic Building (FESTAC Tower), AMG Workspace, 1st floor, FESTAC Town, Lagos, Nigeria",
          );
          console.log("Sent confirmation email to:", email);

          return new NextResponse(
               JSON.stringify({
                    success: "Registration email sent",
                    status: "CONFIRMED",
               }),
               {
                    status: 200,
                    headers: {
                         "Cache-Control":
                              "no-store, no-cache, must-revalidate, proxy-revalidate",
                         "Content-Type": "application/json",
                    },
               },
          );
     } catch (error) {
          console.error("Error sending registration email:", error);
          return NextResponse.json(
               { error: "Error sending registration email" },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
