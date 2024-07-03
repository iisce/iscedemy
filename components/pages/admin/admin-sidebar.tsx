import AdminMobileSidebarLink from "@/components/pages/admin/admin-mobile-sidebar-link";
import AdminSidebarLink from "@/components/pages/admin/admin-sidebar-link";

export default function AdminSidebar() {
     const ADMIN_LINKS = [
          // { href: "/admin", title: "Home" },
          { href: "/admin/courses", title: "Courses" },
          { href: "/admin/students", title: "Students" },
          { href: "/admin/tutors", title: "Tutors" },
     ];
     return (
          <div className="h-full">
               <div className="mb-4 hidden h-full flex-col gap-2 border-r pl-3 pt-3 lg:flex">
                    {ADMIN_LINKS.map(({ href, title }, k) => (
                         <AdminSidebarLink key={k} href={href} title={title} />
                    ))}
               </div>
               <div className="flex gap-2 border-b lg:hidden">
                    {ADMIN_LINKS.map(({ href, title }, k) => (
                         <AdminMobileSidebarLink
                              key={k}
                              href={href}
                              title={title}
                         />
                    ))}
               </div>
          </div>
     );
}
