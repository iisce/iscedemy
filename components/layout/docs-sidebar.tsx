'use client';

import { DOCS_LINKS } from '@/lib/consts';
import Link from 'next/link';

export default function DocsSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-primary text-white px-5 py-8 h-screen sticky top-0">
      <h2 className="text-2xl font-bold mb-8">PalmTechnIQ Docs</h2>
      <nav className="space-y-4 grid">
        {DOCS_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-blue-100 hover:text-white transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
