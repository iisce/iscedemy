"use client";
import React, { useState } from "react";
import CourseItem from "../courseitem";
import { COURSEITEM } from "@/lib/consts";
import { CircleRightArrow } from "@/lib/icons";

export default function SideBar() {
  const [click, setClicked] = useState("h-0");
  return (
    <div className="hidden lg:inline text-left h-screen w-[16%]">
      <div className="flex pb-[10px] items-center gap-3">
        <h2 className="font-bold">All Courses</h2>
        <span>{CircleRightArrow}</span>
      </div>
      <hr />
      <ul className="text-[13px] tezxt-[#504f4f] flex gap-3 flex-col pt-[20px] ">
        {COURSEITEM.map((course, k) => (
          <CourseItem key={k} link={course.link} name={course.name} />
        ))}
      </ul>
    </div>
  );
}
