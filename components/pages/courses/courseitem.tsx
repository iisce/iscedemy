import Link from "next/link";
import React from "react";
import { ICOURSEITEM } from "../../../lib/types";

export default function CourseItem({ link, name }: ICOURSEITEM) {
  
  return (
    <Link href={`/courses/${link}`}>
      <span className="hover:list-disc hover:font-bold transition-all" >{name}</span>
    </Link>
  );
}

