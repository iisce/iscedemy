"use client";
import { NAVLINKS } from "@/lib/consts";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SignOutButton from "../ui/sign-out";

export default function MobileMenu() {
     const [active, setActive] = useState("");

     const [isOpen, setIsOpen] = useState(false);

     const [toggle, setToggle] = useState(false);

     const toggleMenu = () => {
          setToggle(!toggle);
     };

     useEffect(() => {
          const currentPathname = window.location.pathname;
          setActive(currentPathname);
     }, []);

     return (
          <>
               <MenuIcon
                    onClick={() => {
                         setIsOpen(true);
                         toggleMenu();
                    }}
                    className="lg:hidden"
               />
               {toggle && (
                    <div
                         className={`fixed top-0 ${
                              isOpen ? "left-0" : "left-[110%]"
                         } z-50 flex h-screen w-screen items-center justify-end bg-slate-500 bg-opacity-50 text-background backdrop-blur-md transition-all duration-500 ease-out lg:hidden`}
                    >
                         <div className="absolute flex h-screen w-[80%] flex-col justify-between rounded-l-3xl bg-primary text-background">
                              <div className="flex flex-col items-center gap-8 pt-2">
                                   <Link href="/">
                                        <Image
                                             width={100}
                                             height={100}
                                             alt="PalmTechnIQ"
                                             src="/assets/palmtechniqlogo.png"
                                             className="h-full w-full py-3"
                                             onClick={() => {
                                                  toggleMenu();
                                             }}
                                        />
                                   </Link>
                                   <ul className="flex flex-1 flex-col items-center justify-center gap-9">
                                        {NAVLINKS.map((nav) => (
                                             <li
                                                  key={nav.title}
                                                  className={`text-[15px] font-bold ${active === nav.href ? "px-1 py-2 text-green-600" : "text-background"} `}
                                                  onClick={() => {
                                                       setActive(nav.href);
                                                       toggleMenu();
                                                  }}
                                             >
                                                  <Link href={`${nav.href}`}>
                                                       {nav.title}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>
                                   <div
                                        className="rounded-full border border-green-600"
                                        onClick={() => {
                                             toggleMenu();
                                        }}
                                   >
                                        <SignOutButton />
                                   </div>
                              </div>
                         </div>

                         <XIcon
                              className="absolute right-8 top-10"
                              onClick={() => setIsOpen(false)}
                         />
                    </div>
               )}
          </>
     );
}
