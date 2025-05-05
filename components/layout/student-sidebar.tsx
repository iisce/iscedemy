"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SignOutButton from "../ui/sign-out";
import { BookOpenIcon, CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { BarChartIcon } from "@radix-ui/react-icons";

const navItems = [
  { name: "Dashboard", href: "/student", icon: BookOpenIcon },
  { name: "My Courses", href: "/student/courses", icon: BookOpenIcon },
  { name: "Mentorship", href: "/mentorship", icon: CalendarIcon },
  { name: "Progress", href: "/student/progress", icon: BarChartIcon },
  { name: "Profile", href: "/student/profile", icon: UserCircleIcon },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:grid gap-5 justify-between lg:text-left h-[calc(100%-80px)] lg:w-[300px]">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md",
                  pathname === item.href ? "text-[#504f4f]" : ""
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className=''>
				<SignOutButton />
		</div>
    </div>
  );
}