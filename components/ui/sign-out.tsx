"use client"
import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from "./button";

const SignOutButton = () => {
    const session = useSession();

    return (
        <div className="grid">
          {session.data?.user ? (
          <Button onClick={() => signOut()}>
            Sign Out
          </Button>
          ):(
          <Button onClick={() => signIn()}>
            Sign In
          </Button>
          ) }
      </div>
    );
}

export default SignOutButton;