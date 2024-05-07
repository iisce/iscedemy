import {
  LucideFacebook,
  LucideInstagram,
  LucideLinkedin,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideTwitter,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Footer() {
  return (
    <div className="pt-8 bg-primary text-background">
      <MaxWidthWrapper>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-7 justify-between">
          <div className="w-full flex flex-col gap-4">
            <div className="font-bold text-lg">{`PalmTechNIQ`}</div>
            <div className=" font-normal text-sm">
              {`PalmTechNIQ Store is a dynamic and inclusive
							e-commerce platform that seamlessly connects
							sellers and buyers, fostering a vibrant
							marketplace`}
            </div>
            {/* <ol className='grid grid-cols-2 gap-4'>
							<li className='bg-black h-12 justify-center gap-2 flex items-center text-white rounded-lg'>
								<LucideApple />
								<div>
									<div className='text-white text-[9px]'>
										Download On The
									</div>
									<div className='text-white text-[16px] font-bold'>
										App Store
									</div>
								</div>
							</li>
							<li className='bg-black h-12 justify-center gap-2 flex items-center text-white rounded-lg'>
								<LucideApple />
								<div>
									<div className='text-white text-[11px]'>
										Get it In
									</div>
									<div className='text-white text-[16px] font-bold'>
										Google Play
									</div>
								</div>
							</li>
						</ol> */}
          </div>

          <div className="w-full flex flex-col gap-4 text-sm">
            <ol className="font-bold text-lg"> Contact Us</ol>
            <ol className="flex gap-2 cursor-pointer">
              <LucideMapPin className="shrink-0" />
              <Link href="">
                {`1st Floor, Chicken Republic building, 22rd ,Festac Town, Lagos, Nigeria`}
              </Link>
            </ol>
            <ol className="flex gap-2 cursor-pointer">
              <LucideMail className="shrink-0" />
              <Link href="/"> info@iscedemy.com</Link>
            </ol>
            <ol className="flex gap-2 cursor-pointer">
              <LucidePhone className="shrink-0" />
              <Link href="tel:"> 09013 447 0693</Link>
            </ol>
          </div>

          <div className="flex flex-col gap-4 px-9 text-sm">
            <ol className="font-bold text-lg">Company</ol>
            <Link href="https://www.isce.tech" className="cursor-pointer">
              About Us
            </Link>
            <Link href="/terms-of-use" className="cursor-pointer">
              Terms Of Use
            </Link>
            <Link href="/privacy-policy" className="cursor-pointer">
              Privacy & Policy
            </Link>
            <Link href="/about-us" className="cursor-pointer">
              {`Frequently Asked Question`}
            </Link>
          </div>

          <div className="flex flex-col gap-4 text-sm">
            <div className="font-bold text-lg">
              {`Subscribe To Our Newsletter`}
            </div>
            <div className="border-b-2 rounded-lg h-12">
              <input
                placeholder="Email Address"
                type="text"
                className="px-3 w-full h-full border-none bg-slate-100  text-black rounded-lg placeholder:text-black"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 rounded-2xl bg-background text-primary hover:bg-none"
            >
              {`Subscribe`}
            </Button>
          </div>
        </div>
        <div className="pt-10  space-y-2">
          <div className="flex items-center gap-4 justify-center py-2">
            <Link href="/">
              <LucideTwitter />
            </Link>
            <Link href="/">
              <LucideFacebook />
            </Link>
            <Link href="/">
              <LucideInstagram />
            </Link>
            <Link href="/">
              <LucideLinkedin />
            </Link>
          </div>
          <div className="grid justify-center">
            {`2024 PalmTechNIQ. All Rights Reserved.`}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
