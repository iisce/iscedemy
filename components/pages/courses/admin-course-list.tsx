"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuRadioGroup,
     DropdownMenuRadioItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterIcon, ListOrderedIcon } from "lucide-react";
import { Course } from "@prisma/client";
import { CourseCard } from "@/app/(root)/student/page";
import Link from "next/link";
import { AdminCourseCard } from "@/components/pages/courses/admin-course-card";

export default function AdminCourseList({ courses }: { courses: Course[] }) {
     const [searchTerm, setSearchTerm] = useState("");
     const [sortBy, setSortBy] = useState("name");
     const [sortOrder, setSortOrder] = useState("asc");
     const [filters, setFilters] = useState<IFilter>({
          status: [],
          startDate: null,
          endDate: null,
     });

     const filteredCourses = useMemo(() => {
          return courses
               .filter((course) => {
                    const nameMatch = course.title
                         .toLowerCase()
                         .includes(searchTerm.toLowerCase());
                    // const statusMatch =
                    //      filters.status.length === 0 ||
                    //      filters.status.includes(course.status);
                    // const startDateMatch =
                    //      !filters.startDate ||
                    //      new Date(course.startDate) >=
                    //           new Date(filters.startDate);
                    // const endDateMatch =
                    //      !filters.endDate ||
                    //      new Date(course.endDate) <= new Date(filters.endDate);
                    return nameMatch;
                    // &&statusMatch
                    // && startDateMatch &&
                    // endDateMatch
               })
               .sort((a, b) => {
                    if (sortBy === "name") {
                         return sortOrder === "asc"
                              ? a.title.localeCompare(b.title)
                              : b.title.localeCompare(a.title);
                    }
                    // else if (sortBy === "startDate") {
                    //      return sortOrder === "asc"
                    //           ? Number(new Date(a.startDate)) -
                    //                  Number(new Date(b.startDate))
                    //           : Number(new Date(b.startDate)) -
                    //                  Number(new Date(a.startDate));
                    // } else if (sortBy === "endDate") {
                    //      return sortOrder === "asc"
                    //           ? Number(new Date(a.endDate)) -
                    //                  Number(new Date(b.endDate))
                    //           : Number(new Date(b.endDate)) -
                    //                  Number(new Date(a.endDate));
                    // }
                    else {
                         return 0;
                    }
               });
     }, [searchTerm, filters, sortBy, sortOrder]);
     const handleSearch = (e: any) => {
          setSearchTerm(e.target.value);
     };
     const handleSort = (key: string) => {
          if (sortBy === key) {
               setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          } else {
               setSortBy(key);
               setSortOrder("asc");
          }
     };

     const handleFilter = (type: string, value: string) => {
          setFilters((prevFilters) => ({
               ...prevFilters,
               // @ts-ignore
               [type]: prevFilters[type].includes(value)
                    ? // @ts-ignore
                      prevFilters[type].filter((item) => item !== value)
                    : // @ts-ignore
                      [...prevFilters[type], value],
          }));
     };
     const handleDelete = (courseId: string) => {
          console.log(`Deleting course with ID: ${courseId}`);
     };
     const handleEdit = (courseId: string) => {
          console.log(`Editing course with ID: ${courseId}`);
     };
     return (
          <div className="container mx-auto px-4 py-8">
               <div className="mb-6 items-center justify-between lg:flex">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <div className="grid items-center gap-4 md:flex md:flex-row">
                         <Input
                              type="text"
                              placeholder="Search courses..."
                              value={searchTerm}
                              onChange={handleSearch}
                              className="focus:ring-primary-500 focus:border-primary-500 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
                         />
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                   >
                                        <ListOrderedIcon className="h-5 w-5" />
                                        Sort by
                                   </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuRadioGroup
                                        value={sortBy}
                                        onValueChange={handleSort}
                                   >
                                        <DropdownMenuRadioItem value="name">
                                             Name
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="startDate">
                                             Start Date
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="endDate">
                                             End Date
                                        </DropdownMenuRadioItem>
                                   </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                         </DropdownMenu>
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button
                                        variant="outline"
                                        className="flex items-center gap-2"
                                   >
                                        <FilterIcon className="h-5 w-5" />
                                        Filters
                                   </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64">
                                   <div className="space-y-4 p-4">
                                        <div>
                                             <h3 className="mb-2 text-lg font-semibold">
                                                  Status
                                             </h3>
                                             <div className="space-y-2">
                                                  <Label className="flex items-center gap-2 font-normal">
                                                       <Checkbox
                                                            checked={filters.status.includes(
                                                                 "active",
                                                            )}
                                                            onCheckedChange={() =>
                                                                 handleFilter(
                                                                      "status",
                                                                      "active",
                                                                 )
                                                            }
                                                       />
                                                       Active
                                                  </Label>
                                                  <Label className="flex items-center gap-2 font-normal">
                                                       <Checkbox
                                                            checked={filters.status.includes(
                                                                 "upcoming",
                                                            )}
                                                            onCheckedChange={() =>
                                                                 handleFilter(
                                                                      "status",
                                                                      "upcoming",
                                                                 )
                                                            }
                                                       />
                                                       Upcoming
                                                  </Label>
                                                  <Label className="flex items-center gap-2 font-normal">
                                                       <Checkbox
                                                            checked={filters.status.includes(
                                                                 "completed",
                                                            )}
                                                            onCheckedChange={() =>
                                                                 handleFilter(
                                                                      "status",
                                                                      "completed",
                                                                 )
                                                            }
                                                       />
                                                       Completed
                                                  </Label>
                                             </div>
                                        </div>
                                        {/* <div>
                                             <h3 className="mb-2 text-lg font-semibold">
                                                  Date Range
                                             </h3>
                                             <div className="grid gap-4">
                                                  <div>
                                                       <Label htmlFor="startDate">
                                                            Start Date
                                                       </Label>
                                                       <Input
                                                            type="date"
                                                            id="startDate"
                                                            value={
                                                                 filters.startDate ||
                                                                 ""
                                                            }
                                                            onChange={(e) =>
                                                                 handleFilter(
                                                                      "startDate",
                                                                      e.target
                                                                           .value,
                                                                 )
                                                            }
                                                       />
                                                  </div>
                                                  <div>
                                                       <Label htmlFor="endDate">
                                                            End Date
                                                       </Label>
                                                       <Input
                                                            type="date"
                                                            id="endDate"
                                                            value={
                                                                 filters.endDate ||
                                                                 ""
                                                            }
                                                            onChange={(e) =>
                                                                 handleFilter(
                                                                      "endDate",
                                                                      e.target
                                                                           .value,
                                                                 )
                                                            }
                                                       />
                                                  </div>
                                             </div>
                                        </div> */}
                                   </div>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </div>
               </div>
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {filteredCourses.map((course, b) => (
                         <Link href={`/admin/courses/${course.title}`} key={b}>
                              <AdminCourseCard course={course} />
                         </Link>
                    ))}
               </div>
          </div>
     );
}