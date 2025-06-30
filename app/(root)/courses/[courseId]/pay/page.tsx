import { auth } from "@/auth";
import PurchaseCourseForm from "@/components/component/forms/purchase-course-form";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/data/course";
import { getUserById } from "@/data/user";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
     params,
}: {
     params: { courseId: string };
}): Promise<Metadata> {
     const courseDetails = await getCourseBySlug(params.courseId);

     if (!courseDetails) {
          return {
               title: "Course Not Found | PalmTechnIQ",
               description: "The requested course could not be found.",
          };
     }

     return {
          title: courseDetails.title.split("-").join(" "),
          description: courseDetails.description,
          openGraph: {
               title: courseDetails.title.split("-").join(" "),
               description: courseDetails.description,
               url: `https://www.palmtechniq.com/courses/${params.courseId}`,
               siteName: "PalmTechnIQ",
               images: [
                    {
                         url: courseDetails.image || "/innovation.jpg",
                         width: 800,
                         height: 600,
                         alt: courseDetails.title || "PalmTechnIQ",
                    },
               ],
          },
     };
}

export default async function EnrollPage({
     params,
}: {
     params: { courseId: string };
}) {
     const course = await getCourseBySlug(params.courseId);
     if (!course) redirect("/courses");
     const session = await auth();
     // console.log("Page session:", session);

     // if (!session?.user) {
     //      redirect(
     //           `/login?callbackUrl=${encodeURIComponent(
     //                `/courses/${params.courseId}/pay`,
     //           )}`,
     //      );
     // }

     const dbUser = await getUserById(session?.user?.id ?? "");
     // console.log({ dbUser });
     if (!dbUser) {
          return redirect("/login");
     }
     const isPaid = dbUser?.courses?.includes(course.id);

     if (isPaid) {
          return (
               <div className="flex min-h-[calc(100svh-120px)] flex-col items-center justify-center p-3">
                    <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
                         <div className="md:flex">
                              <div className="bg-gray-100 p-4 md:w-1/2">
                                   <div>
                                        Hi{" "}
                                        <span className="font-bold">
                                             {dbUser.name}
                                        </span>
                                        !
                                   </div>
                                   <div>You Already Purchased this course:</div>
                                   <h1 className="mb-4 text-3xl font-bold capitalize text-gray-900 dark:text-gray-100">
                                        {course.title.split("-").join(" ")}
                                   </h1>
                                   <p className="mb-8 text-gray-600 dark:text-gray-400">
                                        {course.conclusion}
                                   </p>
                                   <Button asChild className="w-full">
                                        <Link href="/student">
                                             <span className="text-white">
                                                  {`Go to your dashboard`}
                                             </span>
                                        </Link>
                                   </Button>
                              </div>
                              <div className="md:w-1/2">
                                   <Image
                                        src={course.image}
                                        alt="Register Course || PalmTechnIQ"
                                        className="h-full w-full object-cover"
                                        height={600}
                                        width={600}
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
     return (
          <div className="flex min-h-[calc(100svh-120px)] flex-col items-center justify-center p-3">
               <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
                    <div className="md:flex">
                         <div className="bg-gray-100 p-4 md:w-1/2">
                              <div>
                                   Hi{" "}
                                   <span className="font-bold">
                                        {dbUser.name}
                                   </span>
                                   !
                              </div>
                              <div>You are about to purchase:</div>
                              <PurchaseCourseForm
                                   student={dbUser}
                                   course={course}
                              />
                         </div>
                         <div className="md:w-1/2">
                              <Image
                                   src={course.image}
                                   alt="Register Course || PalmTechnIQ"
                                   className="h-full w-full object-cover"
                                   height={600}
                                   width={600}
                              />
                         </div>
                    </div>
               </div>
          </div>
     );
}
