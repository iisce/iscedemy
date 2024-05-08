"use client";
import { COURSEITEM } from "@/lib/consts";
import { CircleRightArrow } from "@/lib/icons";
import Link from "next/link";
import { useState } from "react";
import CourseItem from "../pages/courses/courseitem";
import SignOutButton from "../ui/sign-out";

export default function SideBar() {
  
  const [click, setClicked] = useState("h-0");
  return (
    <div className="hidden md:inline justify-between md:text-left md:h-screen md:w-[16%]">
      <div className="flex pb-[10px] items-center gap-3">
        <h2 className="font-bold">All Courses</h2>
        <Link href='/courses'><span>{CircleRightArrow}</span></Link>
      </div>
      <hr />
      <ul className="text-[13px] text-[#504f4f] flex gap-3 flex-col pt-[20px] ">
        {COURSEITEM.map((course, k) => (
          <CourseItem key={k} link={course.link} name={course.name} />
        ))}
      </ul>
      
      <SignOutButton />
    </div>
  );
}
