import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Smartphone } from "lucide-react";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <MaxWidthWrapper className="">
        <div className="flex">
          <div className="flex flex-col p-7 gap-5 w-full md:w-1/2">
            <div className="">Contact Us</div>
            <div className="">
              <MapPin />
              121 Rock Sreet, 21 Avenue, New York, NY 92103-9000
            </div>
            <div className="">
              <Smartphone />1 (234) 567-891 1 (234) 987-654
            </div>
            <div className="">
              We are looking forward to start a project with you!
            </div>
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
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
