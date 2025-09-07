"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyForm() {
     const [code, setCode] = useState("");
     const [isPending, startTransition] = useTransition();
     const router = useRouter();

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!code.trim()) return;

          startTransition(() => {
               router.push(`/ptv/${code.trim().toUpperCase()}`);
          });
     };

     return (
          <div className="mx-auto mt-16 max-w-md rounded-xl bg-white p-8 shadow-lg">
               <h1 className="text-center text-2xl font-bold text-gray-800">
                    Verify Volunteer Certificate
               </h1>
               <p className="mt-2 text-center text-gray-500">
                    Enter the unique certificate code to confirm validity
               </p>

               <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <Input
                         type="text"
                         value={code}
                         onChange={(e) => setCode(e.target.value)}
                         placeholder="e.g. PTV-2025-ABCD"
                         className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-green-600 focus:ring-green-600"
                    />

                    <Button
                         type="submit"
                         disabled={isPending}
                         className={`w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70`}
                    >
                         {isPending ? (
                              <span className="flex items-center justify-center gap-2">
                                   <svg
                                        className="h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                   >
                                        <circle
                                             className="opacity-25"
                                             cx="12"
                                             cy="12"
                                             r="10"
                                             stroke="currentColor"
                                             strokeWidth="4"
                                        />
                                        <path
                                             className="opacity-75"
                                             fill="currentColor"
                                             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                   </svg>
                                   Verifying...
                              </span>
                         ) : (
                              "Verify"
                         )}
                    </Button>
               </form>
          </div>
     );
}
