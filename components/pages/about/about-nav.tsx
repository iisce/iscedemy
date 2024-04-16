import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { Book, BookOpen, MenuIcon, PenIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AboutNav() {
  return (
    <MaxWidthWrapper className="sticky top-0 grid grid-cols-4 w-full container bg-black text-secondary  ">
      <Link
        href={"/about#our-story"}
        className="border-b-2 hover:border-black py-2 text-center flex gap-2 justify-center items-center"
      >
        <BookOpen />
        Our Story
      </Link>
      <Link
        href={"/about#our-values"}
        className="border-b-2 hover:border-black py-2 text-center flex gap-2 justify-center items-center"
      >
        <PersonIcon />
        Our Values
      </Link>
      <Link
        href={"/about#our-mission"}
        className="border-b-2 hover:border-black py-2 text-center flex gap-2 justify-center items-center"
      >
        <PenIcon />
        Our Mission
      </Link>
      <Link
        href={"/about#our-team"}
        className="border-b-2 hover:border-black py-2 text-center flex gap-2 justify-center items-center"
      >
        <HamburgerMenuIcon />
        Our Team
      </Link>
    </MaxWidthWrapper>
  );
}
