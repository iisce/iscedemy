import {
     Body,
     Button,
     Container,
     Head,
     Hr,
     Html,
     Img,
     Preview,
     Section,
     Tailwind,
     Text,
} from "@react-email/components";

interface EventNotificationProps {
     registrantName: string;
     eventName: string;
     eventDate: string;
     eventVenue: string;
}

const eventNotification = ({
     registrantName = "",
     eventName = "PalmTechnIQ Lunchpad - AI Na The Future Program 2025",
     eventDate = "August 30, 2025",
     eventVenue = "22rd Chicken Republic Building (FESTAC Tower), AMG Workspace, 1st floor, FESTAC Town, Lagos, Nigeria",
}: EventNotificationProps) => {
     return (
          <Tailwind>
               <Html>
                    <Head>
                         <Preview>Welcome to {eventName}!</Preview>
                         <Body className="w-full bg-[#021A1A]">
                              <Container className="mx-auto w-full p-6">
                                   <Section className="text-center">
                                        <Img
                                             className="mx-auto h-24 object-cover py-4"
                                             src={`https://www.palmtechniq.com/assets/palmtechniqlogo.png`}
                                             width="200"
                                             height="100"
                                             alt="PalmTechnIQ Logo"
                                        />
                                   </Section>
                                   <Section className="w-full text-center">
                                        <Img
                                             width="300"
                                             className="mx-auto w-full max-w-xs rounded-md object-cover pt-6"
                                             height="200"
                                             src={`https://isce-mail.vercel.app/static/template-images/reg-crash-course.png`}
                                             alt="AI Awareness Event"
                                        />
                                   </Section>
                                   <Section className="mt-10 text-center">
                                        <Text className="text-2xl font-bold text-white">
                                             Welcome, {registrantName}!
                                        </Text>
                                        <Text className="text-lg text-green-200">
                                             You’re registered for{" "}
                                             <b>{eventName}</b>!
                                        </Text>
                                   </Section>
                                   <Section className="mt-6 text-left text-white">
                                        <Text className="text-lg">
                                             Event Details:
                                        </Text>
                                        <Text>
                                             <b>Date:</b> {eventDate}
                                        </Text>
                                        <Text>
                                             <b>Venue:</b> {eventVenue}
                                        </Text>
                                        <Text className="mt-4">
                                             Join us for an exciting day where
                                             industry experts will reveal how to
                                             weaponize AI to future-proof your
                                             career. Highlights include:
                                        </Text>
                                        <ul className="list-disc pl-5 text-green-200">
                                             <li>
                                                  Keynote on AI-driven career
                                                  strategies
                                             </li>
                                             <li>Hands-on AI tool workshops</li>
                                             <li>
                                                  Networking with industry
                                                  rebels
                                             </li>
                                        </ul>
                                   </Section>
                                   <Section className="mt-6 text-center">
                                        <Text className="text-lg text-white">
                                             Connect with fellow innovators!
                                             Join our WhatsApp community to stay
                                             updated, share ideas, and network
                                             with like-minded individuals:
                                             <br />
                                             <a
                                                  href="https://chat.whatsapp.com/LabSnHSaCEmCLhWxXXar3O"
                                                  className="text-md mt-2 inline-block rounded-full bg-green-600 px-6 py-2 text-white hover:bg-green-700"
                                             >
                                                  Join WhatsApp Community
                                             </a>
                                        </Text>
                                   </Section>
                                   <Section className="mt-6 text-center">
                                        <Text className="text-lg text-white">
                                             Have questions? Reach out to our
                                             support team at{" "}
                                             <a
                                                  href="mailto:support@palmtechniq.com"
                                                  className="text-green-400 hover:underline"
                                             >
                                                  support@palmtechniq.com
                                             </a>
                                        </Text>
                                   </Section>
                                   <Hr className="my-6 border-green-700" />
                                   <Section className="text-center text-gray-400">
                                        <Text>
                                             <p>
                                                  Copyright © 2025 PalmTechnIQ,
                                                  All Rights Reserved.
                                             </p>
                                             <p>
                                                  You are receiving this email
                                                  because you registered for an
                                                  event via our website.
                                             </p>
                                             <p>
                                                  Mailing Address: 1st Floor,
                                                  (Festac Tower) Chicken
                                                  Republic Building, 22Rd,
                                                  Festac Town, Lagos, Nigeria.
                                             </p>
                                        </Text>
                                   </Section>
                                   <Section className="flex justify-center gap-4 pb-6">
                                        <Button
                                             href="https://www.facebook.com/profile.php?id=61561459226438&mibextid=ZbWKwL"
                                             className="rounded-full bg-green-600 p-2"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="Facebook"
                                                  src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://www.linkedin.com/in/palm-techniq-03839b313/"
                                             className="rounded-full bg-green-600 p-2"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="LinkedIn"
                                                  src={`https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-a7sf08js.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://www.instagram.com/palmtechniq/"
                                             className="rounded-full bg-green-600 p-2"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="Instagram"
                                                  src={`https://static-00.iconduck.com/assets.00/instagram-icon-256x256-ubgz701g.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://app.slack.com/client/T076LDT7109/C0764SE3VB7"
                                             className="rounded-full bg-green-600 p-2"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="Slack"
                                                  src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/slack-icon.png`}
                                             />
                                        </Button>
                                   </Section>
                              </Container>
                         </Body>
                    </Head>
               </Html>
          </Tailwind>
     );
};

export default eventNotification;
