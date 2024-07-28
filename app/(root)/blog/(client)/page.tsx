import BlogCard from "@/components/pages/blog/blog-card";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";

async function getPost() {
     const query = `*[_type == "post"]{
  title,
  slug,
  publisheddatetime,
  excerpt,
  overviewImage,
  body,
  tag[]->{
    name,
    _id,
    slug
  }
}`;
     const data = await client.fetch(query);
     return data;
}

export const revalidate = 60;

export default async function Blog() {
     const posts: IPost[] = await getPost();
     return (
          <div className="mx-auto max-w-5xl p-[20px]">
               <h1 className="text-[50px] font-bold">The Blog Square</h1>
               <p>
                    Stay <u className="font-bold">Up-To-Date</u> with the latest
                    tech news happening around you.
               </p>

               <div className="mt-[20px] flex w-full flex-col flex-wrap justify-center gap-3 pb-[30px] md:flex-row">
                    {posts?.length > 0 ? (
                         posts.map((post, k) => (
                              <BlogCard key={k} post={post} />
                         ))
                    ) : (
                         <div className="mx-auto w-[70%] md:w-[20%] lg:w-[30%]">
                              <Image
                                   className="mx-auto mt-[20px]"
                                   src="/no-blog.png"
                                   alt="no blog"
                                   height="100"
                                   width="1000"
                              />
                         </div>
                    )}
               </div>
          </div>
     );
}


