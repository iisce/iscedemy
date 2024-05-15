import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { PRIVACY_POLICY } from "@/lib/consts";
import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <MaxWidthWrapper className=" ">
    <div className="max-w-5xl mx-auto my-10">
      
      <div className="my-3">
        <span className="text-green-600 font-bold text-xl"> PalmTechnIQ</span> (we or
        us) is committed to protecting the privacy and security of your personal
        information. This Privacy Policy outlines how we collect use and
        safeguard your information when you use our website services or mobile
        applications (collectively the Services).
      </div>
      <h1 className="font-bold py-2 text-xl ">Information We Collect</h1>
      <div className="">
        {PRIVACY_POLICY.map((info, i) => (
          <div className="" key={i}>
          <h3 className="font-semibold my-3">{info.title}</h3>
         <ul >
            <li className=" list-disc">{info.information}</li>
         </ul>
         <Link className="text-green-600" href='/contact'>
          {info.link}
         </Link>
         </div>
        ))}
      </div>
     
    </div>
     </MaxWidthWrapper>
  );
}
