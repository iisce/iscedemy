import Link from "next/link";
import React from "react";

export default function TermsOfUse() {
  return (
    <div className=" max-w-5xl mx-auto p-5 pb-3">
      <div className=" text-center ">
        <h1 className="font-bold text-3xl"> Terms of Use</h1>
      </div>
      <div className=" p-5 ">
        <p className="font-bold p-5">Acceptance of Terms</p>
        Welcome to
        <span className="text-green-600 font-bold"> PalmtechnIQ!</span> By
        accessing or using our platform you agree to be bound by these Terms of
        Use (Terms). If you do not agree to these Terms please do not use our
        platform.
        <p>
          2. Description of Services
          <span className="text-green-600 font-bold"> PalmtechnIQ </span>
          provides an online learning platform that offers a variety of
          educational resources courses and services to users.
        </p>
        <p>
          3. User Responsibilities Users are responsible for maintaining the
          confidentiality of their account credentials and for all activities
          that occur under their account. Users must comply with all applicable
          laws and regulations and respect the rights of others while using our
          platform.
        </p>
        <p>
          4. Intellectual Property All content and materials available on our
          platform including but not limited to text graphics logos images and
          software are the property of
          <span className="text-green-600 font-bold"> PalmtechnIQ </span> or its
          licensors and are protected by copyright and other intellectual
          property laws.
        </p>
        <p>
          5. Privacy Policy Our Privacy Policy explains how we collect use and
          protect your personal information. By using our platform you consent
          to the collection and use of your information as described in our
          Privacy Policy.
        </p>
        <p>
          6. Payment and Billing Certain features or services on our platform
          may require payment. By purchasing these features or services you
          agree to pay all applicable fees and charges.
        </p>
        <p>
          7. Limitation of Liability
          <span className="text-green-600 font-bold"> PalmtechnIQ </span> is not
          liable for any damages or losses arising out of or in connection with
          your use of our platform. We are not responsible for the accuracy
          completeness, or reliability of any content or materials provided by
          third parties.
        </p>
        <p>
          8. Governing Law and Jurisdiction These Terms are governed by and
          construed in accordance with the laws of the Nigerian government. Any
          disputes arising out of or relating to these Terms shall be subject to
          the exclusive jurisdiction of the courts of Nigeria.
        </p>
        <p>
          9. Changes to Terms
          <span className="text-green-600 font-bold"> PalmtechnIQ </span>{" "}
          reserves the right to modify or update these Terms at any time. We
          will notify users of any material changes to these Terms and continued
          use of our platform after such changes constitutes acceptance of the
          updated Terms.
        </p>
        10.
        <Link className="text-green-600" href="/about">
          {" "}
          Contact Us{" "}
        </Link>
        If you have any questions or concerns about these Terms please contact
        us at contact
      </div>
    </div>
  );
}