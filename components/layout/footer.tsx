"use client";
import { subscribe } from "@/actions/subcribe";
import {
     Loader,
     LucideFacebook,
     LucideInstagram,
     LucideLinkedin,
     LucideMail,
     LucideMapPin,
     LucidePhone,
     LucideYoutube,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import { toast } from "sonner";

export default function Footer() {
     const [email, setEmail] = useState("");
     const [error, setError] = useState<string | undefined>(undefined);
     const [success, setSuccess] = useState<string | undefined>(undefined);
     const [isPending, startTransition] = useTransition();

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          setError("");
          setSuccess("");

          startTransition(async () => {
               try {
                    const result = await subscribe({ email });
                    if (result.error) {
                         setError(result.error);
                    } else {
                         setSuccess(result.success);
                         toast("Subscribed successfully!");
                         setEmail("");
                    }
               } catch (error) {
                    console.error("Error subscribing to newsletter:", error);
                    setError(
                         "An error occurred while subscribing. Please try again.",
                    );
                    toast(
                         "An error occured while subscribing. Please try again!",
                    );
               }
          });
     };
     return (
          <div className="bg-primary pt-8 text-background">
               <MaxWidthWrapper>
                    <div className="grid grid-cols-1 justify-between gap-7 md:grid-cols-3 lg:grid-cols-5">
                         <div className="flex w-full flex-col gap-4">
                              <div className="text-lg font-bold">{`PalmTechnIQ`}</div>
                              <div className="text-sm font-normal">
                                   {`PalmTechnIQ is an educational platform that offers a wide range of courses and resources in various fields such as technology, business, arts, and more. Our mission is to provide accessible and high-quality education to learners worldwide. `}
                              </div>
                         </div>

                         <div className="flex w-full flex-col gap-4 text-sm">
                              <ol className="text-lg font-bold"> Contact Us</ol>
                              <ol className="flex cursor-pointer gap-2">
                                   <LucideMapPin className="shrink-0" />
                                   <Link href="https://maps.app.goo.gl/V3F3m68ZbcWWp8in8">
                                        {`1st Floor, (Festac Tower) Chicken Republic building, 22rd ,Festac Town, Lagos, Nigeria`}
                                   </Link>
                              </ol>
                              <ol className="flex cursor-pointer gap-2">
                                   <LucideMail className="shrink-0" />
                                   <Link href="mailto:support@palmtechniq.com">
                                        support@palmtechniq.com
                                   </Link>
                              </ol>
                              <ol className="flex cursor-pointer gap-2">
                                   <LucidePhone className="shrink-0" />
                                   <Link href="tel:+2349137206365">
                                        {" "}
                                        09137206365{" "}
                                   </Link>
                              </ol>
                         </div>

                         <div className="flex w-full flex-col gap-4 text-sm">
                              <ol className="text-lg font-bold">Company</ol>
                              <Link
                                   href="https://www.isce.tech"
                                   className="cursor-pointer"
                              >
                                   About Us
                              </Link>
                              <Link
                                   href="/terms-of-use"
                                   className="cursor-pointer"
                              >
                                   Terms Of Use
                              </Link>
                              <Link
                                   href="/privacy-policy"
                                   className="cursor-pointer"
                              >
                                   Privacy & Policy
                              </Link>
                              <Link href="/faq" className="cursor-pointer">
                                   {`Frequently Asked Question`}
                              </Link>
                         </div>
                         <div className="flex w-full flex-col gap-4 text-sm">
                              <ol className="text-lg font-bold">Resources</ol>
                              <Link href="/podcast" className="cursor-pointer">
                                   Podcast
                              </Link>
                              <Link
                                   href="/become-tutor"
                                   className="cursor-pointer"
                              >
                                   {`Become A Tutor`}
                              </Link>
                              <Link
                                   href="/certificate"
                                   className="cursor-pointer"
                              >
                                   {`Verify Certificate`}
                              </Link>
                              <Link href="/blog" className="cursor-pointer">
                                   {`Blog`}
                              </Link>
                              <Link href="/docs" className="cursor-pointer">
                                   {`Documentation`}
                              </Link>
                         </div>

                         <div className="flex w-full flex-col gap-4 text-sm">
                              <div className="text-lg font-bold">
                                   {`Get FREE roadmap to start your web development journey!`}
                              </div>
                              <form onSubmit={handleSubmit}>
                                   <div className="my-4 h-12 rounded-full">
                                        <input
                                             value={email}
                                             onChange={(e) =>
                                                  setEmail(e.target.value)
                                             }
                                             placeholder="Enter your email address to get your roapmap!"
                                             type="email"
                                             className="h-full w-full rounded-full border-none bg-slate-100 px-3 text-black placeholder:text-black"
                                        />
                                   </div>
                                   <Button
                                        type="submit"
                                        variant="outline"
                                        className="h-12 w-full rounded-full bg-background text-primary hover:bg-none"
                                        disabled={isPending || !email}
                                   >
                                        {isPending ? (
                                             <Loader className="h-6 w-6 animate-spin" />
                                        ) : (
                                             "Send My FREE Roadmap!"
                                        )}
                                   </Button>
                                   <FormError message={error} />
                                   <FormSuccess message={success} />
                              </form>
                         </div>
                    </div>
                    <div className="space-y-2 pb-2 pt-10">
                         <div className="flex items-center justify-center gap-4 py-2">
                              {/* <Link href='https://www.twitter.com/'>
						<LucideTwitter />
					</Link> */}
                              <Link href="https://www.facebook.com/profile.php?id=61560523394595">
                                   <LucideFacebook />
                              </Link>
                              <Link href="https://www.instagram.com/palmtechniq/">
                                   <LucideInstagram />
                              </Link>
                              <Link href="https://www.linkedin.com/">
                                   <LucideLinkedin />
                              </Link>
                              <Link href="https://www.youtube.com/@isceapp">
                                   <LucideYoutube />
                              </Link>
                         </div>
                         <div className="grid items-center justify-center text-center">
                              {`Powered by ISCE`}
                              <br />
                              {`2024 PalmTechnIQ. All Rights Reserved.`}
                         </div>
                    </div>
               </MaxWidthWrapper>
          </div>
     );
}
