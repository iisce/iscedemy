import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <MaxWidthWrapper className="w-full my-4">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col  md:p-7 gap-10 w-full">
            <div className="text-3xl">Contact Us</div>
            <div className="flex flex-col gap-4">
              
              <div className="flex gap-2">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7200243526713!2d3.463767170317022!3d6.430002110038022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b917993a95193%3A0x21bdfe095d86ad6d!2sISCE%20Digital%20Concept%20Limited!5e0!3m2!1sen!2sng!4v1716046623716!5m2!1sen!2sng" width="600" height="450" loading="lazy">
              <MapPin />
              <div>
              <h1>Island Location</h1>
              <p>
              {`3rd Floor Polystar Building, Marwa, Lekki, Lagos`}
              </p>  
              </div>
              </iframe>
              </div>
              <div className="flex gap-2">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4457680185615!2d3.2825375740803637!3d6.465075023841424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b88c3bd8d26f3%3A0xa3d6fcc756e8be40!2sChicken%20Republic!5e0!3m2!1sen!2sng!4v1716046961247!5m2!1sen!2sng" width="600" height="450" loading="lazy" >
              <MapPin />
              <div>
                <h1>Mainland Location</h1>
                <p>
              {`1st floor, (Festac Tower) Chicken Rebuplic Building, 22rd, Festac Town, Lagos`}
              </p>
              </div>
              </iframe>
              </div>
              
            </div>
            <div className="flex gap-2">
              <Smartphone />
              <Link href="tel:+2348163453826"> 08163453826 </Link>
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
