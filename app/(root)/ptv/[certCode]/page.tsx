import { db } from "@/lib/db";

export default async function VerifyCert({
     params,
}: {
     params: { certCode: string };
}) {
     const cert = await db.volunteerCertificate.findUnique({
          where: { certCode: params.certCode.toUpperCase() },
     });

     if (!cert) {
          return (
               <div className="mx-auto mt-16 max-w-lg rounded-xl bg-red-50 p-8 text-center shadow">
                    <h1 className="text-2xl font-bold text-red-600">
                         ❌ Certificate Not Found
                    </h1>
                    <p className="mt-2 text-gray-600">
                         Please check the code and try again.
                    </p>
               </div>
          );
     }

     return (
          <div className="mx-auto mt-16 max-w-lg rounded-xl bg-white p-8 shadow-lg">
               <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl">✅</span>
                    <h1 className="text-2xl font-bold text-green-600">
                         Verified Certificate
                    </h1>
               </div>

               <div className="mt-6 space-y-3 text-gray-700">
                    <p>
                         <strong>Name:</strong> {cert.fullName}
                    </p>
                    <p>
                         <strong>Role:</strong> {cert.role ?? "Volunteer"}
                    </p>
                    <p>
                         <strong>Issued Date:</strong>{" "}
                         {cert.issuedDate.toDateString()}
                    </p>
                    <p>
                         <strong>Certificate ID:</strong>{" "}
                         <span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                              {cert.certCode}
                         </span>
                    </p>
               </div>

               {cert.certificateUrl && (
                    <a
                         href={cert.certificateUrl}
                         target="_blank"
                         className="mt-6 block w-full rounded-lg bg-green-600 py-2 text-center font-semibold text-white hover:bg-green-700"
                    >
                         View Certificate
                    </a>
               )}
          </div>
     );
}
