import { Metadata } from 'next';
import Image from "next/image";
import BlogCard from "../../../components/pages/blog/blog-card";
import { IPost } from "../../../lib/types";
import { client } from "../../../sanity/lib/client";


export const metadata: Metadata = {
	title:{
		absolute:  'Blog',
	},
	description: 'Stay in the loop with the latest happenings in tech!',
	metadataBase: new URL('https://www.palmtechniq.com/blog'),
	alternates:{
	  canonical: '/blog',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: {
		absolute: 'Blog',
	  },
	  description: 'Stay in the loop with the latest happenings in tech!',
	  url: 'https://www.palmtechniq.com/blog',
	  siteName: 'PalmTechnIQ',
	  images: '/jopwe.jpg'
	}
}

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
                                   alt="PalmTechnIQ || No Blog Post Found"
                                   height="100"
                                   width="1000"
                              />
                         </div>
                    )}
               </div>
          </div>
     );
}


