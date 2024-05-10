"use client"
import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from "./button";

const SignOutButton = () => {
    const session = useSession();

    return (
        <div className="grid ">
          {session.data?.user ? (
          <Button className="w-full px-5 py-3 rounded-full" onClick={() => signOut()}>
            Sign Out
          </Button>
          ):(
          <Button className="w-full px-5 py-3 rounded-full" onClick={() => signIn()}>
            Sign In
          </Button>
          ) }
      </div>
    );
}

export default SignOutButton;