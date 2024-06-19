import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Smartphone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
	title: 'Get In Touch',
	description: 'Partner with us to strategize ,create a better future and stay ahead of your game!',
	metadataBase: new URL('https://www.palmtechniq.com/contact'),
	alternates:{
	  canonical: '/contact',
	  languages: {
		'en-US':'/en-US',
		'de-DE': '/de-DE',
	  },
	},
	openGraph: {
	  title: 'Get In Touch',
	  description: 'Partner with us to strategize ,create a better future and stay ahead of your game!',
	  url: 'https://www.palmtechniq.com/contact',
	  siteName: 'PalmTechnIQ',
	  images: '/contactheader.jpg'
	}
  }

export default function ContactPage() {
  return (
    <div>
      <MaxWidthWrapper className="w-full my-4">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col  md:p-7 gap-10 w-full">
            <div className="text-3xl">Contact Us</div>
            <div className="flex flex-col gap-4">

            <Link href='https://maps.app.goo.gl/gSLsXs4AgGmNmgcA7'>
              <div className="flex gap-2">
              <MapPin className="w-8 h-full"/>
              <div>
              <h1>Island Location</h1>
              <p>
              {`3rd Floor Polystar Building, Marwa, Lekki, Lagos`}
              </p>  
              </div>
              </div>
            </Link>

            <Link href='https://maps.app.goo.gl/V3F3m68ZbcWWp8in8'>
              <div className="flex gap-2">
              <MapPin className="md:w-8 w-12 h-full"/>
              <div>
                <h1>Mainland Location</h1>

                <p>
              {`1st floor, (Festac Tower) Chicken Rebuplic Building, 22rd, Festac Town, Lagos`}
              </p>
              </div>
              </div>
            </Link>

            </div>
            <div className="flex gap-2">
              <Smartphone />
              <Link href="tel:+2349137206365"> 09137206365 </Link>
            </div>
            <div className="">{`We build a better system to empower and facilitate younger generation on the right path to be on!`}</div>

            <Image
              src="/contact.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>

          <div className="flex flex-col my-6 md:my-0 gap-5 md:p-7 w-full">
            <div className="items-center gap-4">
              <Label htmlFor="Name">Name</Label>
              <Input
                id="Name"
                placeholder="Enter your Name "
                className=" h-8"
              />
            </div>

            <div className="items-center gap-4">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                placeholder="Enter a valid email address"
                className=" h-8"
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="message">Messgae</Label>
              <Input
                id="message"
                placeholder="Enter your message"
                className=" h-40"
              />
            </div>

            <Button>Submit</Button>
            <div className="">
              {`Partner with us to strategize ,create a better future and stay ahead of your game!
              We are looking forward to start a project with you!`}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
