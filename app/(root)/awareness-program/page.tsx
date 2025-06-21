"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlotsCounter } from "@/components/ui/slot-counter";
import { FormField } from "@/components/ui/form-field";
import { toast } from "sonner";

interface FormData {
     fullName: string;
     age: string;
     dateOfBirth: string;
     phoneNumber: string;
     email: string;
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

     const maxSlots = 100;

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
                         email: formData.email,
                         goals: formData.goals,
                    }),
               });

               if (!response.ok) throw new Error("Registration failed");
               const data = await response.json();
               setSubmissionStatus(data.status);
               setIsSubmitted(true);
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
                                        : "Registration Successful!"}
                              </h2>
                              <p className="leading-relaxed text-primary/80">
                                   {submissionStatus === "WAITLISTED"
                                        ? "Thanks for registering! All 100 slots are filled. You’re on our waitlist—we’ll contact you if a spot opens or for future sessions."
                                        : "Registration successful! You’ve secured a spot. Expect updates as the event nears."}
                              </p>
                              <Button
                                   onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({
                                             fullName: "",
                                             age: "",
                                             dateOfBirth: "",
                                             phoneNumber: "",
                                             email: "",
                                             goals: "",
                                        });
                                        setSubmissionStatus(null);
                                   }}
                                   className="mt-6 bg-gradient-to-r from-green-600 to-black hover:from-white hover:to-green-700"
                              >
                                   Register Another Person
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
               <div className="mx-auto max-w-2xl">
                    <div className="mb-8 text-center">
                         <h1 className="mb-4 bg-gradient-to-r from-black to-green-600 bg-clip-text text-4xl font-bold text-transparent">
                              Awareness Program 2025
                         </h1>
                         <p className="text-lg font-bold text-primary">
                              Join us for a transformative learning experience
                         </p>
                    </div>
                    <SlotsCounter maxSlots={maxSlots} />
                    <Card className="border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
                         <CardHeader className="pb-6">
                              <CardTitle className="text-2xl font-bold text-gray-800">
                                   Secure Your Spot
                              </CardTitle>
                              <CardDescription className="text-gray-600">
                                   Fill in your details to register for the
                                   program
                              </CardDescription>
                         </CardHeader>
                         <CardContent className="p-6">
                              <form
                                   onSubmit={handleSubmit}
                                   className="space-y-6"
                              >
                                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                             id="fullName"
                                             label="Full Name"
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
                                             icon={getFieldIcon("fullName")}
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
                                                  Number.parseInt(value) <= 100
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
                                             validate={(value) => value !== ""}
                                             icon={getFieldIcon("dateOfBirth")}
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
                                                       value.replace(/\s/g, ""),
                                                  )
                                             }
                                             icon={getFieldIcon("phoneNumber")}
                                        />
                                   </div>
                                   <FormField
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={(value) =>
                                             handleInputChange("email", value)
                                        }
                                        required
                                        validate={(value) =>
                                             /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                                  value,
                                             )
                                        }
                                        icon={getFieldIcon("email")}
                                   />
                                   <FormField
                                        id="goals"
                                        label="What do you intend to achieve at the program? (Optional)"
                                        value={formData.goals}
                                        onChange={(value) =>
                                             handleInputChange("goals", value)
                                        }
                                        icon={getFieldIcon("goals")}
                                   />
                                   <SubmitSection
                                        isSubmitting={isSubmitting}
                                        isFormValid={isFormValid}
                                        onSubmit={handleSubmit}
                                   />
                                   <div className="text-center">
                                        <p className="text-sm text-gray-500">
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
               </div>
          </div>
     );
}
