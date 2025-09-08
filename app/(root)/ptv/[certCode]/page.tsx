import { db } from "@/lib/db";
import {
     CheckCircle,
     XCircle,
     Award,
     Calendar,
     User,
     Hash,
     ExternalLink,
} from "lucide-react";

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
               <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                    <div className="w-full max-w-md">
                         <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl">
                              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                   <XCircle className="h-8 w-8 text-red-600" />
                              </div>
                              <h1 className="mb-3 text-2xl font-bold text-gray-900">
                                   Certificate Not Found
                              </h1>
                              <p className="mb-6 leading-relaxed text-gray-600">
                                   We couldn't find a certificate with the
                                   provided code. Please verify the code and try
                                   again.
                              </p>
                              <div className="rounded-lg bg-gray-50 p-4">
                                   <p className="text-sm font-medium text-gray-500">
                                        Code searched:{" "}
                                        <span className="rounded border bg-white px-2 py-1 font-mono">
                                             {params.certCode.toUpperCase()}
                                        </span>
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
               <div className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-2xl">
                         {/* Header */}
                         <div className="mb-8 text-center">
                              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                   <Award className="h-10 w-10 text-emerald-600" />
                              </div>
                              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                   Certificate Verified
                              </h1>
                              <p className="text-gray-600">
                                   This certificate has been successfully
                                   validated
                              </p>
                         </div>

                         <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl">
                              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
                                   <div className="flex items-center gap-3 text-white">
                                        <CheckCircle className="h-6 w-6" />
                                        <span className="text-lg font-semibold">
                                             Authentic Certificate
                                        </span>
                                   </div>
                              </div>

                              <div className="p-8">
                                   <div className="grid gap-6">
                                        <div className="flex items-start gap-4">
                                             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                                  <User className="h-5 w-5 text-blue-600" />
                                             </div>
                                             <div className="flex-1">
                                                  <h3 className="mb-1 font-semibold text-gray-900">
                                                       Certificate Holder
                                                  </h3>
                                                  <p className="text-xl font-bold text-gray-800">
                                                       {cert.fullName}
                                                  </p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                                                  <Award className="h-5 w-5 text-purple-600" />
                                             </div>
                                             <div className="flex-1">
                                                  <h3 className="mb-1 font-semibold text-gray-900">
                                                       Role
                                                  </h3>
                                                  <p className="text-lg text-gray-800">
                                                       {cert.role ??
                                                            "Volunteer"}
                                                  </p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                                  <Calendar className="h-5 w-5 text-orange-600" />
                                             </div>
                                             <div className="flex-1">
                                                  <h3 className="mb-1 font-semibold text-gray-900">
                                                       Issue Date
                                                  </h3>
                                                  <p className="text-lg text-gray-800">
                                                       {cert.issuedDate.toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                 year: "numeric",
                                                                 month: "long",
                                                                 day: "numeric",
                                                            },
                                                       )}
                                                  </p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                  <Hash className="h-5 w-5 text-gray-600" />
                                             </div>
                                             <div className="flex-1">
                                                  <h3 className="mb-1 font-semibold text-gray-900">
                                                       Certificate ID
                                                  </h3>
                                                  <p className="break-all rounded-lg border bg-gray-50 px-3 py-2 font-mono text-lg text-gray-800">
                                                       {cert.certCode}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>

                                   {cert.certificateUrl && (
                                        <div className="mt-8 border-t border-gray-100 pt-6">
                                             <a
                                                  href={cert.certificateUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                                             >
                                                  <ExternalLink className="h-5 w-5" />
                                                  View Full Certificate
                                             </a>
                                        </div>
                                   )}
                              </div>
                         </div>

                         <div className="mt-8 text-center">
                              <p className="text-sm text-gray-500">
                                   This certificate has been digitally verified
                                   and is authentic.
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
}
