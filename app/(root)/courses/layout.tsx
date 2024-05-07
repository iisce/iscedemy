import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import SideBar from "@/components/layout/sidebar";
import React from "react";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex gap-5">
          <SideBar />
          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
