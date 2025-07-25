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
}

const EmailNewsLetter = ({ email }: EmailVerificationProps) => {
     return (
          <Tailwind>
               <Html>
                    <Head>
                         <Preview>
                              PalmTechnIQ NewsLetter Subscription Mail
                         </Preview>
                         <Body className="w-full">
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
                                             Welcome to the PalmTechnIQ
                                             Newsletter
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             Hi, {email}
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             Congratulations, you will now be
                                             receiving updates and news on
                                             anything concerning PalmTechnIQ.
                                             Our newsletter is a good way to
                                             find out about new course
                                             additions, changes in curriculums,
                                             happening events and so on.
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             We are happy you are on board!!!
                                        </Text>
                                   </Section>
                                   <Section className="text-center md:text-left">
                                        <span>
                                             <Text>
                                                  Thanks, <br />
                                                  <b>PalmTechnIQ Team</b>
                                             </Text>
                                        </span>
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
