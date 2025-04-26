'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from './button';

const SignOutButton = () => {
  const { data: session } = useSession();

  return (
    <div className="grid">
      {session?.user ? (
        <Button className="w-full px-5 py-3 rounded-full" onClick={() => signOut()}>
          LogOut
        </Button>
      ) : (
        <Button className="w-full px-5 py-3 rounded-full" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default SignOutButton;
