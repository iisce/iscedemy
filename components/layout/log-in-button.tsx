'use client';
import { User } from "next-auth";
import { Button } from "../ui/button";
import ProfileButton from "./profile-button";
import { signIn } from "next-auth/react";

export default function LogInButton({ user }: { user?: User }) {
     if (user) {
          return <ProfileButton user={user} />;
     } else {
          return <Button onClick={() => signIn()}>Login</Button>;
     }
}
