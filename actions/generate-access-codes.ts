// import { Resend } from "resend";
// import { db } from "../lib/db";

// const resend = new Resend("re_732KJ3em_21Vu3jkWV1ZtG22rxLcyYdAH");

// async function generateCustomAccessCode(): Promise<string> {
//      const prefix = "AI";
//      let code: string = "";
//      let isUnique = false;

//      while (!isUnique) {
//           const randomNum = Math.floor(
//                10000 + Math.random() * 90000,
//           ).toString(); // 5-digit number
//           code = `${prefix}${randomNum}`;
//           const existingCode = await db.awarenessProgramRegistration.findUnique(
//                {
//                     where: { accessCode: code },
//                },
//           );
//           if (!existingCode) isUnique = true;
//      }
//      return code;
// }

// export async function main() {
//      console.log("Starting access code generation process...");

//      // Find all registrants without access codes
//      const registrantsWithoutCode =
//           await db.awarenessProgramRegistration.findMany({
//                where: {
//                     accessCode: null,
//                },
//                select: {
//                     id: true,
//                     fullName: true,
//                     email: true,
//                     accessCode: true,
//                },
//           });

//      if (registrantsWithoutCode.length === 0) {
//           console.log("No registrants found without access codes.");
//           return;
//      }

//      console.log(
//           `Found ${registrantsWithoutCode.length} registrants without codes.`,
//      );

//      for (const registrant of registrantsWithoutCode) {
//           try {
//                const accessCode =
//                     registrant.accessCode || (await generateCustomAccessCode());

//                // Update the registrant with the new access code
//                if (!registrant.accessCode) {
//                     await db.awarenessProgramRegistration.update({
//                          where: { id: registrant.id },
//                          data: { accessCode },
//                     });
//                     console.log(
//                          `Generated access code ${accessCode} for ${registrant.fullName} (${registrant.email}).`,
//                     );
//                }

//                const emailContent = `
//          <html>
//           <body style="font-family: Arial, sans-serif; background-color: #021A1A; color: #ffffff; padding: 20px;">
//             <h2 style="text-align: center;">Welcome, ${registrant.fullName}!</h2>
//             <p style="text-align: center; font-size: 16px;">You’re registered for <strong>PalmTechnIQ Lunchpad - AI Na The Future Program 2025</strong>!</p>
//             <p style="text-align: center; font-size: 18px; font-weight: bold; color: #00ff00;">
//               Your Access Code: ${accessCode}
//             </p>
//             <p style="text-align: center; font-size: 14px;">Present this code at the event entrance on August 30, 2025, at 22rd Chicken Republic Building (FESTAC Tower), AMG Workspace, 1st floor, Festac Town, Lagos, Nigeria.</p>
//             <p style="text-align: center; font-size: 14px;">
//               Connect with fellow innovators! Join our WhatsApp community to stay updated, share ideas, and network:
//               <br />
//               <a href="https://chat.whatsapp.com/LabSnHSaCEmCLhWxXXar3O" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #16a34a; color: #021A1A; text-decoration: none; border-radius: 5px; font-weight: bold;">Join WhatsApp Community</a>
//             </p>
//             <p style="text-align: center; font-size: 14px;">
//               Have questions? Contact <a href="mailto:support@palmtechniq.com" style="color: #00ff00; text-decoration: underline;">support@palmtechniq.com</a>.
//             </p>
//           </body>
//         </html>
//       `;

//                await resend.emails.send({
//                     from:
//                          process.env.FROM_EMAIL_ADDRESS ||
//                          "no-reply@palmtechniq.com",
//                     to: registrant.email,
//                     subject: `Welcome to PalmTechnIQ Lunchpad - AI Na The Future Program 2025!`,
//                     html: emailContent,
//                });
//           } catch (error) {
//                console.error(
//                     `Error processing ${registrant.fullName} (${registrant.email}):`,
//                     error,
//                );
//           }
//      }

//      console.log("Access code generation and email process completed.");
// }

// main()
//      .catch((e) => {
//           console.error("Error in main process:", e);
//           process.exit(1);
//      })
//      .finally(async () => {
//           await db.$disconnect();
//      });
