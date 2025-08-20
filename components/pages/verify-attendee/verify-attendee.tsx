"use client";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for animations

interface Attendee {
     name: string;
     email: string;
}

interface VerifyResult {
     success?: Attendee;
     error?: string;
}

export default function VerifyAttendee() {
     const [accessCode, setAccessCode] = useState("");
     const [status, setStatus] = useState<string | null>(null);
     const [result, setResult] = useState<VerifyResult | null>(null);

     const handleVerify = async () => {
          if (!accessCode.trim()) {
               setResult({ error: "Please enter an access code." });
               return;
          }

          setStatus("Checking...");
          setResult(null);

          try {
               const response = await fetch(
                    `/api/verify-attendee?code=${encodeURIComponent(accessCode)}`,
               );
               const data = await response.json();

               if (response.ok) {
                    setResult({ success: data });
               } else {
                    setResult({
                         error:
                              data.error ||
                              "Verification failed. Please try again.",
                    });
               }
          } catch (error) {
               setResult({
                    error: "An error occurred. Please try again later.",
               });
               console.error("Verification error:", error);
          } finally {
               setStatus(null);
          }
     };

     return (
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#00343d] via-[#00343d] to-white p-4">
               <div className="w-full max-w-md">
                    <h1 className="mb-6 text-center text-3xl font-bold text-green-600">
                         Attendee Verification
                    </h1>
                    <div className="mb-6 rounded-lg bg-[#00343d] p-6 shadow-lg">
                         <label
                              htmlFor="accessCode"
                              className="mb-2 block text-sm font-medium text-gray-300"
                         >
                              Enter Access Code
                         </label>
                         <div className="flex flex-col gap-2 sm:flex-row">
                              <input
                                   type="text"
                                   id="accessCode"
                                   value={accessCode}
                                   onChange={(e) =>
                                        setAccessCode(e.target.value)
                                   }
                                   placeholder="e.g., AI50735"
                                   className="w-full rounded border border-green-500 bg-gray-700 p-2 text-background/20 focus:outline-none focus:ring-2 focus:ring-green-500 sm:w-auto sm:flex-1"
                              />
                              <Button
                                   onClick={handleVerify}
                                   className="w-full rounded bg-green-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-green-600 sm:w-auto"
                                   disabled={status === "Checking..."}
                              >
                                   {status || "Verify Attendee"}
                              </Button>
                         </div>
                         {result?.error && (
                              <p className="mt-2 text-sm text-red-400">
                                   {result.error}
                              </p>
                         )}
                         {status && !result && (
                              <p className="mt-2 text-sm text-yellow-400">
                                   {status}
                              </p>
                         )}
                    </div>
                    <AnimatePresence>
                         {result?.success && (
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 20 }}
                                   className="rounded-lg bg-[#00343d] p-6 text-center shadow-lg"
                              >
                                   <motion.div
                                        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5 }}
                                   >
                                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                   </motion.div>
                                   <h2 className="mb-2 text-xl font-semibold text-gray-300">
                                        Attendee Confirmed
                                   </h2>
                                   <p className="mb-2 text-gray-300">
                                        <strong>Name:</strong>{" "}
                                        {result.success.name}
                                   </p>
                                   <p className="mb-2 text-gray-300">
                                        <strong>Email:</strong>{" "}
                                        {result.success.email}
                                   </p>
                                   <p className="text-green-400">
                                        Access granted! Enjoy the event.
                                   </p>
                              </motion.div>
                         )}
                         {result?.error && !result.success && (
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 20 }}
                                   className="rounded-lg bg-gray-800 p-6 text-center shadow-lg"
                              >
                                   <svg
                                        className="mx-auto mb-4 h-12 w-12 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth={2}
                                             d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                   </svg>
                                   <h2 className="mb-2 text-xl font-semibold text-gray-300">
                                        Verification Failed
                                   </h2>
                                   <p className="text-red-400">
                                        {result.error}
                                   </p>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </div>
          </div>
     );
}
