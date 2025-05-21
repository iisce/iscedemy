'use client';

import { signOut, signIn } from "next-auth/react";
import { Button } from "./button";
import { User } from "next-auth";

const SignOutButton = ({ user }: { user?: User }) => {
     return (
          <div className="grid">
               {user ? (
                    <Button
                         className="w-full rounded-full px-5 py-3"
                         onClick={() => signOut()}
                    >
                         LogOut
                    </Button>
               ) : (
                    <Button
                         className="w-full rounded-full px-5 py-3"
                         onClick={() => signIn()}
                    >
                         Login
                    </Button>
               )}
          </div>
     );
};

export default SignOutButton;
