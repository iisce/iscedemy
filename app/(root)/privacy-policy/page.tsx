import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className=" max-w-5xl mx-auto p-5 pb-3">
      <div className=" p-3">
        <span className="text-green-600 font-bold"> PalmtechnIQ</span> ("we" or
        "us") is committed to protecting the privacy and security of your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your information when you use our website, services, or
        mobile applications (collectively, the "Services").
      </div>
      <div className="font-bold p-3">Information We Collect</div>
      <div className="">
        <p>
          • Personal Information: When you register for an account, enroll in
          courses, or interact with our Services, we may collect personal
          information such as your name, email address, date of birth, and
          payment information.
        </p>{" "}
        <p>
          {" "}
          • Usage Data: We may collect information about how you interact with
          our Services, including your IP address, browser type, pages visited,
          and timestamps.
        </p>{" "}
        <p>
          • Cookies: We use cookies and similar tracking technologies to enhance
          your user experience and analyze usage patterns. 2. How We Use Your
          Information
        </p>{" "}
        <p>
          • We use your personal information to provide and improve our
          Services, communicate with you, and personalize your experience.
        </p>{" "}
        <p>
          • We may use usage data and cookies for analytics purposes, such as
          monitoring traffic and user behavior on our website. • We may use your
          information to send you promotional emails, newsletters, and other
          marketing communications, which you can opt out of at any time. 3.
          Information Sharing
        </p>{" "}
        <p>
          {" "}
          • We may share your information with third-party service providers who
          assist us in operating our Services, conducting our business, or
          serving our users.
        </p>{" "}
        <p>
          • We may disclose your information in response to legal requests,
          court orders, or government regulations, or to protect our rights,
          property, or safety, or that of others. 4. Data Security
        </p>
        <p>
          • We implement reasonable security measures to protect your
          information from unauthorized access, alteration, disclosure, or
          destruction.{" "}
        </p>{" "}
        <p>
          {" "}
          • Despite our efforts, no method of transmission over the internet or
          electronic storage is completely secure, and we cannot guarantee
          absolute security. 5. Children's Privacy
        </p>{" "}
        <p>
          • Our Services are not directed to children under the age of 13, and
          we do not knowingly collect personal information from children under
          13. If you believe we have collected information from a child under
          13, please contact us immediately. 6. Your Choices
        </p>{" "}
        <p>
          • You can update your account information and communication
          preferences by logging into your account settings.
        </p>{" "}
        <p>
          • You can opt out of receiving promotional emails and marketing
          communications by following the instructions in the email or
          contacting us directly. 7. Changes to this Privacy Policy{" "}
        </p>{" "}
        <p>
          {" "}
          • We may update this Privacy Policy from time to time. We will notify
          you of any material changes by posting the new Privacy Policy on this
          page. 8.{" "}
          <Link className="text-green-600" href="/about">
            {" "}
            Contact Us{" "}
          </Link>{" "}
        </p>{" "}
        • If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at [Contact Information]. By using
        our Services, you consent to the collection, use, and sharing of your
        information as described in this Privacy Policy.
      </div>
    </div>
  );
}
