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
     token: string;
}
const domain = process.env.NEXT_PUBLIC_URL;

const EmailVerification = ({ email, token }: EmailVerificationProps) => {
     const confrimLink = `${domain}/new-verification?token=${token}`;

     return (
          <Tailwind>
               <Html>
                    <Head>
                         <Preview>{`PalmTechnIQ Email Verification Mail`}</Preview>
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
                                        <Text className="mt-[20px] text-center text-[20px] font-bold md:text-left">
                                             Email Verification
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             Hi, {email}
                                        </Text>
                                        <Text className="text-center md:text-left">
                                             You are almost there, complete your
                                             email verification to finish
                                             setting up your account.
                                        </Text>
                                   </Section>
                                   <Section className="text-center md:text-left">
                                        <Button
                                             href={confrimLink}
                                             className="cursor-pointer rounded-full bg-green-600 text-[13px] text-white"
                                             style={{
                                                  padding: "10px 20px",
                                                  margin: "0 auto",
                                             }}
                                        >
                                             Click To Verify Email
                                        </Button>
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

export default EmailVerification;
