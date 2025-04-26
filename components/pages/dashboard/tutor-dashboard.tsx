'use client';

import CreateCourseForm from "@/components/component/forms/create-course-form";
import EditCourseForm from "@/components/component/forms/edit-course-form";
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
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import ViewReview from "./tutor-single-review";

function TutorCard({
  title,
  description,
  image,
  virtualPrice,
  physicalPrice,
  earnings,
  reviews,
  enrollments,
  courseId,
  allReviews,
  hasCurriculum,
  onEdit,
  onViewReviews,
}: {
  title: string;
  description: string;
  image: string | StaticImport;
  virtualPrice: number;
  physicalPrice: number;
  earnings?: string;
  reviews?: number;
  enrollments?: number;
  courseId: string;
  allReviews: Review[];
  hasCurriculum: boolean;
  onEdit?: () => void;
  onViewReviews?: (courseReviews: Review[]) => void;
}) {
  const earningsInNaira = Number(earnings) / 100;
  const courseReviews = allReviews.filter((review) => review.id === courseId);
  const totalReviews = courseReviews.length;

  return (
    <Card>
      <Image
        src={image}
        width={300}
        height={200}
        alt={title || "PalmTechnIQ"}
        className="rounded-t-md object-cover w-full aspect-[3/2]"
      />
      <CardContent className="p-3">
        <h3 className="capitalize text-lg font-bold mb-2">{title.split("-").join(" ")}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-5">{description}</p>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Virtual Price:</span>
            <span className="font-bold text-green-600">{formatToNaira(virtualPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Physical Price:</span>
            <span className="font-bold text-green-600">{formatToNaira(physicalPrice)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Earnings:</span>
            <span className="font-bold text-green-600">{formatToNaira(earningsInNaira)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarIcon className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">{totalReviews}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">{enrollments}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 space-y-2 gap-3  justify-between">
        <Button
          variant="outline"
          onClick={onEdit}
          className="w-full hover:bg-green-600 hover:text-white"
        >
          Edit Course
        </Button>
        <Button
          variant="outline"
          onClick={() => onViewReviews?.(courseReviews)}
          className="w-full hover:bg-green-600 hover:text-white"
        >
          View Reviews
        </Button>

          <Button
            variant="outline"
            asChild
            className="w-full  text-wrap hover:bg-green-600 hover:text-white"
          >
            <Link href={`/tutor/courses/${courseId}/curriculum/create`}>

              {hasCurriculum ? "Update Curriculum" : "Create Curriculum"}
            </Link>
          </Button>
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
  reviewsArray,
  curriculumStatus,
}: {
  tutor: any;
  reviewsArray?: Review[];
  totalEarnings?: number;
  reviews: number;
  courses: any[];
  earnings: { [key: string]: number };
  enrollments: { [key: string]: number };
  curriculumStatus: { [key: string]: boolean };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalReviews, setModalReviews] = useState<Review[]>([]);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    setShowInput((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const handleViewReviews = (courseReviews: Review[]) => {
    setModalReviews(courseReviews);
    setModalOpen(true);
  };

    
  return (
    <MaxWidthWrapper>
      <section className="mx-auto px-4 md:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Tutor Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon
                onClick={handleSearchIconClick}
                className="absolute right-4 md:left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-md border border-green-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  showInput ? "block" : "hidden"
                } md:block`}
                ref={inputRef}
              />
            </div>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Create New Course
            </Button>
            
          </div>
        </div>

        {/* Course Creation Form */}
        {isCreating ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Create a New Course</h3>
            <CreateCourseForm tutorId={tutor.id} setIsCreating={setIsCreating} />
          </div>
        ) : editingCourse ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
            <EditCourseForm course={editingCourse} setIsEditing={setEditingCourse} />
          </div>
        ) : (
          <>
            {/* Uploaded Courses Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Uploaded Courses</h3>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => (
                    <TutorCard
                      key={course.id}
                      title={course.title}
                      description={course.description}
                      image={course.image}
                      virtualPrice={course.virtualPrice}
                      physicalPrice={course.physicalPrice}
                      earnings={earnings[course.id]?.toFixed(2) ?? "0.00"}
                      reviews={reviews}
                      enrollments={enrollments[course.id] ?? 0}
                      courseId={course.id}
                      allReviews={reviewsArray || []}
                      hasCurriculum={curriculumStatus[course.id] || false}
                      onEdit={() => setEditingCourse(course)}
                      onViewReviews={handleViewReviews}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">No courses found. Create a new course to get started!</p>
              )}
            </div>

            {/* Total Earnings Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Total Earnings</h3>
              <div className="flex items-center justify-between bg-green-600 p-4 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{formatToNaira(totalEarnings / 100)}</span>
                </div>
              </div>
            </div>

            {/* Course Reviews Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Course Reviews</h3>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses.map((course) => {
                    const courseReviews = (reviewsArray || []).filter(
                      (review) => review.courseId === course.id
                    );
                    return (
                      <Card key={course.id}>
                        <CardHeader>
                          <CardTitle className="capitalize">{course.title.split("-").join(" ")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <StarIcon className="w-4 h-4 text-green-600" />
                              <span className="font-bold text-green-600">{courseReviews.length}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-green-600 hover:text-white"
                              onClick={() => handleViewReviews(courseReviews)}
                            >
                              View Reviews
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 text-center">No reviews available yet.</p>
              )}
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ViewReview reviews={modalReviews} />
              </Modal>
            </div>
          </>
        )}
      </section>
    </MaxWidthWrapper>
  );
}