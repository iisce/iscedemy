import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/consts";
import Image from "next/image";

export function TestimonialPreview() {
     return (
          <div className="mx-auto w-full py-6 xl:py-12">
               <MaxWidthWrapper>
                    <h2 className="mb-8 text-center text-xl font-semibold text-primary xl:text-3xl">
                         {`Join 50+ learners & start a career you'll love`}
                    </h2>
                    <div className="mx-auto grid items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                         {TESTIMONIALS.map((testimonial, i) => (
                              <Card
                                   key={i}
                                   className="w-full rounded-lg bg-white p-6 shadow-md"
                              >
                                   {testimonial.image && (
                                        <div className="h-[50px] w-[50px]">
                                             <Image
                                                  width={50}
                                                  height={50}
                                                  src={testimonial.image}
                                                  alt="PalmTechnIQ"
                                                  className="rounded-full object-cover"
                                             />
                                        </div>
                                   )}
                                   <p className="mb-2 mt-4 text-lg font-semibold">
                                        {testimonial.name}
                                   </p>
                                   <p className="mb-4 italic text-gray-700">
                                        {testimonial.review}
                                   </p>
                                   <p className="text-sm font-medium text-gray-700">
                                        {testimonial.userrole}
                                   </p>
                              </Card>
                         ))}
                    </div>
               </MaxWidthWrapper>
          </div>
     );
}
