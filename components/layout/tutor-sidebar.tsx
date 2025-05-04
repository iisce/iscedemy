'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BookOpenIcon, CalendarIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FileTextIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";

interface layoutTutorCourseParams {
	params: { courseId: string };
}

export default function TutorSidebar() {
  const pathname = usePathname();

const navItems = [
    { name: "Dashboard", href: "/tutor", icon: HomeIcon },
    { name: "Courses", href: `/tutor/courses`, icon: BookOpenIcon },
    { name: "Mentorships", href: `/tutor/mentorships`, icon: CalendarIcon },
    { name: "Assignments", href: `/tutor/assignments`, icon: FileTextIcon },
];

  return (
    <div className="hidden lg:grid gap-6 justify-between lg:text-left h-[calc(100%-80px)] lg:w-[300px]">
      <nav className="flex-1 p-4  space-y-2 ">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className="w-full  justify-start"
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500"
          onClick={() => signOut({ callbackUrl: "/courses" })}
        >
          <LogOutIcon className="w-5 h-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}