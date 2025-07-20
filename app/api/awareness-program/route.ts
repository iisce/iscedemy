import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     const body = await request.json();
     const { fullName, age, dateOfBirth, phoneNumber, email, industry, goals } =
          body;

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

          const registration = await db.awarenesssProgramRegistration.create({
               data: {
                    fullName,
                    age: parseInt(age),
                    dateOfBirth: new Date(dateOfBirth),
                    phoneNumber,
                    email,
                    industry: industry || null,
                    goals,
                    status: "CONFIRMED",
               },
          });

          return NextResponse.json({
               status: "CONFIRMED",
               id: registration.id,
          });
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
