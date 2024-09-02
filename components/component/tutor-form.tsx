import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function BecomeTutorForm() {
  return (
    <div className="flex flex-col w-full my-10 px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl md:text-8xl font-bold text-left leading-tight md:leading-none">
            Want to Become a Tutor?
          </h1>
        </div>

        <div>
          <Card className="w-full">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4 mt-3 font">
                  <div className="flex flex-col space-y-1.5 font">
                    <Label htmlFor="name" className="font-bold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="shadow-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email" className="font-bold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        placeholder="johndoe@gmail.com"
                        className="shadow-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="phone" className="font-bold">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="0123456789"
                        className="shadow-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="course" className="font-bold">
                        Course Specialty
                      </Label>
                      <Select>
                        <SelectTrigger id="course" className="shadow-md">
                          <SelectValue placeholder="Choose course" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="webdevelopment">
                            Web Development
                          </SelectItem>
                          <SelectItem value="cybersecurity">
                            Cybersecurity
                          </SelectItem>
                          <SelectItem value="videoediting">
                            Video Editing
                          </SelectItem>
                          <SelectItem value="uiuxdesigning">
                            UI UX Designing
                          </SelectItem>
                          <SelectItem value="smarthomeautomation">
                            Smart Home Automation
                          </SelectItem>
                          <SelectItem value="mobileappdevelopment">
                            Mobile App Development
                          </SelectItem>
                          <SelectItem value="projectmanagement">
                            Project Management
                          </SelectItem>
                          <SelectItem value="graphicsdesign">
                            Graphics Design
                          </SelectItem>
                          <SelectItem value="dataanalysis">
                            Data Analysis
                          </SelectItem>
                          <SelectItem value="digitalmarketing">
                            Digital Marketing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="uploadcv" className="font-bold">
                        Upload CV
                      </Label>
                      <Input
                        id="uploadcv"
                        type="file"
                        className="shadow-md rounded-md file:bg-black file:rounded-md file:text-white file:font-semibold file:border-none hover: cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="coverletter" className="font-bold">
                      Cover Letter
                    </Label>
                    <Textarea id="coverletter" className="shadow-md h-40 p-3" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full md:w-auto bg-black">Submit</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
