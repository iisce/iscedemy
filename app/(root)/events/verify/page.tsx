"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { IconLoader2 } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEventPayment() {
     const router = useRouter();
     const searchParams = useSearchParams();
     const reference = searchParams.get("reference");
     const id = searchParams.get("id");
     const [status, setStatus] = useState<"loading" | "success" | "error">(
          "loading",
     );

     const [error, setError] = useState<string | null>(null);

     const [errorMessage, setErrorMessage] = useState<string | null>(null);

     useEffect(() => {
          if (!reference || !id) {
               console.error("Missing reference or id:", { reference, id });
               setErrorMessage("Invalid payment verification link");
               setStatus("error");
               toast.error("Invalid payment verification link");
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

                    {status === "success" && (
                         <Card className="mx-auto w-full border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
                              <CardContent className="p-8 text-center">
                                   <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                   </div>
                                   <h2 className="mb-4 text-2xl font-bold text-primary">
                                        Registration Confirmed!
                                   </h2>
                                   <p className="leading-relaxed text-primary/80">
                                        {`Congratulations! You’ve secured your free spot for the AI Awareness Program.
                                      Check your email for event details and exclusive resources. We’re excited to
                                      see you on August 30, 2025!`}
                                   </p>
                                   <Button
                                        asChild
                                        className="mt-6 bg-gradient-to-r from-green-600 to-black hover:from-white hover:to-green-700"
                                   >
                                        <Link href="https://chat.whatsapp.com/LabSnHSaCEmCLhWxXXar3O">
                                             Join Others Already On The Event
                                        </Link>
                                   </Button>
                                   <Button
                                        onClick={() =>
                                             router.push("/awareness-program")
                                        }
                                        className="mt-6 bg-gradient-to-r from-green-600 to-black hover:from-white hover:to-green-700"
                                   >
                                        Register Another Person
                                   </Button>
                                   {error && (
                                        <p className="mt-4 text-red-500">
                                             {error}
                                        </p>
                                   )}
                              </CardContent>
                         </Card>
                    )}
               </div>
          </div>
     );
}
