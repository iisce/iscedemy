'use client';
import { login } from '@/actions/main';
import { User } from '@prisma/client';
import { Button } from '../ui/button';
import ProfileButton from './profile-button';

export default function LogInButton({ user }: { user?: User | null }) {
	if (!!user) {
		return <ProfileButton user={user} />;
	} else {
		return <Button onClick={async () => await login()}>Login</Button>;
	}
}
