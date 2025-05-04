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
import { EditIcon, SearchIcon, StarIcon, UserIcon } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import ViewReview from "./tutor-single-review";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { BookOpenIcon, EyeIcon } from "@heroicons/react/24/outline";
import { BarChartIcon } from "@radix-ui/react-icons";


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


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
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          src={image}
          width={300}
          height={150}
          alt={title || "PalmTechnIQ"}
          className="rounded-t-md object-cover w-full aspect-[2/1]"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold capitalize line-clamp-1">{title.split("-").join(" ")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Virtual Price</span>
            <span className="text-sm font-semibold text-green-600">{formatToNaira(virtualPrice)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Physical Price</span>
            <span className="text-sm font-semibold text-green-600">{formatToNaira(physicalPrice)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Earnings</span>
            <span className="text-sm font-semibold text-green-600">{formatToNaira(earningsInNaira)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500">Students</span>
            <span className="text-sm font-semibold text-green-600">{enrollments ?? 0}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">{totalReviews}</span>
          </div>
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">{enrollments ?? 0}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1 hover:bg-green-600 hover:text-white"
          >
            <EditIcon className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewReviews?.(courseReviews)}
            className="flex-1 hover:bg-green-600 hover:text-white"
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            Reviews
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 hover:bg-green-600 hover:text-white"
          >
            <Link href={`/tutor/courses/${courseId}/curriculum/create`}>
              <BookOpenIcon className="w-4 h-4 mr-1" />
              {hasCurriculum ? "Update" : "Create"}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 hover:bg-green-600 hover:text-white"
          >
            <Link href={`/tutor/courses/${courseId}`}>
              <BarChartIcon className="w-4 h-4 mr-1" />
              Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * The `TutorDashboard` component serves as the main dashboard for tutors, providing an interface
 * to manage their courses, view earnings, and access course reviews. It includes features such as
 * course creation, editing, searching, and filtering, as well as displaying total earnings and reviews.
 *
 * @component
 * @param {Object} props - The props object for the component.
 * @param {any} props.tutor - The tutor object containing information about the logged-in tutor.
 * @param {Review[]} [props.reviewsArray] - An optional array of reviews associated with the tutor's courses.
 * @param {number} [props.totalEarnings=0] - The total earnings of the tutor, defaulting to 0 if not provided.
 * @param {number} props.reviews - The total number of reviews across all courses.
 * @param {any[]} props.courses - An array of courses uploaded by the tutor.
 * @param {{ [key: string]: number }} props.earnings - An object mapping course IDs to their respective earnings.
 * @param {{ [key: string]: number }} props.enrollments - An object mapping course IDs to their respective enrollment counts.
 * @param {{ [key: string]: boolean }} props.curriculumStatus - An object mapping course IDs to their curriculum completion status.
 *
 * @returns {JSX.Element} The rendered Tutor Dashboard component.
 *
 * @remarks
 * - The dashboard includes a search bar for filtering courses by title.
 * - Tutors can create new courses or edit existing ones using the provided forms.
 * - The dashboard displays uploaded courses, total earnings, and course reviews in separate sections.
 * - A modal is used to display detailed reviews for a specific course.
 *
 * @example
 * ```tsx
 * <TutorDashboard
 *   tutor={tutorData}
 *   courses={courseList}
 *   earnings={earningsData}
 *   reviews={totalReviews}
 *   enrollments={enrollmentData}
 *   totalEarnings={500000}
 *   reviewsArray={reviewList}
 *   curriculumStatus={curriculumStatusData}
 * />
 * ```
 */
export default function TutorDashboard({
  tutor,
  courses,
  earnings,
  reviews,
  enrollments,
  totalEarnings = 0,
  reviewsArray,
  curriculumStatus,
  totalStudents,
  totalMentorships,
  completedMentorships,
  upcomingMentorships,
  averageAssignmentGrade,
  studentAnalytics,
  recentMentorships,
  recentSubmissions,
}: {
  tutor: any;
  reviewsArray?: Review[];
  totalEarnings?: number;
  reviews: number;
  courses: any[];
  earnings: { [key: string]: number };
  enrollments: { [key: string]: number };
  curriculumStatus: { [key: string]: boolean };
  totalStudents: number;
  totalMentorships: number;
  completedMentorships: number;
  upcomingMentorships: number;
  averageAssignmentGrade: number;
  studentAnalytics: any[];
  recentMentorships: any[];
  recentSubmissions: any[];
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

    

  const barData = {
    labels: studentAnalytics.map(student => student.studentName),
    datasets: [
      {
        label: 'Average Completion Percentage',
        data: studentAnalytics.map(student => {
          const totalCourses = student.courses.length;
          const totalCompletion = student.courses.reduce((sum: number, course: any) => sum + course.completionPercentage, 0);
          return totalCourses > 0 ? totalCompletion / totalCourses : 0;
        }),
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // Green to match PalmTechnIQ's theme
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie Chart (Grade Distribution)
  const allGrades = studentAnalytics.flatMap(student => 
    student.courses.map((course: any) => course.averageGrade).filter((grade: number) => grade > 0)
  );

  const pieData = {
    labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (<60)'],
    datasets: [
      {
        data: [
          allGrades.filter(grade => grade >= 90).length,
          allGrades.filter(grade => grade >= 80 && grade < 90).length,
          allGrades.filter(grade => grade >= 70 && grade < 80).length,
          allGrades.filter(grade => grade >= 60 && grade < 70).length,
          allGrades.filter(grade => grade < 60).length,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',  // Green
          'rgba(54, 162, 235, 0.6)',  // Blue
          'rgba(255, 206, 86, 0.6)',  // Yellow
          'rgba(255, 99, 132, 0.6)',  // Red
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <MaxWidthWrapper>
      <section className="mx-auto px-4 md:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Tutor {tutor.name} Dashboard</h2>
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
          {/* Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{totalStudents}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Mentorship Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{totalMentorships}</p>
                    <p className="text-sm text-gray-500">
                      Completed: {completedMentorships} | Upcoming: {upcomingMentorships}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Average Assignment Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{averageAssignmentGrade.toFixed(1)}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <p className="text-3xl font-bold">{formatToNaira(totalEarnings / 100).split(".")[0]}</p>
                  </CardContent>
                </Card>
              </div>

            {/* Uploaded Courses Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Uploaded Courses</h3>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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

{/* Student Progress Section */}
<Card className="mb-8">
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Completion Percentages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {studentAnalytics.length > 0 ? (
                        <Bar
                          data={barData}
                          options={{
                            responsive: true,
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                                title: {
                                  display: true,
                                  text: 'Completion Percentage (%)',
                                },
                              },
                              x: {
                                title: {
                                  display: true,
                                  text: 'Students',
                                },
                              },
                            },
                            plugins: {
                              legend: {
                                display: true,
                                position: 'top',
                              },
                            },
                          }}
                        />
                      ) : (
                        <p className="text-gray-600">No student data available.</p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Assignment Grade Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {allGrades.length > 0 ? (
                        <Pie
                          data={pieData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                            },
                          }}
                        />
                      ) : (
                        <p className="text-gray-600">No grades available.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
                  {studentAnalytics.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {studentAnalytics.map((student, index) => (
                        <AccordionItem key={student.studentId} value={`student-${index}`}>
                          <AccordionTrigger>
                            <div className="flex items-center justify-between w-full pr-4">
                              <span>{student.studentName}</span>
                              <span>
                                {student.courses.length} Course{student.courses.length !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {student.courses.map((course: any, courseIndex: any) => (
                                <div key={course.courseId} className="space-y-2">
                                  <h4 className="text-lg font-semibold">{course.courseTitle}</h4>
                                  <p className="text-sm text-gray-500">
                                    {course.completedLessons} / {course.totalLessons} lessons completed
                                  </p>
                                  <Progress value={course.completionPercentage} className="w-full" />
                                  <div>
                                    <h5 className="text-sm font-semibold mb-2">Assignment Performance</h5>
                                    <p className="text-xs text-gray-500">
                                      {course.submittedAssignments} / {course.totalAssignments} assignments submitted
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Average Grade: {course.averageGrade ? `${Math.round(course.averageGrade)}%` : "Not graded"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              <div>
                                <h5 className="text-sm font-semibold mb-2">Mentorship Engagement</h5>
                                <p className="text-sm">
                                  Total Sessions: {student.totalMentorships} | Completed: {student.completedMentorships} | Upcoming: {student.upcomingMentorships}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <p>No students enrolled in your courses.</p>
                  )}
                </CardContent>
              </Card>

            {/* Course Reviews Section */}
            <div className="mb-8">

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

              {/* Recent Mentorship Sessions Section */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Recent Mentorship Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentMentorships.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentMentorships.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>{session.mentee?.name || "Unknown"}</TableCell>
                            <TableCell>{new Date(session.scheduledAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={session.completed ? "greenTeal" : "secondary"}>
                                {session.completed ? "Completed" : "Upcoming"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No recent mentorship sessions.</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Assignment Submissions Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assignment Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentSubmissions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Assignment</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Submitted At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentSubmissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>{submission.user.name || "Unknown"}</TableCell>
                            <TableCell>{submission.project.title}</TableCell>
                            <TableCell>{submission.grade ? `${submission.grade}%` : "Not graded"}</TableCell>
                            <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No recent assignment submissions.</p>
                  )}
                </CardContent>
              </Card>

               {/* Total Earnings Section */}
            {/* <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Total Earnings</h3>
              <div className="flex items-center justify-between bg-green-600 p-4 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{formatToNaira(totalEarnings / 100)}</span>
                </div>
              </div>
            </div> */}
              {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ViewReview reviews={modalReviews} />
              </Modal> */}
            </div>
          </>
        )}
      </section>
    </MaxWidthWrapper>
  );
}