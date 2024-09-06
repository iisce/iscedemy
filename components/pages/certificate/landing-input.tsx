"use client";
import { getCertificate } from "@/actions/verifyCertificate";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

export default function CertificateSearchInput() {
     const [certificateID, setCertificateID] = useState("");
     const [error, setError] = useState<string | undefined>(undefined);
     const [success, setSuccess] = useState<string | undefined>(undefined);
     const [isPending, startTransition] = useTransition();
     const router = useRouter();
     console.log({ certificateID });

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setError("");
          setSuccess("");

          startTransition(async () => {
               try {
                    const certificate = await getCertificate(certificateID); //want to replac with server action instead

                    if (certificate.error) {
                         setError(certificate.error);
                    } else {
                         setSuccess(certificate.success);
                         setTimeout(() => {
                              router.push(`/certificate/${certificateID}`);
                         }, 1000);
                    }
               } catch (error) {
                    console.error(
                         "An error occured while verifying cetificate:",
                         error,
                    );
                    setError("Please enter a valid certificate ID");
               }
          });
     };

     return (
          <MaxWidthWrapper className="my-10 max-w-3xl">
               <div className="grid items-center place-self-center p-4">
                    <h1 className="mb-4 text-center text-2xl font-bold">
                         Verify Student Certificate
                    </h1>
                    <form
                         onSubmit={handleSubmit}
                         className="mb-4 grid space-x-2"
                    >
                         <div className="my-4">
                              <Input
                                   type="text"
                                   placeholder="Search certifiate ID..."
                                   value={certificateID}
                                   onChange={(e) =>
                                        setCertificateID(e.target.value)
                                   }
                                   className="w-full flex-grow rounded-full"
                                   aria-label="Search input"
                              />
                         </div>
                         <Button
                              type="submit"
                              className=""
                              disabled={isPending || !certificateID}
                         >
                              {isPending ? (
                                   <Loader className="h-6 w-6 animate-spin" />
                              ) : (
                                   "Verify"
                              )}
                         </Button>
                         <FormError message={error} />
                         <FormSuccess message={success} />
                    </form>
               </div>
          </MaxWidthWrapper>
     );
}
