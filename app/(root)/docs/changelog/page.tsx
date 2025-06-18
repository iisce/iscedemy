import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function DocsChangelog() {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  let content = '';

  try {
    const fileContents = fs.readFileSync(changelogPath, 'utf8');
    const { content: parsedContent } = matter(fileContents);
    content = parsedContent;
  } catch (error) {
    content = 'Changelog file not found or unreadable. Please contact the project lead at admin@palmtechniq.com.';
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Changelog</h1>
      <p className="text-gray-600 mb-4">
        {`This changelog is available to internal team members and authorized collaborators of PalmTechnIQ. It tracks
        version history and updates for the platform.`}
      </p>
      <div className="prose max-w-none text-gray-700">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}