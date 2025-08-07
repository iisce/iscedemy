"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { IconLoader2 } from "@tabler/icons-react";

export default function VerifyEventPayment() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const reference = searchParams.get("reference");
     const id = searchParams.get("id");
     const [status, setStatus] = useState<"loading" | "success" | "error">(
          "loading",
     );
     const [errorMessage, setErrorMessage] = useState<string | null>(null);

     useEffect(() => {
          if (!reference || !id) {
               console.error("Missing reference or id:", { reference, id });
               setErrorMessage("Invalid payment verification link");
               setStatus("error");
               toast.error("Invalid payment verification link");
               setTimeout(() => router.push("/awareness-program"), 3000);
               return;
          }

          let isMounted = true;
          const verify = async () => {
               if (!isMounted) return;
               console.log("Initiating verification:", { reference, id });

               try {
                    const response = await fetch("/api/verify-event-payment", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              reference,
                              transactionId: id,
                         }),
                    });
                    const data = await response.json();
                    console.log("Verification response:", data);

                    if (!response.ok || data.error) {
                         throw new Error(data.error || "Verification failed");
                    }

                    if (isMounted) {
                         setStatus("success");
                         toast.success(
                              "Payment verified! Your spot is secured.",
                         );
                         setTimeout(
                              () => router.push("/awareness-program"),
                              2000,
                         );
                    }
               } catch (err) {
                    if (isMounted) {
                         const message =
                              err instanceof Error
                                   ? err.message
                                   : "Error verifying payment";
                         console.error("Verification error:", {
                              message,
                              reference,
                              id,
                         });
                         setErrorMessage(message);
                         setStatus("error");
                         toast.error(message);
                    }
               }
          };

          verify();
          return () => {
               isMounted = false;
          };
     }, [reference, id, router]);

     return (
          <div className="flex min-h-screen items-center justify-center bg-gray-100">
               <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
                    {status === "loading" && (
                         <div className="flex flex-col items-center">
                              <IconLoader2 className="h-12 w-12 animate-spin text-green-600" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Verifying Your Payment
                              </h2>
                              <p className="mt-2 text-gray-600">
                                   Please wait while we confirm your
                                   transaction...
                              </p>
                         </div>
                    )}
                    {status === "success" && (
                         <div className="flex flex-col items-center">
                              <CheckCircleIcon className="h-12 w-12 text-green-500" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Payment Verified!
                              </h2>
                              <p className="mt-2 text-gray-600">
                                   Your spot for the AI Awareness Program 2025
                                   is secured. Redirecting...
                              </p>
                         </div>
                    )}
                    {status === "error" && (
                         <div className="flex flex-col items-center">
                              <XCircleIcon className="h-12 w-12 text-red-500" />
                              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                   Verification Failed
                              </h2>
                              <p className="mt-2 text-gray-600">
                                   {errorMessage}
                              </p>
                              <button
                                   onClick={() =>
                                        router.push("/awareness-program")
                                   }
                                   className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
                              >
                                   Return to Event Page
                              </button>
                         </div>
                    )}
               </div>
          </div>
     );
}
