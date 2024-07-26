import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function BlogCard({ post }: IBlogCard) {
     const imageURL = urlFor(post.overviewImage).url() || "/no-image.jpg";
     return (
          <div className="flex flex-col justify-between rounded-md border p-2 shadow-md">
               <div>
                    <Image
                         src={imageURL}
                         alt={post.slug.current}
                         width="1000"
                         height="1000"
                         className="rounded-md"
                    />
                    <h2 className="mt-[10px] text-[23px] font-bold">
                         {post.title}
                    </h2>
                    <p className="line-clamp-3 border-l-4 pl-[10px] text-[13px]">
                         {post.excerpt}
                    </p>
                    <div className="my-5 flex cursor-default flex-wrap gap-2 text-[9px] font-bold">
                         {post?.tag?.map((tag) => (
                              <span
                                   className="rounded-full bg-[#01613F] px-[11px] py-[7px] text-white"
                                   key={tag._id}
                              >
                                   {tag.name.toLowerCase()}
                              </span>
                         ))}
                    </div>
               </div>
               <div>
                    <hr />
                    <div className="flex items-center justify-between py-[10px]">
                         <p className="text-[12px] font-bold text-[#333]">
                              {new Date(post.publisheddatetime).toDateString()}
                         </p>
                         <Link href="">
                              <span>
                                   <p className="flex items-center gap-2 text-[12px]">
                                        READ MORE{" "}
                                        <ArrowRight className="h-3 w-3" />{" "}
                                   </p>
                              </span>
                         </Link>
                    </div>
               </div>
          </div>
     );
}

export default BlogCard;

//Update addition: Author Name, Author dp,
