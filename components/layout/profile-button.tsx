import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "next-auth";

export default function ProfileButton({ user }: { user?: User }) {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button
                         variant="outline"
                         size="icon"
                         className="overflow-hidden rounded-full"
                    >
                         <Avatar>
                              <AvatarImage
                                   src={user?.image ?? ""}
                                   alt="@shadcn"
                              />
                              <AvatarFallback>US</AvatarFallback>
                         </Avatar>
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-normal">
                         <div className="flex items-center gap-4 rounded-xl bg-secondary p-2">
                              <div className="">
                                   <Avatar className="h-14 w-14">
                                        <AvatarImage
                                             src={user?.image ?? ""}
                                             alt={user?.name || "Agent User"}
                                        />
                                        <AvatarFallback>
                                             {getInitials(
                                                  user?.name || "Agent User",
                                             )}
                                        </AvatarFallback>
                                   </Avatar>
                              </div>
                              <div
                                   // href='/manage/profile'
                                   className="flex flex-col space-y-1"
                              >
                                   <p className="text-sm font-medium leading-none">
                                        {user?.name || "Agent User"}
                                   </p>
                                   <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                   </p>
                              </div>
                         </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(user?.role === "ADMIN" ||
                         user?.role === "TUTOR" ||
                         user?.role === "STUDENT") && (
                         <DropdownMenuItem asChild>
                              <Link
                                   href={
                                        user?.role === "ADMIN"
                                             ? "/admin"
                                             : user?.role === "TUTOR"
                                               ? "/tutor"
                                               : user?.role === "STUDENT"
                                                 ? "/student"
                                                 : "/courses"
                                   }
                              >
                                   Dashboard
                              </Link>
                         </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {user?.role === "USER" && (
                         <DropdownMenuItem asChild>
                              <Link href="/courses">Purchase a course</Link>
                         </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                         <DropdownMenuItem onClick={async () => signOut()}>
                              Logout
                         </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     );
}
