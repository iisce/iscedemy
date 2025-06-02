import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { IBlogCard } from "../../../lib/types";
import { urlFor } from "../../../sanity/lib/image";
import AuthorCard from "./author-card";
// import AuthorCard from "./author-card";

function BlogCard({ post }: IBlogCard) {
	     console.log('Post in BlogCard:', post); // Debug log
	const imageURL = urlFor(post.overviewImage).url();
	return (
		<div className="flex flex-col w-full md:w-[30%] justify-between rounded-md border p-2 shadow-md">
			<Link href={`blog/posts/${post.slug.current}/`}>
			<div>
				<Image
					src={imageURL}
					alt={post.slug.current}
					width="1000"
					height="1000"
					className="h-[220px] rounded-md object-cover"
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
				<div className="flex items-center justify-between w-full  py-[10px]">
					<div >
                              <p className="text-[12px] font-bold text-[#333]">
                                   {new Date(post.publisheddatetime).toDateString()}
                              </p>
                              <div className="Capitalize text-[12px]">
                                   {post.author?.name || "Unknown Author"}
                              </div>
					</div>
					{/* <AuthorCard author={post.author}/> */}
						<span>
							<p className="flex items-center gap-1 text-[12px]">
								READ MORE
								<ArrowRight className="h-3 w-3" />
							</p>
						</span>
				</div>
			</div>
			</Link>
		</div>
	);
}

export default BlogCard;

