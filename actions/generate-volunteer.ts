// import { db } from "@/lib/db";
// import { generateRandomCertCode } from "@/lib/utils";

// export async function GenerateVolunteer() {
//      const year = new Date().getFullYear();

//      const volunteers = [
//           { fullName: "Aoko Gbemisola Jessica", role: "Community Volunteer" },
//           { fullName: "Ojo oreoluwa", role: "Community Volunteer" },
//           { fullName: "Lawal Anjolaoluwa Lisa", role: "Community Volunteer" },
//           { fullName: "Saanu Seflinmi Israel", role: "Community Volunteer" },
//           { fullName: "Oladiran Sarah Damilola", role: "Community Volunteer" },
//           { fullName: "Bakare Mariam Arike", role: "Community Volunteer" },
//           {
//                fullName: "LarryAugustine Emmanuella",
//                role: "Community Volunteer",
//           },
//           {
//                fullName: "Adewuyi Anuoluwapo Damilola",
//                role: "Community Volunteer",
//           },
//           { fullName: "Agbolade Janet monisola", role: "Community Volunteer" },
//           { fullName: "Agosu Ayomide Emmanuel", role: "Community Volunteer" },
//      ];

//      for (const v of volunteers) {
//           const certCode = generateRandomCertCode(year);

//           const cert = await db.volunteerCertificate.create({
//                data: {
//                     fullName: v.fullName,
//                     role: v.role,
//                     certCode,
//                },
//           });

//           console.log(
//                `✅ Created certificate for ${v.fullName}: ${cert.certCode}`,
//           );
//      }
// }

// GenerateVolunteer()
//      .then(() => {
//           console.log("All volunteer certificates generated!");
//           process.exit(0);
//      })
//      .catch((err) => {
//           console.error(err);
//           process.exit(1);
//      });
