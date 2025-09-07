// app/actions/createVolunteerCertificate.ts
"use server";

import { db } from "@/lib/db";
import { generateRandomCertCode } from "@/lib/utils";

export async function createVolunteerCertificate(
     fullName: string,
     role?: string,
     remarks?: string,
) {
     const year = new Date().getFullYear();

     // get last certificate to auto-increment number
     const lastCert = await db.volunteerCertificate.findFirst({
          orderBy: { issuedDate: "desc" },
     });

     let lastNumber = 0;
     if (lastCert?.certCode) {
          const parts = lastCert.certCode.split("-");
          lastNumber = parseInt(parts[2] ?? "0", 10);
     }

     const certCode = generateRandomCertCode(year);

     const cert = await db.volunteerCertificate.create({
          data: {
               fullName,
               role,
               remarks,
               certCode,
          },
     });

     return cert;
}
