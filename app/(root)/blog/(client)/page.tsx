import BlogCard from "@/components/pages/blog/blog-card";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getPost() {
     const query = `*[_type=="post"]{
  title,
    slug,
    publisheddatetime,
    excerpt,
    tag[]->{
      name,
      _id,
      slug
    },
}`;
     const data = await client.fetch(query);
     return data;
}

export const revalidate = 60;

export default async function Blog() {
     const posts: IPost[] = await getPost();
     // console.log(posts, "Posts Retrieved");
     return (
          <div className="mx-auto max-w-5xl">
               <h1 className="text-[50px] font-bold">The Blog Square</h1>
               <p>
                    Stay <u className="font-bold">Up-To-Date</u> with the latest
                    tech news happening around you.
               </p>
               <div className="grid grid-cols-3 gap-3 mt-[30px] ">
                    {posts?.length > 0 &&
                         posts.map((post) => (
                              <BlogCard key={post._id} post={post} />
                         ))}
               </div>
          </div>
     );
}
