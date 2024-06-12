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

interface RegCrashCourseProps {
  firstname: string;
  email: string;
  courseName: string;
}

const chatLink = `https://wa.me/qr/GHKMMDKEJZNEF1`;


const RegCrashCourse = ({
  firstname = "",
  email = "",
  courseName = "",
}: RegCrashCourseProps) => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <Preview>PalmTechnIQ User Registration Mail</Preview>
          <Body className="w-full">
            <Container className="w-full">
              <Section className="bg-[#021A1A]">
                <Img
                  className="mx-auto py-3 h-full object-cover"
                  src={`https://www.palmtechniq.com/assets/palmtechniqlogo.png`}
                  width="200"
                  height="200"
                />
              </Section>
              <Section className="w-full ">
                <Img
                  width="200"
                  className="mx-auto rounded-md object-cover w-full pt-6"
                  height="200"
                  src={`https://isce-mail.vercel.app/static/template-images/reg-crash-course.png`}
                />
              </Section>
              <Section>
                <Text className="text-[20px] mt-[70px] text-center  ">
                  Dear <b>{firstname}</b>
                </Text>
                <Text className="sm:text-[20px] text-[16px] text-center ">
                  Your email - <b>{email}</b> has been registered under the
                  course - <b>{courseName}</b>.
                </Text>
              </Section>
              <Section className="text-center">
                <Button
                  href={chatLink}
                  className=" cursor-pointer rounded-full text-white text-[20px] bg-green-600 "
                  style={{ padding: "10px 20px", margin: "0 auto" }}
                >
                  Speak with adminstration
                </Button>
              </Section>
              <Hr className="mt-[30px]" />
              <Section className="text-center text-[#333333]">
                <Text>
                  <p>{`Copyright © 2024 PalmTechnIQ, All Rights Reserved.`}</p>
                  <p>
                    {`You are recieving this mail because you opted in via our
                    website.`}
                  </p>
                  <p>
                    {`Mailing Address: 1st Floor, (Festac Tower) Chicken Republic
                    Building, 22Rd ,Festac Town, Lagos, Nigeria.`}
                  </p>
                </Text>
              </Section>
              <Section className="pb-[40px] text-center ">
                <Button
                  href="https://web.facebook.com/profile.php?id=61560523394595"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="facebook"
                    src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png`}
                  />
                </Button>
                <Button
                  href="https://www.linkedin.com/in/palm-techniq-03839b313/"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="linkedin"
                    src={`https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-a7sf08js.png`}
                  />
                </Button>
                <Button
                  href="https://www.instagram.com/palmtechniq/"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="instagram"
                    src={`https://static-00.iconduck.com/assets.00/instagram-icon-256x256-ubgz701g.png`}
                  />
                </Button>
                {/* <Button
                  href="/"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="X"
                    src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-round-icon.png`}
                  />
                </Button> */}
                <Button
                  href="https://app.slack.com/client/T076LDT7109/C0764SE3VB7"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="slack"
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

export default RegCrashCourse;
