import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBarItem({
     href,
     title,
}: {
     title: string;
     href: string;
}) {
     const pathname = usePathname();
     return (
          <li
               key={title}
               className={`text-[15px] font-bold ${
                    pathname === href
                         ? "px-1 py-2 text-green-600"
                         : "text-background"
               } `}
          >
               <Link href={`${href}`}>{title}</Link>
          </li>
     );
}
