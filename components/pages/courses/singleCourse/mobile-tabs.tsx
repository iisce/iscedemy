// components/ui/mobile-tabs.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MobileTabsProps {
  onTabChange: (value: string) => void;
  activeTab: string;
}

export function MobileTabs({ onTabChange, activeTab }: MobileTabsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (value: string) => {
    onTabChange(value);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="sm:hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2 rounded-xl bg-transparent hover:bg-transparent text-gray-800"
      >
        {isOpen ? 'Close Tabs' : 'More Tabs'}
      </Button>
      {isOpen && (
        <div className="flex flex-col space-y-2 border border-gray-200 rounded-lg p-2 bg-white">
          <Button
            onClick={() => handleTabClick('mentorship')}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === 'mentorship' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-800'
            }`}
            aria-selected={activeTab === 'mentorship'}
            role="tab"
          >
            Mentorship
          </Button>
          <Button
            onClick={() => handleTabClick('reviews')}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === 'reviews' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-800'
            }`}
            aria-selected={activeTab === 'reviews'}
            role="tab"
          >
            Reviews
          </Button>
          <Button
            onClick={() => handleTabClick('projects')}
            className={`w-full text-left px-4 py-2 rounded-md ${
              activeTab === 'projects' ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-800'
            }`}
            aria-selected={activeTab === 'projects'}
            role="tab"
          >
            Projects
          </Button>
        </div>
      )}
    </div>
  );
}