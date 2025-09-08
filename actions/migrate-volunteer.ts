// import { PrismaClient } from "@prisma/client";

// const testDb = new PrismaClient({
//      datasources: { db: { url: process.env.TEST_DATABASE_URL! } },
// });

// const liveDb = new PrismaClient({
//      datasources: { db: { url: process.env.LIVE_DATABASE_URL! } },
// });

// export async function migrateCertificates() {
//      try {
//           console.log("⏳ Fetching certificates from test DB...");
//           const certs = await testDb.volunteerCertificate.findMany();

//           console.log(`📦 Found ${certs.length} certificates to migrate.`);

//           for (const cert of certs) {
//                await liveDb.volunteerCertificate.upsert({
//                     where: { certCode: cert.certCode }, // ensure no duplicates
//                     update: {}, // do nothing if it already exists
//                     create: {
//                          fullName: cert.fullName,
//                          certCode: cert.certCode,
//                          certificateUrl: cert.certificateUrl,
//                          issuedDate: cert.issuedDate,
//                          role: cert.role,
//                          remarks: cert.remarks,
//                     },
//                });
//                console.log(
//                     `✅ Migrated certificate for ${cert.fullName}: ${cert.certCode}`,
//                );
//           }

//           console.log("🎉 All certificates migrated successfully!");
//      } catch (error) {
//           console.error("❌ Migration failed:", error);
//      } finally {
//           await testDb.$disconnect();
//           await liveDb.$disconnect();
//      }
// }
