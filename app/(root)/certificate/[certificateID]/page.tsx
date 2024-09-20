import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import getCertificate from "@/data/certificate";
import { getCourseById } from "@/data/course";
import { capitalizeWords } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function VerifyCert({
     params,
}: {
     params: { certificateID: string };
}) {
     const certificate = await getCertificate(params.certificateID);
     const courseIds = certificate?.courseId.split("---");
     console.log({ courseIds, certificate });
     if (!courseIds || courseIds.length < 1) {
          return notFound();
     }
     const course = await getCourseById(courseIds[0]);
     const courses = await Promise.all(
          courseIds.map((courseId) => getCourseById(courseId)),
     );
     return (
          <MaxWidthWrapper>
               <div className="mx-auto my-6 w-full md:flex max-w-6xl">
                    <div className="relative md:w-1/2 w-full">
                         <Image
                              src="/pa.png"
                              alt="cert logo"
                              width={500}
                              height={500}
                              className="absolute right-[60px] hidden top-[300px] h-[200px] w-[200px]"
                         />
                         <div className="relative mx-10 mt-10 grid gap-10">
                              <div>
                                   <p className="font-bold uppercase">
                                        {capitalizeWords(certificate?.type!)}
                                   </p>
                              </div>

                              <div>
                                   <p>This Certificate was Issued for:</p>
                                   <p className="font-bold">
                                        {certificate?.studentName}
                                   </p>
                              </div>

                              <div className="">
                                   <p>Certification:</p>
                                   <p className="font-bold flex-col">
                                        {courses
                                             .map((a) => a?.title)
                                             .join(", ")}
                                   </p>
                              </div>
                              <div>
                                   <p>Issue Date:</p>
                                   <p className="font-bold">
                                        {certificate?.issuedDate.toDateString()}
                                   </p>
                              </div>

                              <div>
                                   <p>This Certificate was issued by:</p>
                                   <p className="font-bold">
                                        {certificate?.platform}
                                   </p>
                              </div>

                              <div>
                                   <p>Credential ID:</p>
                                   <p className="font-bold">
                                        {" "}
                                        {certificate?.userId}
                                   </p>
                              </div>
                         </div>
                    </div>

                    <div className="md:w-1/2 md:py-0 py-4">
                         <div className="border-5 relative h-full border">
                              <div className="">
                                   <Image
                                        src="/pic3.png"
                                        alt="cert logo"
                                        width={500}
                                        height={500}
                                        className="h-full w-full "
                                   />
                              </div>


                                   <div className="absolute md:my-6 mx-4 bottom-4/3 md:top-40">
                                        <p className="text-[20px] font-bold text-green-800">
                                             CERTIFICATE
                                        </p>
                                        <p className="text-[30px] font-bold text-green-800">
                                             VALIDATED
                                        </p>
                                   </div>

                                   <Image
                                        src="/verify.png"
                                        alt="cert logo"
                                        width={500}
                                        height={500}
                                        className=" md:right-6 md:top-1/2 absolute hidden md:block right-10 bottom-12 md:h-[100px] w-24 h-24 md:w-[100px]"
                                   />
                                   <div className="mx-4 md:mt-[200px] mb-4 mt-24 grid gap-3">
                                        <p className="text-[10px] font-bold">
                                             CONGRATULATIONS
                                        </p>
                                        <p className="text-xl font-bold text-green-800">
                                             {certificate?.studentName}
                                        </p>
                                        <p className=" w-full text-[10px] font-bold">
                                             This certificate can be validated at any
                                             time and serves as proof of competence.
                                             The course follws Individual Standard
                                             and uses provided Method
                                        </p>
                                   </div>
                         </div>
                    </div>
               </div>
          </MaxWidthWrapper>
     );
}
