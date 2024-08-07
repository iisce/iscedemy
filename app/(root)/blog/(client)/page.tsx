import BlogCard from "../../../../components/pages/blog/blog-card";
import { IPost } from "../../../../lib/types";
import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import { Metadata } from 'next';
import React from "react";
import { notFound } from "next/navigation";


// Function to fetch a specific post by slug
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


// // Generate metadata based on post data
// export async function generateMetadata({
//      params,
// }: {
//      params: {blog: string};
// }): Promise<Metadata> {
//      const blogPost = await getPost();
     
//      if (!blogPost) {
//           notFound();
//      }

//      return {
//           title: blogPost.title,
//           description: blogPost.excerpt,
//           openGraph: {
//                title: blogPost.title,
//                description: blogPost.excerpt,
//                url: `https://www.palmtechniq.com/blog/${params.blog}`,
//                siteName: 'PalmTechnIQ',
//                images: [
//                     {
//                          url: blogPost.description || '/innovation.jpg',
//                          width: 800,
// 					height: 600,
// 					alt: blogPost.title || "PalmTechnIQ",
//                     }
//                ]
//           }
//      }
// }


// Define revalidate period
export const revalidate = 60;

export default async function Blog() {
     // Fetch all posts or adjust if needed
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


