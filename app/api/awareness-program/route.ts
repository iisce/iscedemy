import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     const body = await request.json();
     const { fullName, age, dateOfBirth, phoneNumber, email, industry, goals } =
          body;

     try {
          const existingRegistration =
               await db.awarenessProgramRegistration.findUnique({
                    where: { email },
               });
          if (existingRegistration) {
               return NextResponse.json(
                    { error: "Email already registered" },
                    { status: 400 },
               );
          }

          const registration = await db.awarenessProgramRegistration.create({
               data: {
                    fullName,
                    age: parseInt(age),
                    dateOfBirth: new Date(dateOfBirth),
                    phoneNumber,
                    email,
                    industry: industry || "Not specified",
                    goals,
                    status: "PENDING",
               },
          });

          return NextResponse.json({
               status: "PENDING",
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
