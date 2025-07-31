"use client";

import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
     AGENDA,
     EVENT_TESTIMONIALS,
     FAKE_REGISTRANTS,
     INDUSTRIES,
     SPEAKERS,
} from "@/lib/consts";
import { AwarenessProgramSchema } from "@/schemas";
import {
     ArrowDownIcon,
     CalendarDaysIcon,
     CheckCircleIcon,
     MapPinIcon,
     PhoneIcon,
     ShieldCheckIcon,
     UserCircleIcon,
     UsersIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { TargetIcon } from "@radix-ui/react-icons";
import { IconAlertCircle, IconMail, IconTarget } from "@tabler/icons-react";
import { Shield, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Typewriter from "typewriter-effect";
import { z } from "zod";

export default function AwarenessProgram() {
     const [isSubmitted, setIsSubmitted] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [isPending, startTransition] = useTransition();

     const [submissionStatus, setSubmissionStatus] = useState<
          "CONFIRMED" | "WAITLISTED" | null
     >(null);
     const [timeLeft, setTimeLeft] = useState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
     });
     const [showAgenda, setShowAgenda] = useState(false);
     const [recentRegistrants, setRecentRegistrants] = useState<string[]>([]);
     const [registeredCount, setRegisteredCount] = useState(50);
     const [currentFakeIndex, setCurrentFakeIndex] = useState(0);
     const [showRegisterButton, setShowRegisterButton] = useState(false);
     const timerRef = useRef<NodeJS.Timeout | null>(null);
     const countdownRef = useRef<NodeJS.Timeout | null>(null);
     const pollRef = useRef<NodeJS.Timeout | null>(null);
     const formRef = useRef<HTMLDivElement>(null);

     const form = useForm<z.infer<typeof AwarenessProgramSchema>>({
          resolver: zodResolver(AwarenessProgramSchema),
          defaultValues: {
               fullName: "",
               age: 0,
               dateOfBirth: "",
               phoneNumber: "",
               email: "",
               industry: "",
               goals: "",
          },
     });

     // Fetch initial data and poll for updates
     const fetchRegistrantData = async () => {
          try {
               const response = await fetch("/api/awareness-slots", {
                    cache: "no-store", // Prevent caching
               });
               if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
               }
               const data = await response.json();
               setRegisteredCount(50 + (data.count || 0));

               const registrantsResponse = await fetch(
                    "/api/recent-registrants",
                    {
                         cache: "no-store",
                    },
               );
               if (!registrantsResponse.ok) {
                    throw new Error(
                         `HTTP error! status: ${registrantsResponse.status}`,
                    );
               }
               const registrantsData = await registrantsResponse.json();
               setRecentRegistrants(
                    registrantsData.map(
                         (r: { name: string; industry: string }) =>
                              `${r.name} (${r.industry}) just secured a spot`,
                    ),
               );
          } catch (err) {
               console.error("Error fetching registrant data:", {
                    error: err instanceof Error ? err.message : String(err),
                    stack: err instanceof Error ? err.stack : undefined,
               });
               setRegisteredCount(50); // Fallback to default
          }
     };

     useEffect(() => {
          fetchRegistrantData();

          // Poll every 30 seconds for updated count
          pollRef.current = setInterval(fetchRegistrantData, 30000);

          // Fake registrant updates
          timerRef.current = setInterval(() => {
               if (Math.random() > 0.7) {
                    setCurrentFakeIndex(
                         (prev) => (prev + 1) % FAKE_REGISTRANTS.length,
                    );
                    const registrant = FAKE_REGISTRANTS[currentFakeIndex];
                    setRecentRegistrants((prev) => [
                         `${registrant.name} (${registrant.role}) just secured a spot`,
                         ...prev.slice(0, 3),
                    ]);
               }
          }, 7000);

          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
               if (pollRef.current) clearInterval(pollRef.current);
          };
     }, [currentFakeIndex]);

     useEffect(() => {
          const eventDate = new Date("2025-08-30T10:00:00+01:00");
          countdownRef.current = setInterval(() => {
               const now = new Date();
               const timeDiff = Math.max(
                    0,
                    eventDate.getTime() - now.getTime(),
               );
               if (timeDiff <= 0) {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    clearInterval(countdownRef.current as NodeJS.Timeout);
                    return;
               }
               const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
               const hours = Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
               );
               const minutes = Math.floor(
                    (timeDiff % (1000 * 60 * 60)) / (1000 * 60),
               );
               const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
               setTimeLeft({ days, hours, minutes, seconds });
          }, 1000);

          return () => {
               if (countdownRef.current) clearInterval(countdownRef.current);
          };
     }, []);

     useEffect(() => {
          const handleScroll = () => {
               if (!formRef.current) return;
               const formTop = formRef.current.getBoundingClientRect().top;
               const windowHeight = window.innerHeight;
               const scrollY = window.scrollY;
               setShowRegisterButton(scrollY > 200 && formTop > windowHeight);
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     }, []);

     const scrollToForm = () => {
          formRef.current?.scrollIntoView({ behavior: "smooth" });
     };

     const onSubmit = (values: z.infer<typeof AwarenessProgramSchema>) => {
          startTransition(async () => {
               try {
                    const phoneNumber = `+234${values.phoneNumber}`;
                    const response = await fetch("/api/awareness-program", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({
                              fullName: values.fullName,
                              age: parseInt(values.age.toString()),
                              dateOfBirth: values.dateOfBirth,
                              phoneNumber,
                              industry: values.industry || "Not specified",
                              email: values.email,
                              goals: values.goals,
                         }),
                    });

                    if (!response.ok) {
                         const data = await response.json();
                         const errorMessage =
                              data.error ||
                              `Registration failed: ${response.statusText}`;
                         throw new Error(errorMessage);
                    }

                    const data = await response.json();
                    setSubmissionStatus(data.status);
                    setIsSubmitted(true);
                    setRecentRegistrants((prev) => [
                         `${values.fullName} (${values.industry || "Tech"}) just registered`,
                         ...prev.slice(0, 3),
                    ]);
                    form.reset();
                    setTimeout(fetchRegistrantData, 1000);
               } catch (err) {
                    const errorMessage =
                         err instanceof Error
                              ? err.message
                              : "An unexpected error occurred";
                    console.error("Registration error:", {
                         error: errorMessage,
                         stack: err instanceof Error ? err.stack : undefined,
                         values: {
                              ...values,
                              phoneNumber: `+234${values.phoneNumber}`,
                         },
                    });
                    toast.error(errorMessage);

                    try {
                         const registrantsResponse = await fetch(
                              "/api/recent-registrants",
                              {
                                   cache: "no-store",
                              },
                         );
                         if (registrantsResponse.ok) {
                              const registrantsData =
                                   await registrantsResponse.json();
                              const isRegistered = registrantsData.some(
                                   (r: { email: string }) =>
                                        r.email === values.email,
                              );
                              if (isRegistered) {
                                   setSubmissionStatus("CONFIRMED");
                                   setIsSubmitted(true);
                                   setRegisteredCount((prev) => prev + 1);
                                   setRecentRegistrants((prev) => [
                                        `${values.fullName} (${
                                             values.industry || "Tech"
                                        }) just registered`,
                                        ...prev.slice(0, 3),
                                   ]);
                                   form.reset();
                                   toast.info(
                                        "Registration was recorded successfully despite the error.",
                                   );
                                   setTimeout(fetchRegistrantData, 1000);
                              }
                         }
                    } catch (checkErr) {
                         console.error("Error checking recent registrants:", {
                              error:
                                   checkErr instanceof Error
                                        ? checkErr.message
                                        : String(checkErr),
                              stack:
                                   checkErr instanceof Error
                                        ? checkErr.stack
                                        : undefined,
                         });
                    }

                    setError(errorMessage);
               }
          });
     };

     const getFieldIcon = (field: string) => {
          const icons = {
               fullName: <UserCircleIcon className="h-4 w-4" />,
               age: <UsersIcon className="h-4 w-4" />,
               dateOfBirth: <CalendarDaysIcon className="h-4 w-4" />,
               phoneNumber: <PhoneIcon className="h-4 w-4" />,
               email: <IconMail className="h-4 w-4" />,
               industry: <Zap className="h-4 w-4" />,
               goals: <IconTarget className="h-4 w-4" />,
          };
          return icons[field as keyof typeof icons];
     };

     if (isSubmitted) {
          return (
               <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-black to-green-50 p-4">
                    <MaxWidthWrapper>
                         <Card className="mx-auto w-full max-w-md border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
                              <CardContent className="p-8 text-center">
                                   <div
                                        className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                                             submissionStatus === "WAITLISTED"
                                                  ? "bg-orange-100"
                                                  : "bg-green-100"
                                        }`}
                                   >
                                        {submissionStatus === "WAITLISTED" ? (
                                             <IconAlertCircle className="h-8 w-8 text-orange-600" />
                                        ) : (
                                             <CheckCircleIcon className="h-8 w-8 text-green-600" />
                                        )}
                                   </div>
                                   <h2 className="mb-4 text-2xl font-bold text-primary">
                                        {submissionStatus === "WAITLISTED"
                                             ? "You're on the Waitlist!"
                                             : "Access Granted!"}
                                   </h2>
                                   <p className="leading-relaxed text-primary/80">
                                        {submissionStatus === "WAITLISTED"
                                             ? "We'll contact you immediately if a spot opens. Check your email for exclusive AI resources."
                                             : "You've secured your spot! Keep your eyes on your email. Event details coming soon."}
                                   </p>
                                   <Button
                                        onClick={() => {
                                             setIsSubmitted(false);
                                             setSubmissionStatus(null);
                                             form.reset();
                                        }}
                                        className="mt-6 bg-gradient-to-r from-green-600 to-black hover:from-white hover:to-green-700"
                                   >
                                        {submissionStatus === "WAITLISTED"
                                             ? "Join Waitlist for Colleague"
                                             : "Register Another Person"}
                                   </Button>
                                   {error &&
                                        toast.error(
                                             error || "Something went wrong!",
                                        )}
                              </CardContent>
                         </Card>
                    </MaxWidthWrapper>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gradient-to-br from-[#00343d] via-[#00343d] to-white px-4 py-8">
               <style jsx>{`
                    @keyframes marquee {
                         0% {
                              transform: translateX(0);
                         }
                         100% {
                              transform: translateX(-50%);
                         }
                    }
                    .animate-marquee {
                         animation: marquee 20s linear infinite;
                         display: flex;
                         width: 200%;
                         will-change: transform;
                    }
                    @keyframes fadeIn {
                         from {
                              opacity: 0;
                              transform: translateY(20px);
                         }
                         to {
                              opacity: 1;
                              transform: translateY(0);
                         }
                    }
                    .register-button {
                         animation: fadeIn 0.3s ease-out;
                    }
               `}</style>

               <MaxWidthWrapper>
                    <div className="mx-auto max-w-5xl">
                         <div className="mb-12 text-center">
                              <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-600 to-green-800 px-4 py-1 text-sm font-bold text-white">
                                   <Typewriter
                                        options={{
                                             strings: [
                                                  "REGISTRATION OPEN",
                                                  "AI FUTURE-PROOF",
                                                  "CHOOSE WHERE YOU BELONG!",
                                             ],
                                             autoStart: true,
                                             loop: true,
                                             delay: 50,
                                             deleteSpeed: 30,
                                        }}
                                   />
                              </div>
                              <h1 className="mb-4 bg-gradient-to-r from-green-400 to-white bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                                   AI WILL DELETE YOUR JOB...
                                   <br />
                                   <span className="text-green-400">
                                        UNLESS YOU DO THIS FIRST
                                   </span>
                              </h1>
                              <p className="mx-auto max-w-2xl text-lg font-medium text-green-200">
                                   {`    Join 6 industry rebels (security, UX, PMs,
                              engineers) as they expose how to weaponize AI...
                               The Exact Blueprint you'll need by 2026`}
                              </p>

                              <div className="mx-auto my-8 max-w-md rounded-xl bg-gradient-to-r from-green-900/50 to-black/50 p-6 backdrop-blur-sm">
                                   <div className="flex flex-col justify-between gap-6 md:flex-row">
                                        <div className="text-center md:text-left">
                                             <div className="text-xl text-green-300">
                                                  Registered
                                             </div>
                                             <div className="animate-pulse text-3xl font-bold text-white">
                                                  {registeredCount}
                                             </div>
                                        </div>
                                        <div className="text-center md:text-left">
                                             <div className="text-xl text-green-300">
                                                  Registration closes in
                                             </div>
                                             <div className="flex justify-center gap-2 md:justify-start">
                                                  <div className="flex flex-col items-center">
                                                       <div className="animate-bounce text-2xl font-bold text-white">
                                                            {timeLeft.days
                                                                 .toString()
                                                                 .padStart(
                                                                      2,
                                                                      "0",
                                                                 )}
                                                       </div>
                                                       <div className="text-xs text-green-300">
                                                            DAYS
                                                       </div>
                                                  </div>
                                                  <div className="mt-1 text-xl font-bold text-green-400">
                                                       :
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                       <div className="animate-bounce text-2xl font-bold text-white">
                                                            {timeLeft.hours
                                                                 .toString()
                                                                 .padStart(
                                                                      2,
                                                                      "0",
                                                                 )}
                                                       </div>
                                                       <div className="text-xs text-green-300">
                                                            HOURS
                                                       </div>
                                                  </div>
                                                  <div className="mt-1 text-xl font-bold text-green-400">
                                                       :
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                       <div
                                                            className="animate-bounce text-2xl font-bold text-white"
                                                            style={{
                                                                 animationDelay:
                                                                      "0.2s",
                                                            }}
                                                       >
                                                            {timeLeft.minutes
                                                                 .toString()
                                                                 .padStart(
                                                                      2,
                                                                      "0",
                                                                 )}
                                                       </div>
                                                       <div className="text-xs text-green-300">
                                                            MINUTES
                                                       </div>
                                                  </div>
                                                  <div className="mt-1 text-xl font-bold text-green-400">
                                                       :
                                                  </div>
                                                  <div className="flex flex-col items-center">
                                                       <div
                                                            className="animate-bounce text-2xl font-bold text-white"
                                                            style={{
                                                                 animationDelay:
                                                                      "0.4s",
                                                            }}
                                                       >
                                                            {timeLeft.seconds
                                                                 .toString()
                                                                 .padStart(
                                                                      2,
                                                                      "0",
                                                                 )}
                                                       </div>
                                                       <div className="text-xs text-green-300">
                                                            SECONDS
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         {recentRegistrants.length > 0 && (
                              <div className="mb-10 overflow-hidden rounded-lg bg-green-900/30 p-3">
                                   <div className="animate-marquee flex space-x-8 whitespace-nowrap">
                                        {[
                                             ...recentRegistrants,
                                             ...recentRegistrants,
                                        ].map((registrant, idx) => (
                                             <div
                                                  key={`${registrant}-${idx}`}
                                                  className="flex items-center text-green-300"
                                             >
                                                  <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                                  <span>{registrant}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}
                         <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                              {/* Pain Points Section */}
                              <div className="mb-12 rounded-xl bg-gradient-to-br from-green-900/20 to-black/50 p-6 backdrop-blur-sm">
                                   <h2 className="mb-6 text-2xl font-bold text-white">
                                        <span className="text-green-400">
                                             THEY LIED
                                        </span>{" "}
                                        ABOUT AI
                                   </h2>
                                   <div className="space-y-4">
                                        <div className="rounded-lg bg-black/40 p-4 transition-all duration-300 hover:bg-black/60">
                                             <div className="flex items-start">
                                                  <div className="mr-3 mt-1 text-red-500">
                                                       ✖
                                                  </div>
                                                  <div>
                                                       <h3 className="font-bold text-red-300">
                                                            "AI will replace
                                                            you"
                                                       </h3>
                                                       <p className="text-green-200">
                                                            {`Reality: It only replaces
                                                       those who ignore it.
                                                       Learn to make AI your
                                                       indentured servant.`}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="rounded-lg bg-black/40 p-4 transition-all duration-300 hover:bg-black/60">
                                             <div className="flex items-start">
                                                  <div className="mr-3 mt-1 text-green-400">
                                                       ✓
                                                  </div>
                                                  <div>
                                                       <h3 className="font-bold text-green-300">
                                                            {`"AI is your co-pilot"`}
                                                       </h3>
                                                       <p className="text-green-200">
                                                            {`Truth: The top 10% in
                                                       every field are already
                                                       using AI to 10x their
                                                       output. You'll learn
                                                       their exact frameworks.`}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="rounded-lg bg-black/40 p-4 transition-all duration-300 hover:bg-black/60">
                                             <div className="flex items-start">
                                                  <div className="mr-3 mt-1 text-red-500">
                                                       ✖
                                                  </div>
                                                  <div>
                                                       <h3 className="font-bold text-red-300">
                                                            {`"AI is too technical"`}
                                                       </h3>
                                                       <p className="text-green-200">
                                                            {`Reality: New no-code
                                                       tools let anyone harness
                                                       AI. We'll give you the
                                                       exact playbook.`}
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Speakers Section */}
                              <div className="mb-12">
                                   <h2 className="mb-6 text-2xl font-bold text-white">
                                        MEET YOUR{" "}
                                        <span className="text-green-400">
                                             AI WEAPONS INSTRUCTORS
                                        </span>
                                   </h2>
                                   <div className="grid grid-cols-1 gap-4">
                                        {SPEAKERS.map((speaker, index) => (
                                             <div
                                                  key={index}
                                                  className="group rounded-xl bg-gradient-to-br from-green-900/20 to-black/50 p-5 backdrop-blur-sm transition-all duration-300 hover:from-green-800/40 hover:to-black/70"
                                             >
                                                  <div className="flex items-start">
                                                       <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-green-600/30 group-hover:border-green-500">
                                                            <div className="absolute inset-0 overflow-hidden rounded-full">
                                                                 <Image
                                                                      src={
                                                                           speaker.image
                                                                      }
                                                                      alt={
                                                                           speaker.name
                                                                      }
                                                                      fill
                                                                      className="object-cover"
                                                                 />
                                                            </div>
                                                            <div className="absolute inset-0 bg-gradient-to-br from-green-700/30 to-black/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                                       </div>
                                                       <div>
                                                            <h3 className="font-bold text-white">
                                                                 {speaker.name}
                                                            </h3>
                                                            <p className="text-sm text-green-300">
                                                                 {speaker.title}
                                                            </p>
                                                            <p className="mt-2 text-xs text-green-200">
                                                                 {speaker.topic}
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </div>

                              {/* Testimonials */}
                              <div className="mb-12">
                                   <h2 className="mb-6 text-2xl font-bold text-white">
                                        <span className="text-green-400">
                                             REAL PEOPLE
                                        </span>
                                        , REAL AI WINS
                                   </h2>
                                   <div className="space-y-4">
                                        {EVENT_TESTIMONIALS.map(
                                             (testimonial, index) => (
                                                  <div
                                                       key={index}
                                                       className="rounded-xl bg-gradient-to-br from-green-900/20 to-black/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                                                  >
                                                       <p className="italic text-green-200">
                                                            "{testimonial.quote}
                                                            "
                                                       </p>
                                                       <div className="mt-4 flex justify-between">
                                                            <span className="font-medium text-white">
                                                                 {
                                                                      testimonial.author
                                                                 }
                                                            </span>
                                                            <span className="rounded-full bg-green-800/50 px-3 py-1 text-xs font-bold text-green-300">
                                                                 {
                                                                      testimonial.result
                                                                 }
                                                            </span>
                                                       </div>
                                                  </div>
                                             ),
                                        )}
                                   </div>
                              </div>

                              {/* Event Agenda */}
                              <div className="mb-12">
                                   <div
                                        className="flex cursor-pointer items-center justify-between rounded-t-xl bg-gradient-to-r from-green-900/50 to-black/50 p-4 backdrop-blur-sm"
                                        onClick={() =>
                                             setShowAgenda(!showAgenda)
                                        }
                                   >
                                        <h2 className="text-2xl font-bold text-white">
                                             <span className="text-green-400">
                                                  WHY YOU SHOULD ATTEND
                                             </span>{" "}
                                             - YOUR AI BLUEPRINT
                                        </h2>
                                   </div>

                                   <div className="rounded-b-xl bg-gradient-to-br from-green-900/20 to-black/50 p-6 backdrop-blur-sm">
                                        <div className="space-y-4">
                                             {AGENDA.map((item, index) => (
                                                  <div
                                                       key={index}
                                                       className={`flex items-start rounded-lg p-4 ${item.highlight ? "border-l-4 border-green-500 bg-green-900/30" : "bg-black/30"}`}
                                                  >
                                                       <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-700/30 text-green-400">
                                                            <TargetIcon className="m-3 h-5 w-5" />
                                                       </div>
                                                       <div>
                                                            <h3 className="text-lg font-bold text-white">
                                                                 {item.title}
                                                            </h3>
                                                            <p className="text-green-200">
                                                                 {
                                                                      item.description
                                                                 }
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         {/* Date and Venue */}
                         <div className="mb-12">
                              <h2 className="mb-6 text-2xl font-bold text-white">
                                   <span className="text-green-400">
                                        WHEN AND WHERE
                                   </span>{" "}
                                   - EVENT DETAILS
                              </h2>
                              <div className="rounded-xl bg-gradient-to-br from-green-900/20 to-black/50 p-6 backdrop-blur-sm">
                                   <div className="space-y-4">
                                        <div className="flex items-start">
                                             <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-700/30 text-green-400">
                                                  <CalendarDaysIcon className="h-5 w-5" />
                                             </div>
                                             <div>
                                                  <h3 className="text-lg font-bold text-white">
                                                       Date
                                                  </h3>
                                                  <p className="text-green-200">
                                                       30th of August 2025
                                                  </p>
                                             </div>
                                        </div>
                                        {/* <div className="flex items-start">
                                             <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-700/30 text-green-400">
                                                  <MapPinIcon className="h-5 w-5" />
                                             </div>
                                             <div>
                                                  <h3 className="text-lg font-bold text-white">
                                                       Venue
                                                  </h3>
                                                  <p className="text-green-200">
                                                       22rd Chicken Republic
                                                       Building (FESTAC Tower),
                                                       AMG Workspace, 1st floor,
                                                       FESTAC Town, Lagos,
                                                       Nigeria
                                                  </p>
                                             </div>
                                        </div> */}
                                   </div>
                              </div>
                         </div>
                         <div ref={formRef}>
                              <Card className="border-0 bg-gradient-to-b from-green-900/30 to-black/80 shadow-2xl backdrop-blur-xl">
                                   <CardHeader className="pb-6">
                                        <CardTitle className="text-2xl font-bold text-white">
                                             <span className="text-green-600">
                                                  JOIN NOW:
                                             </span>{" "}
                                             FUTURE-PROOF YOUR CAREER
                                        </CardTitle>
                                        <CardDescription className="text-xl text-green-600 md:text-2xl">
                                             <Typewriter
                                                  options={{
                                                       strings: [
                                                            "Your AI upgrade starts here",
                                                            "Apply AI in every corner of your field",
                                                            "Become the 1% of 1%",
                                                       ],
                                                       autoStart: true,
                                                       loop: true,
                                                       delay: 50,
                                                       deleteSpeed: 30,
                                                  }}
                                             />
                                        </CardDescription>
                                   </CardHeader>
                                   <CardContent className="p-6">
                                        <Form {...form}>
                                             <form
                                                  onSubmit={form.handleSubmit(
                                                       onSubmit,
                                                  )}
                                                  className="space-y-6"
                                             >
                                                  <div className="grid grid-cols-1 gap-6">
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="fullName"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           Your
                                                                           Name
                                                                           (What
                                                                           your
                                                                           boss
                                                                           calls
                                                                           you)
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "fullName",
                                                                                     )}
                                                                                </div>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     placeholder="John Doe"
                                                                                     className="pl-10"
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="age"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           Age
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "age",
                                                                                     )}
                                                                                </div>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     type="number"
                                                                                     placeholder="25"
                                                                                     className="pl-10"
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="dateOfBirth"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           Date
                                                                           of
                                                                           Birth
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "dateOfBirth",
                                                                                     )}
                                                                                </div>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     type="date"
                                                                                     className="pl-10"
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="phoneNumber"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           Phone
                                                                           Number
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative flex items-center">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "phoneNumber",
                                                                                     )}
                                                                                </div>
                                                                                <span className="absolute left-10 top-1/2 -translate-y-1/2 text-white">
                                                                                     +234
                                                                                </span>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     placeholder="8012345678"
                                                                                     className="pl-20"
                                                                                     maxLength={
                                                                                          10
                                                                                     }
                                                                                     onChange={(
                                                                                          e,
                                                                                     ) => {
                                                                                          const value =
                                                                                               e.target.value.replace(
                                                                                                    /\D/g,
                                                                                                    "",
                                                                                               );
                                                                                          field.onChange(
                                                                                               value,
                                                                                          );
                                                                                     }}
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="email"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           Email
                                                                           (Where
                                                                           we
                                                                           send
                                                                           your
                                                                           AI
                                                                           survival
                                                                           kit)
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "email",
                                                                                     )}
                                                                                </div>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     placeholder="email@example.com"
                                                                                     type="email"
                                                                                     className="pl-10"
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                       <FormItem>
                                                            <FormLabel>
                                                                 Your Industry
                                                                 (We'll
                                                                 customize your
                                                                 toolkit)
                                                            </FormLabel>
                                                            <FormControl>
                                                                 <div className="relative">
                                                                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                           {getFieldIcon(
                                                                                "industry",
                                                                           )}
                                                                      </div>
                                                                      <select
                                                                           {...form.register(
                                                                                "industry",
                                                                           )}
                                                                           disabled={
                                                                                isPending
                                                                           }
                                                                           className="w-full rounded-lg border border-green-700/50 bg-black/30 p-3 pl-10 text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                                                      >
                                                                           <option value="">
                                                                                Select
                                                                                your
                                                                                battlefield
                                                                           </option>
                                                                           {INDUSTRIES.map(
                                                                                (
                                                                                     industry,
                                                                                ) => (
                                                                                     <option
                                                                                          key={
                                                                                               industry
                                                                                          }
                                                                                          value={
                                                                                               industry
                                                                                          }
                                                                                     >
                                                                                          {
                                                                                               industry
                                                                                          }
                                                                                     </option>
                                                                                ),
                                                                           )}
                                                                      </select>
                                                                 </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                       </FormItem>
                                                       <FormField
                                                            control={
                                                                 form.control
                                                            }
                                                            name="goals"
                                                            render={({
                                                                 field,
                                                            }) => (
                                                                 <FormItem>
                                                                      <FormLabel>
                                                                           What
                                                                           will
                                                                           you
                                                                           conquer
                                                                           with
                                                                           AI?
                                                                           (Optional)
                                                                      </FormLabel>
                                                                      <FormControl>
                                                                           <div className="relative">
                                                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                                                     {getFieldIcon(
                                                                                          "goals",
                                                                                     )}
                                                                                </div>
                                                                                <Input
                                                                                     {...field}
                                                                                     disabled={
                                                                                          isPending
                                                                                     }
                                                                                     placeholder="Your AI goals"
                                                                                     className="pl-10"
                                                                                />
                                                                           </div>
                                                                      </FormControl>
                                                                      <FormMessage />
                                                                 </FormItem>
                                                            )}
                                                       />
                                                  </div>
                                                  <div className="rounded-lg bg-black/40 p-4">
                                                       <div className="flex items-center">
                                                            <div className="mr-3 animate-pulse text-green-400">
                                                                 <Zap className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                 <h3 className="font-bold text-green-300">
                                                                      Instant
                                                                      Access Kit
                                                                 </h3>
                                                                 <p className="text-sm text-green-200">
                                                                      Register
                                                                      now and
                                                                      get
                                                                      immediate
                                                                      access to
                                                                      our "5 AI
                                                                      Hacks You
                                                                      Can Use
                                                                      Tomorrow"
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <Button
                                                       type="submit"
                                                       className="w-full bg-gradient-to-r from-green-600 to-black hover:from-white hover:to-green-700"
                                                       disabled={isPending}
                                                  >
                                                       {isPending
                                                            ? "🔒 LOCKING MY SPOT..."
                                                            : "🔐 LOCK MY SPOT BEFORE ROBOTS DO"}
                                                  </Button>
                                             </form>
                                        </Form>
                                   </CardContent>
                              </Card>

                              {/* Guarantee */}
                              <div className="mt-6 rounded-xl bg-gradient-to-r from-green-900/30 to-black/80 p-6 text-center backdrop-blur-sm">
                                   <div className="flex items-center justify-center">
                                        <ShieldCheckIcon className="mr-2 h-10 w-10 text-green-400" />
                                        <h3 className="text-lg font-bold text-white">
                                             Zero-Risk Guarantee
                                        </h3>
                                   </div>
                                   <p className="mt-2 text-green-200">
                                        If you don't leave with at least 3
                                        actionable strategies to future-proof
                                        your career, we'll refund your time with
                                        exclusive AI resources (500+ value)
                                   </p>
                              </div>
                         </div>
                         ;
                    </div>
                    {showRegisterButton && (
                         <Button
                              onClick={scrollToForm}
                              className="register-button fixed bottom-8 left-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-black px-4 py-2 text-white shadow-lg hover:from-white hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                         >
                              <span>Take me to register</span>
                              <ArrowDownIcon className="h-5 w-5" />
                         </Button>
                    )}
               </MaxWidthWrapper>
          </div>
     );
}
