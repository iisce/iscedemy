import { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { IPost, ISingleBlog } from "../../../../../../lib/types";
import { generateBlogMetadata } from "../../../../../../lib/metadata";
import { client } from "../../../../../../sanity/lib/client";
import { urlFor } from "../../../../../../sanity/lib/image";

export const dynamic = "force-dynamic";
/**
 * This function aids the caching of the blog posts
 */
async function getAllPost(): Promise<IPost[]> {
     const query = `*[ _type == "post"] {
  title,
  slug,
  publisheddatetime,
  excerpt,
  overviewImage,
  body,
    author->{ 
          _id,
          name,
          slug,
          image
          },
  tag[]->{
    name,
    _id,
    slug
  }
}`;
     const data = await client.fetch(query);

     return data;
}

export async function generateStaticParams() {
     const posts: IPost[] = await getAllPost();
     // console.log(`All post from getAllPost:`, posts)

     const paths = posts.map((post) => ({
          params: { slug: post.slug.current },
     }));
     // console.log(`Generated Paths:`, paths);
     return paths;
}

/**
 * This function is used to dynamically generate metadata for each blog post
 */
export async function generateMetadata({
     params: { slug },
}: ISingleBlog): Promise<Metadata> {
     const blogPost: IPost = await getPost(slug);

     if (!blogPost) {
          return {
               title: "Post Not Found | PalmTechnIQ",
               description: "The requested blog post could not be found.",
          };
     }

     const imageUrl = blogPost.overviewImage
          ? urlFor(blogPost.overviewImage).url()
          : "/innovation.jpg";

     const tagKeywords =
          blogPost.tag?.map((tag) => tag.name.trim().toLowerCase()) || [];
     const keywords = ["PalmTechnIQ", ...tagKeywords.slice(0, 9)];

     const metadata = generateBlogMetadata(
          blogPost.title || "PalmTechnIQ Blog Post",
          blogPost.excerpt ||
               "Stay updated with the latest tech news and insights.",
          imageUrl,
          slug,
     );

     // Add additional metadata specific to blog posts
     return {
          ...metadata,
          keywords,
          authors: [
               { name: "PalmTechnIQ", url: "https://www.palmtechniq.com" },
          ],
          twitter: {
               ...metadata.twitter,
               creator: "@palmtechniq",
          },
          robots: {
               index: true,
               follow: true,
               noarchive: true,
               nosnippet: false,
               noimageindex: false,
               nocache: false,
          },
     };
}

async function getPost(slug: string) {
     const query = `*[_type == "post" && slug.current== "${slug}"][0]{
  title,
  slug,
  publisheddatetime,
  excerpt,
  overviewImage,
  body,

author->{ 
     _id,
     name,
     slug,
     image
},
  tag[]->{
    name,
    _id,
    slug
  }
}`;
     try {
          const post = await client.fetch(query);
          // console.log(`Post for slug ${slug}:`, post);
          return post;
     } catch (error) {
          // console.error(`Error fetching post for slug ${slug}:`, error);
          return null;
     }
}

const SinglePage = async ({ params }: ISingleBlog) => {
     const PortableTextComponent = {
          types: {
               image: ({ value }: any) => (
                    <Image
                         className="my-[30px] rounded-md"
                         src={urlFor(value).url()}
                         height="1000"
                         width="1000"
                         alt={value.alt || "   "}
                    />
               ),
          },
     };
     const post: IPost = await getPost(params.slug);
     // console.log({"SinglePost URL": params.slug});

     if (!post) {
          return (
               <div className="mx-auto max-w-4xl p-[20px] text-center">
                    <h1 className="text-2xl font-bold">Post Not Found</h1>
                    <p>The requested blog post could not be found.</p>
               </div>
          );
     }
     return (
          <div className="mx-auto max-w-4xl p-[20px]">
               <h3 className="pb-[20px] text-center text-[27px] font-bold">
                    {post.title}
               </h3>
               <hr />
               <div className="p-[10px]">
                    <p className="text-[13px]">
                         Posted on:{" "}
                         {new Date(post.publisheddatetime).toDateString()}{" "}
                    </p>
                    <p className="text-[13px] text-green-600">
                         Author: {post.author.name}{" "}
                    </p>
                    <Image
                         src={urlFor(post.overviewImage).url()}
                         alt={post.slug.current}
                         width="1000"
                         height="1000"
                         className="mx-auto mb-[10px] mt-[20px] hidden h-[350px] w-full rounded-md object-cover blur-sm md:inline"
                    />
                    <div className="relative z-10 mx-auto mt-[0px] rounded-md bg-white py-[10px] md:-mt-[200px] md:w-[93%] md:px-[20px]">
                         <div className="pt-[10px] prose-headings:my-[10px] prose-headings:font-bold prose-h1:text-[50px] prose-h2:text-[40px] prose-h3:text-[30px] prose-h4:text-[20px] prose-h5:text-[15px] prose-h6:text-[13px] prose-p:text-[17px] prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-[#333333] prose-blockquote:pl-[10px] prose-code:rounded-sm prose-code:bg-[#333333] prose-code:p-[10px] prose-code:text-[14px] prose-code:leading-10 prose-code:text-white prose-ol:list-decimal prose-ul:list-disc prose-li:ml-[25px]">
                              <PortableText
                                   value={post.body}
                                   components={PortableTextComponent}
                              />
                         </div>
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
               </div>
               <div className="">
                    <h1 className="text-[20px] font-bold">
                         Connect with us on:
                    </h1>
                    <div className="flex flex-row gap-1">
                         <Link
                              className="group flex w-[35px] items-center gap-2 overflow-clip rounded-full bg-[#01613F] p-[5px] text-[15px] text-[#fff] transition-all duration-300 hover:w-[120px]"
                              href="https://www.instagram.com/palmtechniq/"
                         >
                              <PiInstagramLogoFill className="h-6 w-6" />
                              <p className="hidden group-hover:inline">
                                   Instagram
                              </p>
                         </Link>
                         <Link
                              className="group flex w-[35px] items-center gap-2 overflow-clip rounded-full bg-[#01613F] p-[5px] text-[15px] text-[#fff] transition-all duration-300 hover:w-[120px]"
                              href="https://www.facebook.com/profile.php?id=61561459226438&mibextid=ZbWKwL"
                         >
                              <FaFacebook className="h-6 w-6" />
                              <p className="hidden group-hover:inline">
                                   Facebook
                              </p>
                         </Link>
                         <Link
                              className="group flex w-[35px] items-center gap-2 overflow-clip rounded-full bg-[#01613F] p-[5px] text-[15px] text-[#fff] transition-all duration-300 hover:w-[120px]"
                              href="https://wa.me/qr/GHKMMDKEJZNEF1"
                         >
                              <IoLogoWhatsapp className="h-6 w-6" />
                              <p className="hidden group-hover:inline">
                                   Whatsapp
                              </p>
                         </Link>
                         <Link
                              className="group flex w-[35px] items-center gap-2 overflow-clip rounded-full bg-[#01613F] p-[5px] text-[15px] text-[#fff] transition-all duration-300 hover:w-[120px]"
                              href="https://www.linkedin.com/company/palmtechniq/"
                         >
                              <FaLinkedinIn className="h-6 w-6" />
                              <p className="hidden group-hover:inline">
                                   LinkedIn
                              </p>
                         </Link>
                         <Link
                              className="group flex w-[35px] items-center gap-2 overflow-clip rounded-full bg-[#01613F] p-[5px] text-[15px] text-[#fff] transition-all duration-300 hover:w-[120px]"
                              href="mailto:support@palmtechniq.com"
                         >
                              <BiLogoGmail className="h-6 w-6" />
                              <p className="hidden group-hover:inline">Email</p>
                         </Link>
                    </div>
               </div>
               <div className="mt-[10px]">
                    <h1>
                         Explore PalmTechnIQ courses at:{" "}
                         <Link
                              className="rounded-full bg-[#01613F] px-[11px] py-[3px] text-[13px] text-white"
                              href="https://www.palmtechniq.com/courses"
                         >
                              Courses
                         </Link>{" "}
                    </h1>
               </div>
          </div>
     );
};

export default SinglePage;
