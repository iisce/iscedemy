import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { BookOpen, PenIcon } from "lucide-react";
import Link from "next/link";

export default function AboutNav() {
  return (
    <MaxWidthWrapper className="sticky top-0 grid  md:grid-cols-4 grid-cols-4 mx-auto w-full md:w-full overflow-clip container bg-black text-secondary  ">
      <Link
        href={"/about#our-story"}
        className="border-b-2 hover:border-black py-2 text-center flex xl:gap-2 md:gap-2 xl:justify-center  items-center"
      >
        <BookOpen className="hidden md:block" />
        Our Story
      </Link>
      <Link
        href={"/about#our-values"}
        className="border-b-2 hover:border-black py-2 text-center flex xl:gap-2 md:gap-2 xl:justify-center items-center"
      >
        <PersonIcon className="hidden md:block" />
        Our Values
      </Link>
      <Link
        href={"/about#our-mission"}
        className="border-b-2 hover:border-black py-2 text-center flex xl:gap-2 md:gap-2 xl:justify-center items-center"
      >
        <PenIcon  className="hidden md:block"/>
        Our Mission
      </Link>
      <Link
        href={"/about#our-team"}
        className="border-b-2 hover:border-black py-2 text-center flex xl:gap-2 md:gap-2 xl:justify-center items-center"
      >
        <HamburgerMenuIcon className="hidden md:block" />
        Our Team
      </Link>
    </MaxWidthWrapper>
  );
}
