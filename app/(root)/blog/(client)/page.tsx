import BlogCard from "@/components/pages/blog/blog-card";
import { client } from "@/sanity/lib/client";
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
          <div className="mx-auto max-w-5xl">
               <h1 className="text-[50px] font-bold">Blog Arena</h1>
               <p>
                    Stay <u className="font-bold">Up-To-Date</u> with the latest
                    tech news happening around you.
               </p>
               <div className="mt-[30px] grid grid-cols-3 gap-3 pb-[30px]">
                    {posts?.length > 0 ? (
                         posts.map((post, k) => (
                              <BlogCard key={k} post={post} />
                         ))
                    ) : (
                         <p>No blogs available</p>
                    )}
               </div>
          </div>
     );
}


