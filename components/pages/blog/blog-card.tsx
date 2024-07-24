import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function BlogCard({ post }: IBlogCard) {
     return (
          <div className="flex flex-col justify-between border p-[20px] shadow-md">
               <div>
                    <div>
                         <h2 className="text-[25px] font-bold">{post.title}</h2>
                         <p className="line-clamp-4 border-l-4 pl-[10px] text-[13px]">
                              {post.excerpt}
                         </p>
                    </div>
                    <div className="my-[20px] flex flex-wrap gap-2 text-[9px] font-bold">
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
               <div className="">
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
