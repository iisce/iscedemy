'use client';
import React from 'react';
import { Button } from '../ui/button';
import { login } from '@/actions/main';
import { useSession } from 'next-auth/react';
import ProfileButton from './profile-button';
import { getUserById } from '@/data/user';
import { User } from '@prisma/client';

export default function LogInButton({ user }: { user?: User | null }) {
	if (!!user) {
		return <ProfileButton user={user} />;
	} else {
		return <Button onClick={async () => await login()}>Login</Button>;
	}
}
