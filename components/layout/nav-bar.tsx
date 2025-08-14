"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import { NAVLINKS } from "@/lib/consts";
import LogInButton from "./log-in-button";
import NavBarItem from "./nav-bar-item";
import { User } from "next-auth";

export default function NavBar({ user }: { user?: User }) {
     return (
          <div className="bg-primary text-background">
               <MaxWidthWrapper>
                    <nav className="flex h-20 items-center justify-between">
                         <div className="justify-left flex items-center gap-12">
                              <Link href="/">
                                   <Image
                                        width={150}
                                        height={150}
                                        alt="PalmTechnIQ"
                                        src="/assets/palmtechniqlogo.png"
                                        className="h-full w-full"
                                   />
                              </Link>
                              <div className="hidden gap-8 lg:flex">
                                   <ul className="flex flex-1 items-center justify-end gap-9">
                                        {NAVLINKS.map((nav, k) => (
                                             <NavBarItem
                                                  href={nav.href}
                                                  title={nav.title}
                                                  key={k}
                                             />
                                        ))}
                                   </ul>
                              </div>
                         </div>
                         <div className="flex items-center gap-2">
                              <Button
                                   variant="outline"
                                   className="hidden h-12 rounded-full bg-background text-primary hover:bg-none hover:text-primary lg:flex"
                                   asChild
                              >
                                   <Link href="/awareness-program">
                                        {`Get Events Access`}
                                   </Link>
                              </Button>
                              <Button
                                   variant="ghost"
                                   className="hidden h-12 rounded-full border border-background bg-transparent text-background hover:bg-none hover:text-primary lg:flex"
                                   asChild
                              >
                                   <Link href="https://wa.me/qr/">
                                        {`Speak to admissions`}
                                   </Link>
                              </Button>
                              <LogInButton user={user} />
                              <MobileMenu />
                         </div>
                    </nav>
               </MaxWidthWrapper>
          </div>
     );
}
