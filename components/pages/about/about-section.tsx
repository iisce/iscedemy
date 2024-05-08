import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";

export default function AboutSection() {
  return (
    <MaxWidthWrapper>
      <div className="w-full flex">
        <div className="lg:w-[50%] px-[30px] lg:px-[50px] my-[50px] ">
          <h3 className="lg:text-[50px] text-[30px] font-bold ">
            <span className=" font-normal">❝</span>Creativity is INTELLIGENCE
            having fun.<span className="font-normal">❞</span>
          </h3>
          <i>-Albert Einstein.</i>
          <br />
          <Link href="">
            {" "}
            <Button className="mt-[10px]">
              Apply now <ArrowRight className="w-5 h-4 " />{" "}
            </Button>{" "}
          </Link>
        </div>
        <div className=" hidden lg:inline xl:inline w-[40%]">
          <Image
            className=" mt-[26.5px] "
            src="/right.png"
            height="1000"
            width="1000"
            alt=""
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
