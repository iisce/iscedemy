"use client";

import { useState, useEffect, useRef } from "react";
import {
     Card,
     CardContent,
     CardHeader,
     CardTitle,
     CardDescription,
} from "@/components/ui/card";
import { SubmitSection } from "@/components/ui/submit-section";
import {
     CheckCircle,
     AlertCircle,
     Users,
     Calendar,
     Mail,
     Phone,
     User,
     Target,
     Zap,
     ChevronUp,
     ChevronDown,
     Clock,
     Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlotsCounter } from "@/components/ui/slot-counter";
import { FormField } from "@/components/ui/form-field";
import { toast } from "sonner";
import Typewriter from "typewriter-effect";
import { AGENDA, EVENT_TESTIMONIALS, INDUSTRIES, SPEAKERS } from "@/lib/consts";

interface FormData {
     fullName: string;
     age: string;
     dateOfBirth: string;
     phoneNumber: string;
     email: string;
     industry?: string; // Optional field for industry
     goals: string;
}

interface ValidationState {
     fullName: boolean;
     age: boolean;
     dateOfBirth: boolean;
     phoneNumber: boolean;
     email: boolean;
}

export default function AwarenessProgram() {
     const [formData, setFormData] = useState<FormData>({
          fullName: "",
          age: "",
          dateOfBirth: "",
          phoneNumber: "",
          email: "",
          industry: "",
          goals: "",
     });

     const [validation, setValidation] = useState<ValidationState>({
          fullName: false,
          age: false,
          dateOfBirth: false,
          phoneNumber: false,
          email: false,
     });

     const [focusedField, setFocusedField] = useState<string>("");
     const [isSubmitted, setIsSubmitted] = useState(false);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [submissionStatus, setSubmissionStatus] = useState<
          "CONFIRMED" | "WAITLISTED" | null
     >(null);
     const [timeLeft, setTimeLeft] = useState({
          hours: 48,
          minutes: 0,
          seconds: 0,
     });
     const [showAgenda, setShowAgenda] = useState(false);
     const [remainingSlots, setRemainingSlots] = useState(50);
     const [recentRegistrants, setRecentRegistrants] = useState<string[]>([]);
     const timerRef = useRef<NodeJS.Timeout | null>(null);
     const countdownRef = useRef<NodeJS.Timeout | null>(null);

     const maxSlots = 50;

     useEffect(() => {
          const names = ["Alex", "Jamie", "Taylor", "Jordan", "Casey", "Riley"];
          const industries = ["Security", "Design", "Product", "Engineering"];

          timerRef.current = setInterval(() => {
               if (remainingSlots > 0 && Math.random() > 0.7) {
                    const randomName =
                         names[Math.floor(Math.random() * names.length)];
                    const randomIndustry =
                         industries[
                              Math.floor(Math.random() * industries.length)
                         ];
                    setRecentRegistrants((prev) => [
                         `${randomName} (${randomIndustry}) just secured a spot`,
                         ...prev.slice(0, 3),
                    ]);
                    setRemainingSlots((prev) => prev - 1);
               }
          }, 8000);

          return () => {
               if (timerRef.current) clearInterval(timerRef.current);
          };
     }, [remainingSlots]);

     useEffect(() => {
          let totalSeconds = 48 * 3600; // 48 hours in seconds

          countdownRef.current = setInterval(() => {
               totalSeconds--;

               const hours = Math.floor(totalSeconds / 3600);
               const minutes = Math.floor((totalSeconds % 3600) / 60);
               const seconds = totalSeconds % 60;

               setTimeLeft({ hours, minutes, seconds });

               if (totalSeconds <= 0) {
                    clearInterval(countdownRef.current as NodeJS.Timeout);
               }
          }, 1000);

          return () => {
               if (countdownRef.current) clearInterval(countdownRef.current);
          };
     }, []);

     useEffect(() => {
          setValidation({
               fullName: formData.fullName.trim().length >= 2,
               age:
                    Number.parseInt(formData.age) >= 16 &&
                    Number.parseInt(formData.age) <= 100,
               dateOfBirth: formData.dateOfBirth !== "",
               phoneNumber: /^[+]?[1-9][\d]{0,15}$/.test(
                    formData.phoneNumber.replace(/\s/g, ""),
               ),
               email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
          });
     }, [formData]);

     const handleInputChange = (field: keyof FormData, value: string) => {
          setFormData((prev) => ({ ...prev, [field]: value }));
     };

     const isFormValid = Object.values(validation).every(Boolean);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!isFormValid) return;

          setIsSubmitting(true);
          setError(null);

          try {
               const response = await fetch("/api/awareness-program", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         fullName: formData.fullName,
                         age: parseInt(formData.age),
                         dateOfBirth: formData.dateOfBirth,
                         phoneNumber: formData.phoneNumber,
                         industry: formData.industry || "Not specified",
                         email: formData.email,
                         goals: formData.goals,
                    }),
               });

               if (!response.ok) throw new Error("Registration failed");
               const data = await response.json();
               setSubmissionStatus(data.status);
               setIsSubmitted(true);

               setRecentRegistrants((prev) => [
                    `${formData.fullName.split(" ")[0]} (${formData.industry || "Tech"}) just registered`,
                    ...prev.slice(0, 3),
               ]);
               setRemainingSlots((prev) => prev - 1);
          } catch (err) {
               setError(
                    err instanceof Error
                         ? err.message
                         : "An unexpected error occurred",
               );
          } finally {
               setIsSubmitting(false);
          }
     };

     const getFieldIcon = (field: string) => {
          const icons = {
               fullName: <User className="h-4 w-4" />,
               age: <Users className="h-4 w-4" />,
               dateOfBirth: <Calendar className="h-4 w-4" />,
               phoneNumber: <Phone className="h-4 w-4" />,
               email: <Mail className="h-4 w-4" />,
               industry: <Zap className="h-4 w-4" />,
               goals: <Target className="h-4 w-4" />,
          };
          return icons[field as keyof typeof icons];
     };

     if (isSubmitted) {
          return (
               <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-black to-green-50 p-4">
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
                                        <AlertCircle className="h-8 w-8 text-orange-600" />
                                   ) : (
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                   )}
                              </div>
                              <h2 className="mb-4 text-2xl font-bold text-primary">
                                   {submissionStatus === "WAITLISTED"
                                        ? "You're on the Waitlist!"
                                        : "Access Granted!"}
                              </h2>
                              <p className="leading-relaxed text-primary/80">
                                   {submissionStatus === "WAITLISTED"
                                        ? "All 50 slots are filled. We'll contact you immediately if a spot opens. Check your email for exclusive AI resources."
                                        : "You've secured your spot! Check your email for your AI Survival Kit. Event details coming soon."}
                              </p>
                              <Button
                                   onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({
                                             fullName: "",
                                             age: "",
                                             dateOfBirth: "",
                                             phoneNumber: "",
                                             industry: "",
                                             email: "",
                                             goals: "",
                                        });
                                        setSubmissionStatus(null);
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
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-black to-green-50 px-4 py-8">
               <div className="mx-auto max-w-5xl">
                    <div className="mb-12 text-center">
                         <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-600 to-green-800 px-4 py-1 text-sm font-bold text-white">
                              <Typewriter
                                   options={{
                                        strings: [
                                             "50 SEATS ONLY",
                                             "REGISTRATION OPEN",
                                             "AI FUTURE-PROOF",
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
                              Join 4 industry rebels (security, UX, PMs,
                              engineers) as they expose how to weaponize AI — or
                              become obsolete by 2026
                         </p>

                         <div className="mx-auto my-8 max-w-md rounded-xl bg-gradient-to-r from-green-900/50 to-black/50 p-6 backdrop-blur-sm">
                              <div className="flex flex-col justify-between gap-6 md:flex-row">
                                   <div className="text-center md:text-left">
                                        <div className="text-sm text-green-300">
                                             Seats remaining
                                        </div>
                                        <div className="animate-pulse text-3xl font-bold text-white">
                                             {remainingSlots}/50
                                        </div>
                                   </div>
                                   <div className="text-center md:text-left">
                                        <div className="text-sm text-green-300">
                                             Registration closes in
                                        </div>
                                        <div className="flex justify-center gap-2 md:justify-start">
                                             <div className="flex flex-col items-center">
                                                  <div className="animate-bounce text-2xl font-bold text-white">
                                                       {timeLeft.hours
                                                            .toString()
                                                            .padStart(2, "0")}
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
                                                            .padStart(2, "0")}
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
                                                            .padStart(2, "0")}
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
                                             key={idx}
                                             className="flex items-center text-green-300"
                                        >
                                             <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                             <span>{registrant}</span>
                                        </div>
                                   ))}
                              </div>
                         </div>
                    )}
                    {/* <SlotsCounter maxSlots={maxSlots} /> */}
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
                                             <div className="mr-3 mt-1 text-red-400">
                                                  ✖
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-red-300">
                                                       "AI will replace you"
                                                  </h3>
                                                  <p className="text-green-200">
                                                       Reality: It only replaces
                                                       those who ignore it.
                                                       Learn to make AI your
                                                       indentured servant.
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
                                                       "AI is your co-pilot"
                                                  </h3>
                                                  <p className="text-green-200">
                                                       Truth: The top 10% in
                                                       every field are already
                                                       using AI to 10x their
                                                       output. You'll learn
                                                       their exact frameworks.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="rounded-lg bg-black/40 p-4 transition-all duration-300 hover:bg-black/60">
                                        <div className="flex items-start">
                                             <div className="mr-3 mt-1 text-red-400">
                                                  ✖
                                             </div>
                                             <div>
                                                  <h3 className="font-bold text-red-300">
                                                       "AI is too technical"
                                                  </h3>
                                                  <p className="text-green-200">
                                                       Reality: New no-code
                                                       tools let anyone harness
                                                       AI. We'll give you the
                                                       exact playbook.
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
                                                       <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full border-2 border-dashed bg-gray-200 text-gray-400">
                                                            <User className="h-8 w-8" />
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
                                                       <p className="mt-2 max-h-0 text-xs text-green-200 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                                                            {
                                                                 speaker.achievement
                                                            }
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
                                                       "{testimonial.quote}"
                                                  </p>
                                                  <div className="mt-4 flex justify-between">
                                                       <span className="font-medium text-white">
                                                            {testimonial.author}
                                                       </span>
                                                       <span className="rounded-full bg-green-800/50 px-3 py-1 text-xs font-bold text-green-300">
                                                            {testimonial.result}
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
                                   onClick={() => setShowAgenda(!showAgenda)}
                              >
                                   <h2 className="text-2xl font-bold text-white">
                                        <span className="text-green-400">
                                             EVENT AGENDA
                                        </span>{" "}
                                        - YOUR AI BLUEPRINT
                                   </h2>
                                   {/* {showAgenda ? (
                                        <ChevronUp className="h-6 w-6 text-green-400" />
                                   ) : (
                                        <ChevronDown className="h-6 w-6 text-green-400" />
                                   )} */}
                              </div>

                              <div className="rounded-b-xl bg-gradient-to-br from-green-900/20 to-black/50 p-6 backdrop-blur-sm">
                                   <div className="space-y-4">
                                        {AGENDA.map((item, index) => (
                                             <div
                                                  key={index}
                                                  className={`flex items-start rounded-lg p-4 ${item.highlight ? "border-l-4 border-green-500 bg-green-900/30" : "bg-black/30"}`}
                                             >
                                                  <div className="mr-4 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-700/30 text-green-400">
                                                       <Clock className="h-5 w-5" />
                                                  </div>
                                                  <div>
                                                       <div className="font-bold text-white">
                                                            {item.time}
                                                       </div>
                                                       <h3 className="text-lg font-bold text-white">
                                                            {item.title}
                                                       </h3>
                                                       <p className="text-green-200">
                                                            {item.description}
                                                       </p>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div>
                         <Card className="border-0 bg-gradient-to-b from-green-900/30 to-black/80 shadow-2xl backdrop-blur-xl">
                              <CardHeader className="pb-6">
                                   <CardTitle className="text-2xl font-bold text-white">
                                        <span className="text-green-600">
                                             WARNING:
                                        </span>{" "}
                                        50 SEATS. NO BS.
                                   </CardTitle>
                                   <CardDescription className="text-xl text-green-500">
                                        Your future-proof upgrade starts here
                                   </CardDescription>
                              </CardHeader>
                              <CardContent className="p-6">
                                   <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                   >
                                        <div className="grid grid-cols-1 gap-6">
                                             <FormField
                                                  id="fullName"
                                                  label="Your Name (What your boss calls you)"
                                                  value={formData.fullName}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "fullName",
                                                            value,
                                                       )
                                                  }
                                                  required
                                                  validate={(value) =>
                                                       value.trim().length >= 2
                                                  }
                                                  icon={getFieldIcon(
                                                       "fullName",
                                                  )}
                                             />

                                             <FormField
                                                  id="age"
                                                  label="Age"
                                                  type="number"
                                                  value={formData.age}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "age",
                                                            value,
                                                       )
                                                  }
                                                  required
                                                  validate={(value) =>
                                                       Number.parseInt(value) >=
                                                            16 &&
                                                       Number.parseInt(value) <=
                                                            100
                                                  }
                                                  icon={getFieldIcon("age")}
                                             />
                                             <FormField
                                                  id="dateOfBirth"
                                                  label="Date of Birth"
                                                  type="date"
                                                  value={formData.dateOfBirth}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "dateOfBirth",
                                                            value,
                                                       )
                                                  }
                                                  required
                                                  validate={(value) =>
                                                       value !== ""
                                                  }
                                                  icon={getFieldIcon(
                                                       "dateOfBirth",
                                                  )}
                                             />
                                             <FormField
                                                  id="phoneNumber"
                                                  label="Phone Number"
                                                  type="tel"
                                                  value={formData.phoneNumber}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "phoneNumber",
                                                            value,
                                                       )
                                                  }
                                                  required
                                                  validate={(value) =>
                                                       /^[+]?[1-9][\d]{0,15}$/.test(
                                                            value.replace(
                                                                 /\s/g,
                                                                 "",
                                                            ),
                                                       )
                                                  }
                                                  icon={getFieldIcon(
                                                       "phoneNumber",
                                                  )}
                                             />
                                             <FormField
                                                  id="email"
                                                  label="Email (Where we send your AI survival kit)"
                                                  type="email"
                                                  value={formData.email}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "email",
                                                            value,
                                                       )
                                                  }
                                                  required
                                                  validate={(value) =>
                                                       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                                            value,
                                                       )
                                                  }
                                                  icon={getFieldIcon("email")}
                                             />

                                             <div>
                                                  <label className="mb-2 block text-sm font-medium text-green-500">
                                                       Your Industry (We'll
                                                       customize your toolkit)
                                                  </label>
                                                  <select
                                                       value={formData.industry}
                                                       onChange={(e) =>
                                                            handleInputChange(
                                                                 "industry",
                                                                 e.target.value,
                                                            )
                                                       }
                                                       className="w-full rounded-lg border border-green-700/50 bg-black/30 p-3 text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                                  >
                                                       <option value="">
                                                            Select your
                                                            battlefield
                                                       </option>
                                                       {INDUSTRIES.map(
                                                            (industry) => (
                                                                 <option
                                                                      key={
                                                                           industry
                                                                      }
                                                                      value={
                                                                           industry
                                                                      }
                                                                 >
                                                                      {industry}
                                                                 </option>
                                                            ),
                                                       )}
                                                  </select>
                                             </div>

                                             <FormField
                                                  id="goals"
                                                  label="What will you conquer with AI? (Optional)"
                                                  value={formData.goals}
                                                  onChange={(value) =>
                                                       handleInputChange(
                                                            "goals",
                                                            value,
                                                       )
                                                  }
                                                  icon={getFieldIcon("goals")}
                                             />
                                        </div>

                                        <div className="rounded-lg bg-black/40 p-4">
                                             <div className="flex items-center">
                                                  <div className="mr-3 animate-pulse text-green-400">
                                                       <Zap className="h-5 w-5" />
                                                  </div>
                                                  <div>
                                                       <h3 className="font-bold text-green-300">
                                                            Instant Access Kit
                                                       </h3>
                                                       <p className="text-sm text-green-200">
                                                            Register now and get
                                                            immediate access to
                                                            our "5 AI Hacks You
                                                            Can Use Tomorrow"
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>

                                        <SubmitSection
                                             isSubmitting={isSubmitting}
                                             isFormValid={isFormValid}
                                             onSubmit={handleSubmit}
                                             buttonText="🔐 LOCK MY SPOT BEFORE ROBOTS DO"
                                        />

                                        <div className="text-center">
                                             <p className="text-sm text-green-500">
                                                  {
                                                       Object.values(
                                                            validation,
                                                       ).filter(Boolean).length
                                                  }{" "}
                                                  of 5 required fields completed
                                             </p>
                                        </div>
                                   </form>
                              </CardContent>
                         </Card>

                         {/* Guarantee */}
                         <div className="mt-6 rounded-xl bg-gradient-to-r from-green-900/30 to-black/50 p-6 text-center backdrop-blur-sm">
                              <div className="flex items-center justify-center">
                                   <Shield className="mr-2 h-5 w-5 text-green-400" />
                                   <h3 className="text-lg font-bold text-white">
                                        Zero-Risk Guarantee
                                   </h3>
                              </div>
                              <p className="mt-2 text-green-200">
                                   If you don't leave with at least 3 actionable
                                   strategies to future-proof your career, we'll
                                   refund your time with exclusive AI resources
                                   (500+ value)
                              </p>
                         </div>
                    </div>
                    ;
               </div>
          </div>
     );
}
