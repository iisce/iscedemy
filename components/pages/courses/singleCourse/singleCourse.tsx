'use client'
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SingleCourseCurriculum from './singleCourseCurriculum';
import { COURSE_OUTLINE } from '@/lib/consts';
import * as Icons from '@/lib/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import TutorProfile from '@/components/component/tutor-profile';

export default function SingleCourse({ courseTitle }: { courseTitle: string }) {
  const courseDetails = COURSE_OUTLINE.find(course => course.title === courseTitle );
  const [activeTab, setActiveTab] = useState('overview');

  if (!courseDetails) {
    return <div>Course not found</div>;
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white p-8 ">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Starting {courseDetails.title} as your Home Based Business</h1>
            <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage alt="Edward Norton" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col my-2 space-y-1">
                <div className="text-sm font-bold">{courseDetails.tutorName}</div>
                <div className="flex flex-row items-center">
                  <div className="flex text-yellow-400">
                    <Icons.StarIcon />
                    <Icons.StarIcon />
                    <Icons.StarIcon />
                    <Icons.StarIcon />
                  </div>
                  <div className="text-gray-300">
                    <Icons.StarIcon />
                  </div>
                  
                  <span className="ml-2 text-sm">(3 Reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 text-sm">
              <div className="text-gray-500">
                <Icons.BookOpenIcon/>
              </div>
              <Badge variant="secondary">Business</Badge>
            </div>
          </div>
          <Tabs>
            <div className="flex space-x-4 border-b">
              <Button
                variant="ghost"
                onClick={() => handleTabClick('overview')}
                className={activeTab === 'overview' ? 'border-b-2 border-blue-500' : ''}
              >
                Overview
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('curriculum')}
                className={activeTab === 'curriculum' ? 'border-b-2 border-blue-500' : ''}
              >
                Curriculum
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('instructor')}
                className={activeTab === 'instructor' ? 'border-b-2 border-blue-500' : ''}
              >
                Instructor
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleTabClick('reviews')}
                className={activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}
              >
                Reviews
              </Button>
            </div>
          </Tabs>
          <div>
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold">Course Description</h2>
                <p className="mt-4 text-gray-600">{courseDetails.description}</p>
                <h3 className="mt-6 text-xl font-semibold">What You'll Learn?</h3>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600">
                  {courseDetails.summary.map((summaryList, i) => (
                    <li key={i}>{summaryList}</li>
                  ))}
                </ul>    
              </div>
              
            )}
            {activeTab === 'curriculum' && <SingleCourseCurriculum />}
            {activeTab === 'instructor' && <TutorProfile/>}
          </div>
         
        </div>

          
          <div className="lg:w-96 space-y-6">
     
     <iframe
         width="400"
         height="315"
         src={courseDetails.tutorVideoUrl}
         title="Tutor's Explanatory Video"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     ></iframe>
  
<div className="space-y-4">
 <h3 className="text-xl font-semibold">Course Includes:</h3>
 <div className="space-y-4">
   <div className="flex items-center">
     <div className="text-gray-500">
          <Icons.DollarSignIcon/>
     </div>
    
     <span className="ml-2">Price:</span>
     <span className="ml-auto font-bold">{courseDetails.price}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
         <Icons.UserIcon/>
   </div>
     
     <span className="ml-2">Instructor:</span>
     <span className="ml-auto font-bold">{courseDetails.tutorName}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
     <Icons.ClockIcon/>
   </div>

     
     <span className="ml-2">Duration:</span>
     <span className="ml-auto font-bold">{courseDetails.duration}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
     <Icons.BookOpenIcon/>
   </div>
     
     <span className="ml-2">Lessons:</span>
     <span className="ml-auto font-bold">{courseDetails.lessons}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
     <Icons.UsersIcon/>
   </div>
     
     <span className="ml-2">Students:</span>
     <span className="ml-auto font-bold">{courseDetails.numberOfStudentsErolled}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
     <Icons.GlobeIcon/>
   </div>
     
     <span className="ml-2">Language:</span>
     <span className="ml-auto font-bold">{courseDetails.language}</span>
   </div>
   <hr />
   <div className="flex items-center">
   <div className="text-gray-500">
     <Icons.BadgeCheckIcon/>
   </div>
     
     <span className="ml-2">Certifications:</span>
     <span className="ml-auto font-bold">{courseDetails.certification}</span>
   </div>
 </div>
 <hr />
 <Button className="w-full">Buy Now</Button>
</div>
<div>
 <h3 className="text-xl font-semibold">Share On:</h3>
 <div className="flex flex-row  mt-4">
 <div className="flex space-x-2 mt-4 text-white">
 <Button className="p-2 rounded-full bg-blue-500 text-white">
   <Icons.FacebookIcon />
 </Button>
 <Button className="p-2 rounded-full bg-blue-300 text-white">
   <Icons.TwitterIcon />
 </Button>
 <Button className="p-2 rounded-full bg-blue-700 text-white">
   <Icons.LinkedinIcon />
 </Button>
</div>
   
 </div>
</div>
</div>
        
        {/* Add other components */}
      </div>
    </div>
  );
}
