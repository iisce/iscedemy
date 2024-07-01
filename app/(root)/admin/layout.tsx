import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import AdminSidebar from "@/components/pages/admin/admin-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default async function AdminLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <MaxWidthWrapper className="h-full">
               <div className="flex items-center justify-between">
                    <div className="p-3 font-bold">Admin Dashboard</div>
                    <Link
                         className={cn(
                              buttonVariants({
                                   className: "bg-green-600 hover:bg-green-500",
                              }),
                         )}
                         href={"/admin"}
                    >
                         Home
                    </Link>
               </div>
               <div className="mb-4 grid h-full gap-4 border-y lg:grid-cols-5">
                    <AdminSidebar />
                    <div className="grid h-full gap-4 lg:col-span-4">
                         {children}
                    </div>
               </div>
          </MaxWidthWrapper>
     );
}
