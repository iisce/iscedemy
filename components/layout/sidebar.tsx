'use client';
import { COURSEITEM } from '@/lib/consts';
import { CircleRightArrow } from '@/lib/icons';
import Link from 'next/link';
import { useState } from 'react';
import CourseItem from '../pages/courses/courseitem';
import SignOutButton from '../ui/sign-out';

export default function SideBar() {
	return (
		<div className='hidden lg:grid gap-5 justify-between lg:text-left h-[calc(100%-80px)] lg:w-[300px] '>
			<div>
				<Link
					href='/courses'
					className='flex pt-5 items-center gap-3'
				>
					<h2 className='font-bold'>All Courses</h2>
					<span>{CircleRightArrow}</span>
				</Link>
				<hr />
				<ul className='text-[13px] text-[#504f4f] flex gap-3 flex-col pt-5 '>
					{COURSEITEM.map((course, k) => (
						<CourseItem
							key={k}
							link={course.link}
							name={course.name}
						/>
					))}
				</ul>
			</div>
			<div className=''>
				<SignOutButton />
			</div>
		</div>
	);
}
