import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     const body = await request.json();
     const { fullName, age, dateOfBirth, phoneNumber, email, goals } = body;

     try {
          const existingRegistration =
               await db.awarenesssProgramRegistration.findUnique({
                    where: { email },
               });
          if (existingRegistration) {
               return NextResponse.json(
                    { error: "Email already registered" },
                    { status: 400 },
               );
          }

          const currentSlots = await db.awarenesssProgramRegistration.count();
          const status = currentSlots >= 100 ? "WAITLISTED" : "CONFIRMED";

          const registration = await db.awarenesssProgramRegistration.create({
               data: {
                    fullName,
                    age: parseInt(age),
                    dateOfBirth: new Date(dateOfBirth),
                    phoneNumber,
                    email,
                    goals,
                    status,
               },
          });

          return NextResponse.json({ status, id: registration.id });
     } catch (error) {
          console.error("Registration error:", error);
          return NextResponse.json(
               { error: "Failed to process registration" },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
