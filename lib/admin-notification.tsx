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

interface adminNotificationProps {
     admin: string;
     tutorName: string;
     tutorEmail: string;
     studentName: string;
     studentEmail: string;
     courseName: string;
}

const adminNotification = ({
     admin = "",
     tutorName = "",
     tutorEmail = "",
     studentName = "",
     studentEmail = "",
     courseName = "",
}: adminNotificationProps) => {
     console.log("Rendering admin notification with:", {
          admin,
          tutorName,
          tutorEmail,
          studentName,
          studentEmail,
          courseName,
     });
     const emailLink = `mailto:${tutorEmail}`;
     return (
          <Tailwind>
               <Html>
                    <Head>
                         <Preview>A new student just onboarded!!</Preview>
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
                                   <Section className="w-full">
                                        <Img
                                             width="200"
                                             className="mx-auto w-full rounded-md object-cover pt-6"
                                             height="200"
                                             src={`https://isce-mail.vercel.app/static/template-images/reg-crash-course.png`}
                                        />
                                   </Section>
                                   <Section>
                                        <Text className="mt-[70px] text-center text-[20px]">
                                             Dear <b>{admin}</b>
                                        </Text>
                                        <Text className="text-center text-[16px] sm:text-[20px]">
                                             you have a new student on the
                                             platform for tutor {tutorName}
                                        </Text>
                                   </Section>
                                   <Section>
                                        <Text className="mt-[70px] text-center text-[20px]">
                                             Student Name: <b>{studentName}</b>
                                        </Text>
                                        <Text className="text-center text-[16px] sm:text-[20px]">
                                             Course: <b>{courseName}</b>
                                        </Text>
                                        <Text className="text-center text-[16px] sm:text-[20px]">
                                             Student Email:{" "}
                                             <b>{studentEmail}</b>
                                        </Text>
                                   </Section>
                                   <Section className="text-center">
                                        <Text className="text-[16px] sm:text-[20px]">
                                             Inform tutor
                                        </Text>
                                        <Button
                                             href={emailLink}
                                             className="cursor-pointer rounded-full bg-green-600 text-[20px] text-white"
                                             style={{
                                                  padding: "10px 20px",
                                                  margin: "0 auto",
                                             }}
                                        >
                                             Get in-touch with the tutor!
                                        </Button>
                                   </Section>
                                   <Hr className="mt-[30px]" />
                                   <Section className="text-center text-[#333333]">
                                        <Text>
                                             <p>{`Copyright © 2025 PalmTechnIQ, All Rights Reserved.`}</p>
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
                                                  alt="linkedin"
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
                                                  alt="instagram"
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

export default adminNotification;
