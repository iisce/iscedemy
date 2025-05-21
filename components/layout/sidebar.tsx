'use client';
import { COURSEITEM } from '@/lib/consts';
import { CircleRightArrow } from '@/lib/icons';
import Link from 'next/link';
import CourseItem from '../pages/courses/courseitem';
import SignOutButton from '../ui/sign-out';
import { User } from "next-auth";

export default function SideBar({ user }: { user?: User }) {
     return (
          <div className="hidden h-[calc(100%-80px)] justify-between gap-5 lg:grid lg:w-[300px] lg:text-left">
               <div>
                    <Link
                         href="/courses"
                         className="flex items-center gap-3 pt-5"
                    >
                         <h2 className="font-bold">All Courses</h2>
                         <span>{CircleRightArrow}</span>
                    </Link>
                    <hr />
                    <ul className="flex flex-col gap-3 pt-5 text-[13px] text-[#504f4f]">
                         {COURSEITEM.map((course, k) => (
                              <CourseItem
                                   key={k}
                                   link={course.link}
                                   name={course.name}
                              />
                         ))}
                    </ul>
               </div>
               <div className="">
                    <SignOutButton user={user} />
               </div>
          </div>
     );
}
