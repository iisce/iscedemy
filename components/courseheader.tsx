import React from "react";
import { CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";

export default function CourseHeader({
  image,
  header,
  description,
  link,
}: ICOURSEHEADER) {
  return (
    <CarouselItem>
      <div className={`h-[300px] w-full rounded-md`}>
        <Image
          alt="image"
          height="1000"
          width="1000"
          className=" h-[300px] w-full rounded-md relative"
          src={image}
        />
        <div className=" absolute top-0 h-[300px] w-full bg-gradient-to-r from-black to-[#ffffff00] rounded-md ">
          <div className=" relative text-white pl-[50px] pt-[60px] ">
            <h1 className="text-[30px] w-[40%] font-bold ">{header}</h1>
            <p>{description}</p>
            <Link
              className="bg-white text-black px-5 py-3 rounded-md "
              href={link}
            >
              <button className="mt-[20px]">Get started</button>
            </Link>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
