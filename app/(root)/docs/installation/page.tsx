import Link from "next/link";

export default function DocsInstallation() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Installation</h1>
      <section id="installation" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Installation</h2>
        <p className="text-primary mb-4">
          {`To set up PalmTechnIQ locally for development or exploration, follow these steps. This guide is intended for
          internal team members and authorized collaborators of ISCE Digital Concept. If you’re not yet authorized,
          please contact the project lead for access.`}
        </p>
        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Prerequisites</h3>
        <ul className="list-disc list-inside text-primary space-y-2 mb-4">
          <li>Node.js (version 18.x or later)</li>
          <li>npm (version 9.x or later)</li>
          <li>Git (for accessing the private repository)</li>
          <li>A code editor (e.g., VS Code)</li>
        </ul>
        <h3 className="text-xl font-medium mt-6 mb-2 text-green-600">Steps</h3>
        <ol className="list-decimal list-inside text-primary space-y-2">
          <li>
            Request Repository Access:
            <p className="mt-2">
              Contact the project lead at{' '}
              <a href="mailto:admin@palmtechniq.com" className="text-green-600 hover:text-green-600 font-bold">
                admin@palmtechniq.com
              </a>{' '}
              {`to obtain access to the private PalmTechnIQ repository and receive the clone URL.`}
            </p>
          </li>
          <li>
            Clone the Private Repository:
            <pre className="bg-gray-200 p-2 mt-2 rounded">
              {`git clone [PRIVATE_REPO_URL]`}
            </pre>
            <p className="mt-2 text-sm text-gray-500">
              {`Replace [PRIVATE_REPO_URL] with the URL provided by the project lead.`}
            </p>
          </li>
          <li>
            Navigate to the Project Directory:
            <pre className="bg-gray-200 p-2 mt-2 rounded">cd palmtechniq</pre>
          </li>
          <li>
            Install Dependencies:
            <pre className="bg-gray-200 p-2 mt-2 rounded">npm install</pre>
          </li>
          <li>
            Create a <span>{`.env`}</span> File and Configure Environment Variables:
            <pre className="bg-gray-200 p-2 mt-2 rounded">cp .env.example .env</pre>
            <p className="mt-2 text-primary">
              {`Edit`} <span>{`.env`}</span> {`with internal settings (e.g., database URL, API keys). Contact the team for production values
              and ensure secure handling.`}
            </p>
          </li>
          <li>
            {`Set Up the Database (e.g., PostgreSQL) and Run Migrations:`}
            <pre className="bg-gray-200 p-2 mt-2 rounded">npx prisma migrate dev</pre>
            <p className="mt-2 text-primary">
              {`Ensure the database is configured as per internal guidelines provided by the team.`}
            </p>
          </li>
          <li>
            Start the Development Server:
            <pre className="bg-gray-200 p-2 mt-2 rounded">npm run dev</pre>
          </li>
        </ol>
        <p className="text-primary mt-4">
          Once the server is running, visit{' '}
          <a href="http://localhost:2024" className="text-green-600 hover:text-green-600 font-bold">
            http://localhost:2024
          </a>{' '}
          to see the app. Refer to the{' '}
          <Link href="/docs/contributing" className="text-green-600 hover:text-green-600 font-bold">
            Contributing
          </Link>{' '}
          section for internal development guidelines.
        </p>
      </section>
    </div>
  );
}