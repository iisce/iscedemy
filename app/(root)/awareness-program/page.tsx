import AwarenessProgram from "@/components/pages/awareness-program/awareness";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: {
          absolute: "PalmTechnIQ - Awareness Program",
     },
     description:
          "Join 6 industry rebels (security, UX, PMs,engineers) as they expose how to weaponize AI...The Exact Blueprint you'll need by 2026",
     metadataBase: new URL("https://www.palmtechniq.com/awareness-program"),
     alternates: {
          canonical: "/awareness-program",
          languages: {
               "en-US": "/en-US",
               "de-DE": "/de-DE",
          },
     },
     openGraph: {
          title: {
               absolute: "Awareness Program",
          },
          description:
               "Join 6 industry rebels (security, UX, PMs,engineers) as they expose how to weaponize AI...The Exact Blueprint you'll need by 2026",
          url: "https://www.palmtechniq.com/awareness-program",
          siteName: "PalmTechnIQ",
          images: "/awareness.png",
     },
};

export default function AwarenessProgramPage() {
     return <AwarenessProgram />;
}
