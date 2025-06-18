import Link from "next/link";

export default function DocsAPI() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">API</h1>
      <section id="api" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">API</h2>
        <p className="text-primary mb-4">
          {`The PalmTechnIQ API is currently under development as we work to enhance the platform’s capabilities. This
          section will soon provide detailed documentation for integrating with PalmTechnIQ, enabling developers to
          build custom applications, automate workflows, and extend the learning ecosystem.`}
        </p>
        <p className="text-primary mb-4">
         {` We are committed to delivering a robust and secure API to support our community of developers, tutors, and
          partners. Stay tuned for updates, and feel free to reach out to our support team for early access or
          inquiries about future API offerings.`}
        </p>
        <p className="text-primary">
          {`For the latest news on API availability, check the`}{' '}
          <Link href="/docs/changelog" className="text-green-600 hover:text-green-600/50 font-bold">
            Changelog
          </Link>
          , or contact us at{' '}
          <a href="mailto:support@palmtechniq.com" className="text-green-600 font-bold hover:text-green-600/50">
            support@palmtechniq.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}