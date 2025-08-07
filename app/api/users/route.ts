import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     try {
          const { email, name, phone, role } = await request.json();
          if (!email || !name || !phone || !role) {
               console.error("Missing required fields:", {
                    email,
                    name,
                    phone,
                    role,
               });
               return NextResponse.json(
                    {
                         error: "Missing required fields: email, name, phone, role",
                    },
                    { status: 400 },
               );
          }

          await db.$connect();
          console.log("Database connected successfully");

          let user = await db.user.findUnique({ where: { email } });

          if (!user) {
               user = await db.user.create({
                    data: {
                         email,
                         name,
                         phone,
                         role,
                    },
               });
          }

          return NextResponse.json(user, { status: 200 });
     } catch (error) {
          console.error("User creation error:", error);
          return NextResponse.json(
               { error: "Failed to create/check user" },
               { status: 500 },
          );
     } finally {
          await db.$disconnect();
     }
}
