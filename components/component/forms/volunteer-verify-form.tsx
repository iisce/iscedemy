"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     Shield,
     Search,
     CheckCircle,
     AlertCircle,
     Loader2,
} from "lucide-react";

export default function VerifyForm() {
     const [code, setCode] = useState("");
     const [isPending, startTransition] = useTransition();
     const [error, setError] = useState("");
     const router = useRouter();

     const formatCertificateCode = (value: string) => {
          // Remove any non-alphanumeric characters and convert to uppercase
          const cleaned = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();

          // Format as PTV-YYYY-XXXX
          if (cleaned.length <= 3) return cleaned;
          if (cleaned.length <= 7)
               return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
          return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const formatted = formatCertificateCode(e.target.value);
          setCode(formatted);
          setError(""); // Clear error on input change
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!code.trim()) {
               setError("Please enter a certificate code");
               return;
          }

          // Basic validation for certificate format
          const codePattern = /^[A-Z]{3}-\d{4}-[A-Z0-9]{4}$/;
          if (!codePattern.test(code)) {
               setError(
                    "Please enter a valid certificate code format (e.g., PTV-2025-ABCD)",
               );
               return;
          }

          startTransition(() => {
               router.push(`/ptv/${code.trim()}`);
          });
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
               <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
               </div>

               <div className="relative px-4 pb-12 pt-20 md:px-0">
                    <div className="mx-auto max-w-lg">
                         <div className="mb-8 text-center">
                              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                   <Shield className="h-8 w-8 text-primary" />
                              </div>
                              <h1 className="mb-2 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
                                   Certificate Verification
                              </h1>
                              <p className="text-pretty text-lg text-muted-foreground">
                                   Enter your unique certificate code to verify
                                   authenticity and view details
                              </p>
                         </div>

                         <div className="rounded-2xl border border-border/50 bg-card/50 p-8 shadow-xl backdrop-blur-sm">
                              <form
                                   onSubmit={handleSubmit}
                                   className="space-y-6"
                              >
                                   <div className="space-y-2">
                                        <label
                                             htmlFor="certificate-code"
                                             className="text-sm font-medium text-foreground"
                                        >
                                             Certificate Code
                                        </label>
                                        <div className="relative">
                                             <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
                                             <Input
                                                  id="certificate-code"
                                                  type="text"
                                                  value={code}
                                                  onChange={handleInputChange}
                                                  placeholder="PTV-2025-ABCD"
                                                  maxLength={13}
                                                  className="h-12 border-border bg-input pl-10 text-lg transition-all duration-200 focus:border-primary focus:ring-primary/20"
                                             />
                                        </div>
                                        {error && (
                                             <div className="flex items-center gap-2 text-sm text-destructive">
                                                  <AlertCircle className="h-4 w-4" />
                                                  {error}
                                             </div>
                                        )}
                                   </div>

                                   <Button
                                        type="submit"
                                        disabled={isPending || !code.trim()}
                                        className="h-12 w-full transform bg-primary text-lg font-semibold text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] disabled:transform-none"
                                   >
                                        {isPending ? (
                                             <span className="flex items-center justify-center gap-2">
                                                  <Loader2 className="h-5 w-5 animate-spin" />
                                                  Verifying Certificate...
                                             </span>
                                        ) : (
                                             <span className="flex items-center justify-center gap-2">
                                                  <CheckCircle className="h-5 w-5" />
                                                  Verify Certificate
                                             </span>
                                        )}
                                   </Button>
                              </form>

                              <div className="mt-6 border-t border-border/50 pt-6">
                                   <div className="text-center">
                                        <p className="mb-2 text-sm text-muted-foreground">
                                             Need help? Certificate codes follow
                                             this format:
                                        </p>
                                        <div className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-1 font-mono text-sm text-accent-foreground">
                                             <span className="text-primary">
                                                  PTV
                                             </span>
                                             <span className="text-muted-foreground">
                                                  -
                                             </span>
                                             <span className="text-primary">
                                                  2025
                                             </span>
                                             <span className="text-muted-foreground">
                                                  -
                                             </span>
                                             <span className="text-primary">
                                                  ABCD
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="mt-8 text-center">
                              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                   <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-primary" />
                                        <span>Secure Verification</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                        <span>Instant Results</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
