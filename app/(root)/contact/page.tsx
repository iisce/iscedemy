import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Smartphone } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <MaxWidthWrapper className="">
        <div className="flex ">
          <div className="flex flex-col p-7 gap-10 w-full md:w-1/2">
            <div className="text-4xl">Contact Us</div>
            <div className="">
              <MapPin />
              located at 3rd Floor Polystar Building, Marwa, Lekki.
            </div>
            <div className="">
              <Smartphone />1 (234) 567-891 1 (234) 987-654
            </div>
            <div className="">We create and improve web & mobile products</div>

            <Image
              src="/christina.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>

          <div className="flex flex-col gap-5 p-7 w-full md:w-1/2">
            <div className="items-center gap-4">
              <Label htmlFor="Name"></Label>
              <Input
                id="Name"
                placeholder="Enter your Name "
                className=" h-8"
              />
            </div>

            <div className="items-center gap-4">
              <Label htmlFor="Email"></Label>
              <Input
                id="Email"
                placeholder="Enter a valid email address"
                className=" h-8"
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="message"></Label>
              <Input
                id="message"
                placeholder="Enter your message"
                className=" h-40"
              />
            </div>

            <Button>Submit</Button>
            <div className="">
              Partner with us and strategize for the future, We are looking
              forward to start a project with you!
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
