import { db } from "@/lib/db";
import { NextResponse } from "next/server";

async function generateCustomAccessCode(): Promise<string> {
     const prefix = "AI";
     let code: string = "";
     let isUnique = false;

     while (!isUnique) {
          const randomNum = Math.floor(
               10000 + Math.random() * 90000,
          ).toString(); // 5-digit number
          code = `${prefix}${randomNum}`;
          const existingCode = await db.awarenessProgramRegistration.findUnique(
               {
                    where: { accessCode: code },
               },
          );
          if (!existingCode) {
               isUnique = true;
          }
     }
     return code;
}

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

          const accessCode = await generateCustomAccessCode();
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
                    accessCode,
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
