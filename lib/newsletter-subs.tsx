import {
     Body,
     Button,
     Container,
     Head,
     Html,
     Img,
     Hr,
     Link,
     Section,
     Column,
     Row,
     Text,
     Tailwind,
     Preview,
} from "@react-email/components";
import React from "react";

interface EmailVerificationProps {
     email: string;
     name: string;
}

const EmailNewsLetter = ({ name }: EmailVerificationProps) => {
     return (
          <Tailwind>
               <Html>
                    <Head>
                         <Preview>Your Web Dev Roadmap Awaits 🚀 </Preview>
                         <Body className="w-full bg-white text-black">
                              <Container className="w-full">
                                   <Section className="bg-[#021A1A]">
                                        <Img
                                             className="mx-auto h-full object-cover py-3"
                                             src={`https://www.palmtechniq.com/assets/palmtechniqlogo.png`}
                                             width="200"
                                             height="200"
                                        />
                                   </Section>
                                   <Section>
                                        <Text className="mt-[20px] text-center text-[20px] font-bold">
                                             Your Web Dev Roadmap is Here!
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             Hey {name},
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             {`  You’ve taken a bold step toward
                                             mastering web development and I’m
                                             excited to walk the journey with
                                             you. 🚀`}
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             {`Inside the roadmap I’m sharing with
                                             you, you’ll find a clear path from
                                             beginner to pro — from your first
                                             HTML tag all the way to building
                                             full-stack apps and deploying them
                                             to the web.`}
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             <b>
                                                  {`Don’t just download it. Walk
                                                  through it. One step at a
                                                  time.`}
                                             </b>
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             {`Print it, pin it to your wall, and
                                             commit to the process. Whether
                                             you're learning to code for a
                                             career shift, freelancing, or your
                                             next startup idea, this guide is
                                             your compass.`}
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             {`Cheers to building something great
                                         one line of code at a time. 💻🔥`}
                                        </Text>
                                        <Text className="text-center leading-relaxed md:text-left">
                                             {` I’d love to hear how your journey
                                             unfolds. Don’t hesitate to reply
                                             and share your wins (or
                                             challenges)!`}
                                        </Text>

                                        <Section className="py-6 text-center">
                                             <Button
                                                  href="https://drive.google.com/file/d/1QYh-fBkcGqz2qsjEj6GbLeid4v_XxhQv/view?usp=drive_link"
                                                  className="rounded-md bg-green-600 px-6 py-3 font-bold text-white"
                                             >
                                                  Download your WEB DEV ROADMAP
                                             </Button>
                                        </Section>

                                        <Text className="text-center md:text-left">
                                             Thanks, <br />
                                             <b>{`Ignatius Emeka (Fusco)`}</b>
                                             <br />
                                             Head Of PalmtechnIQ
                                        </Text>
                                   </Section>

                                   <Hr className="mt-[30px]" />
                                   <Section className="text-center text-[#333333]">
                                        <Text>
                                             <p>
                                                  Copyright © 2025 PalmTechnIQ,
                                                  All Rights Reserved.
                                             </p>
                                             <p>
                                                  You are recieving this mail
                                                  because you opted in via our
                                                  website.
                                             </p>
                                             <p>
                                                  Mailing Address: 1st Floor,
                                                  (Festac Tower) Chicken
                                                  Republic Building, 22Rd
                                                  ,Festac Town, Lagos, Nigeria.
                                             </p>
                                        </Text>
                                   </Section>
                                   <Section className="pb-[40px] text-center">
                                        <Button
                                             href="https://www.facebook.com/profile.php?id=61561459226438&mibextid=ZbWKwL"
                                             className="m-[5px] rounded-full bg-green-600 px-[10px] py-[8px]"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="PalmTechnIQ"
                                                  src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://www.linkedin.com/in/palm-techniq-03839b313/"
                                             className="m-[5px] rounded-full bg-green-600 px-[10px] py-[8px]"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="PalmTechnIQ"
                                                  src={`https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-a7sf08js.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://www.instagram.com/palmtechniq/"
                                             className="m-[5px] rounded-full bg-green-600 px-[10px] py-[8px]"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="PalmTechnIQ"
                                                  src={`https://static-00.iconduck.com/assets.00/instagram-icon-256x256-ubgz701g.png`}
                                             />
                                        </Button>
                                        <Button
                                             href="https://app.slack.com/client/T076LDT7109/C0764SE3VB7"
                                             className="m-[5px] rounded-full bg-green-600 px-[10px] py-[8px]"
                                        >
                                             <Img
                                                  width="23"
                                                  height="23"
                                                  alt="PalmTechnIQ"
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

export default EmailNewsLetter;
