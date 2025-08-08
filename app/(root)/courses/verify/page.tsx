"use client";

import { verifyPayment } from "@/actions/verify-payment";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerificationPage() {
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const [success, setSuccess] = useState<boolean>(false);
     const searchParams = useSearchParams();
     const reference = searchParams.get("reference");
     const router = useRouter();
     useEffect(() => {
          const verify = async () => {
               if (reference) {
                    try {
                         const result = await verifyPayment(reference);
                         console.log({ result });
                         if (result.success) {
                              setSuccess(true);
                              setTimeout(() => {
                                   router.push("/student");
                              }, 2000);
                         } else {
                              setError(
                                   result.error ?? "Please try again later",
                              );
                         }
                    } catch (error) {
                         console.log(error);
                         setError(
                              "This transaction has already been verified. You can now access your course.",
                         );
                    } finally {
                         setIsLoading(false);
                    }
               }
          };
          verify();
     }, [reference, router]);

     if (isLoading) {
          return (
               <div className="mx-auto flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                         <div className="flex flex-col items-center">
                              <Loader2 className="h-12 w-12 animate-spin text-green-500" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Verifying Your Payment
                              </h2>
                              <p className="mt-2 text-gray-600">
                                   Please wait while we confirm your
                                   transaction. This may take a moment...
                              </p>
                              <p className="mt-2 text-sm text-gray-500">
                                   Redirecting soon...
                              </p>
                         </div>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="mx-auto flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                         <div className="flex flex-col items-center">
                              <XCircle className="h-12 w-12 text-red-500" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Verification Failed
                              </h2>
                              <p className="mt-2 text-gray-600">{error}</p>
                              <button
                                   onClick={() => router.push("/courses")}
                                   className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
                              >
                                   Return to Courses
                              </button>
                         </div>
                    </div>
               </div>
          );
     }

     if (success) {
          return (
               <div className="mx-auto flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                         <div className="flex flex-col items-center">
                              <CheckCircle className="h-12 w-12 text-green-500" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Payment Successful!
                              </h2>
                              <p className="mt-2 text-gray-600">
                                   Congratulations! Your course enrollment is
                                   confirmed. You’ll be redirected to your
                                   dashboard to access your course materials.
                              </p>
                              <p className="mt-2 text-sm text-gray-500">
                                   Redirecting in a few seconds...
                              </p>
                         </div>
                    </div>
               </div>
          );
     }

     return null;
}
