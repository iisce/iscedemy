'use client'

import EditCourseForm from "@/components/component/edit-course-form";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { formatToNaira } from "@/lib/utils";
import { Review } from "@prisma/client";
import { SearchIcon, StarIcon, UserIcon } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import ViewReview from "./tutor-single-review";

function TutorCard({
  title,  
  description,
  image,
  earnings,
  reviews,
  reviewsArray,
  enrollments,
  onEdit,
  onViewReviews,
}: {
  title: string;
  description: string;
  image: string | StaticImport;
  earnings?: string;
  reviews?: number;
  reviewsArray?: string;
  enrollments?: number;
  onEdit?: () => void;
  onViewReviews?: () => void;
}) {
  const earningsInNaira = Number(earnings) / 100;
  return (
    <Card>
      <Image
        src={image}
        width={300}
        height={200}
        alt={title || 'PalmTechnIQ'}
        className="rounded-t-md object-cover w-full aspect-[3/2]"
      />
      <CardContent>
        <h3 className=" capitalize text-lg font-bold mb-2">{title.split('-').join(' ')}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-5">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-600">{formatToNaira(earningsInNaira)}</span>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">{reviews}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">{enrollments}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onEdit} className="w-full hover:bg-green-600 hover:text-white">
          Edit Course
        </Button>
        {/* <Button variant="outline" onClick={onViewReviews} className="w-full">
          View Reviews
        </Button> */}
      </CardFooter>
    </Card>
  );
}

export default function TutorDashboard({
  tutor,
  courses,
  earnings,
  reviews,
  enrollments,
  totalEarnings = 0,
  reviewsArray

}: {
  tutor: any;
  reviewsArray?: Review[];
  totalEarnings?: number;
  reviews:  number;
  courses: any[];
  earnings: { [key: string]: number };
  enrollments: { [key: string]: number };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalReviews, setModalReviews] = useState<Review[]>([]);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  // console.log('Total Earnings:', totalEarnings);

  const handleSearchIconClick = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 0);
  }


  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [courses, searchTerm]);

  const handleViewReviews = (courseReviews: Review[]) => {
    setModalReviews(courseReviews);
    setModalOpen(true);
  };

  return (
    <MaxWidthWrapper>
      <section className="mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="mb-4 text-lg md:text-2xl font-bold">Uploaded Courses</h2>
          <div className="relative">
            <SearchIcon  
            onClick={handleSearchIconClick
            }
            className="absolute right-4 md:left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-md border border-green-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              ${
                showInput ? 'block' : 'hidden'
              } md:block`}
              ref={inputRef}
            />
          </div>
        </div>

        {editingCourse ? (
          <EditCourseForm
          course={editingCourse}
          setIsEditing={setEditingCourse}
          />
        ): (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <TutorCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              earnings={earnings[course.id]?.toFixed(2) ?? '0.00'}
              reviews= {reviews}
              enrollments={enrollments[course.id] ?? 0}
              onEdit={() => setEditingCourse(course)}
             onViewReviews={() => handleViewReviews(reviewsArray!.filter((review) => review.id === review.id))}
              />
          ))}
        </div>
        )}
       
        <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Total Earnings</h2>
        <div className="flex items-center justify-between bg-green-600 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{formatToNaira(totalEarnings / 100)}</span>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Course Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle className="capitalize">{course.title.split('-').join(' ')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-600">{reviews}</span>
                  </div>
                  <Button variant="outline" size="sm" 
                  className="hover:bg-green-600 hover:text-white"
                  onClick={() => handleViewReviews(reviewsArray!.filter((review) => review.id === review.id))}
                  >
                    View Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ViewReview reviews={modalReviews} />
        </Modal>
      </div>
      </section>
    </MaxWidthWrapper>
  );
}
