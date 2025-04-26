'use client';
import { Button } from '../ui/button';
import ProfileButton from './profile-button';
import { signIn, useSession } from 'next-auth/react';


export default function LogInButton() {

	const {data: session} = useSession();

	if (session?.user) {
		return <ProfileButton />;
	} else {
		return <Button onClick={() => signIn()}>Login</Button>;
	}
}
