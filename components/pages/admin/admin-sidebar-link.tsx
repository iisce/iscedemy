"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminSidebarLink({
     href,
     title,
}: {
     href: string;
     title: string;
}) {
     const pathname = usePathname();
     const isActive = pathname.startsWith(href);
     return (
          <Link
               href={href}
               className={cn(
                    "rounded-l-full px-5 py-1 uppercase transition-all hover:bg-green-100",
                    isActive &&
                         "bg-green-700 font-bold text-background hover:bg-green-600",
               )}
          >
               {title}
          </Link>
     );
}
