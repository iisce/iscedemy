import React from "react";
import { CarouselItem } from "../../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { ICOURSEHEADER } from "../../../lib/types";

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
          alt="PalmTechnIQ"
          height="1000"
          width="1000"
          className=" h-[300px] w-full rounded-md relative"
          src={image}
        />
        <div className=" absolute top-0 h-[300px] w-full bg-gradient-to-r from-black to-[#ffffff00] rounded-md ">
          <div className=" relative text-white px-[20px] pt-[60px] ">
            <h1 className="lg:text-[30px] text-[20px] lg:w-[40%] font-bold ">
              {header}
            </h1>
            <p>{description}</p>
            <Button asChild className="mt-[20px] bg-white hover:bg-white/95 text-black px-5 py-3 rounded-full ">
            <Link
              // href='/sign-up'
              href={`/courses/${link}`}
            >
              Get started
            </Link>
            </Button>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}
