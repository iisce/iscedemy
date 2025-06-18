import Link from "next/link";

export default function DocsContributing() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Contributing</h1>
      <section id="contributing" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contributing</h2>
        <p className="text-primary mb-4">
         {` PalmTechnIQ is a private project developed by ISCE Digital Concept, and contributions are currently limited to
          internal team members and invited collaborators. This section provides guidance for those involved in
          enhancing the platform, ensuring a collaborative and efficient development process.`}
        </p>
        <p className="text-primary mb-4">
          {`If you’re part of the team or an authorized contributor, follow the steps below to participate in the
          platform’s development. For external inquiries or future collaboration opportunities, please contact us.`}
        </p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Getting Involved</h3>
        <p className="text-primary mb-4">
          {`To contribute, set up the project locally by following the`}{' '}
          <Link href="/docs/installation" className="text-green-600 hover:text-green-600/70 font-bold" >
            Installation
          </Link>{' '}
          {`instructions`} (available once completed). {`Once set up, proceed with the workflow outlined below.`}
        </p>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>Request Access</strong>: {`Contact the project lead`} ({`e.g., via`}{' '}
            <a href="mailto:admin@palmtechniq.com" className="text-green-600 hover:text-green-600/70 font-bold" >
              admin@palmtechniq.com
            </a>
            ) {`to gain repository access or discuss your contribution.`}
          </li>
          <li>
            <strong>Create a Branch</strong>: {`Use a descriptive branch name`} (e.g., <code>{`feature/new-module`}</code>) for
            your changes.
          </li>
          <li>
            <strong>Submit Changes</strong>: {`Push your changes to the repository and notify the team via GitHub Issues or
            your preferred communication tool`} (e.g., Slack, email).
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Coding Standards</h3>
        <p className="text-primary mb-4">
          {`Maintain consistency with the following standards:`}
        </p>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>
            <strong>Code Style</strong>: {`Adhere to TypeScript and React conventions, using Prettier and ESLint as
            configured.`}
          </li>
          <li>
            <strong>Commit Messages</strong>: Use clear messages (e.g., <code>{`feat: add new feature`}</code>) {`for tracking
            purposes.`}
          </li>
          <li>
            <strong>Testing</strong>: {`Add or update tests as needed, ensuring compatibility with existing tests.`}
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Review and Approval</h3>
        <p className="text-primary mb-4">
          {`All changes will be reviewed by the project lead or designated team members. Provide a summary of your work
          when submitting, and address feedback promptly. Approved changes will be merged into the main branch.`}
        </p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Support and Communication</h3>
        <p className="text-primary mb-4">
          {`For questions, feature requests, or issues, reach out to the team at`}{' '}
          <a href="mailto:admin@palmtechniq.com" className="text-green-600 hover:text-green-600/70 font-bold" >
            support@palmtechniq.com
          </a>{' '}
          {`or use our internal communication channels. Stay updated via the`}{' '}
          <Link href="/docs/changelog" className="text-green-600 hover:text-green-600/70 font-bold" >
            Changelog
          </Link>
          .
        </p>
        <p className="text-primary">
          {`We appreciate your efforts in advancing PalmTechnIQ’s mission, and we look forward to your contributions!`}
        </p>
      </section>
    </div>
  );
}