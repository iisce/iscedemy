import BecomeTutorForm from "@/components/component/tutor/tutor-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
     title: {
          absolute: "PalmTechnIQ - Become a tutor",
     },
     description:
          "Join many other tutors like you to create an amazing learning experience for learners round the world..Become the change you want to be!",
     metadataBase: new URL("https://www.palmtechniq.com/become-tutor"),
     alternates: {
          canonical: "/become-tutor",
          languages: {
               "en-US": "/en-US",
               "de-DE": "/de-DE",
          },
     },
     openGraph: {
          title: {
               absolute: "Become a tutor",
          },
          description:
               "Join many other tutors like you to create an amazing learning experience for learners round the world..Become the change you want to be!",
          url: "https://www.palmtechniq.com/become-tutor",
          siteName: "PalmTechnIQ",
          images: "/awareness.png",
     },
};

export default function BecomeTutorPage() {
     return (
          <div>
               <BecomeTutorForm />{" "}
          </div>
     );
}
