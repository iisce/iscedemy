import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import SideBar from "@/components/layout/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
     title: {
          absolute: "Courses",
     },
     description:
          "Take charge of your tech career with our wide range of courses!",
     metadataBase: new URL("https://www.palmtechniq.com/courses"),
     alternates: {
          canonical: "/courses",
          languages: {
               "en-US": "/en-US",
               "de-DE": "/de-DE",
          },
     },
     openGraph: {
          title: {
               absolute: "Courses",
          },
          description:
               "Take charge of your tech career with our wide range of courses!",
          url: "https://www.palmtechniq.com/courses",
          siteName: "PalmTechnIQ",
          images: "/innovation.jpg",
     },
};

export default async function CourseLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     const session = await auth();
     const user = session?.user;
     return (
          <div>
               <MaxWidthWrapper>
                    <div className="flex h-full gap-5">
                         <SideBar user={user} />
                         {children}
                    </div>
               </MaxWidthWrapper>
          </div>
     );
}
