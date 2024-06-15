import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/actions/main';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import { User } from '@prisma/client';

export default function ProfileButton({ user }: { user?: User | null }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='overflow-hidden rounded-full'>
					<Avatar>
						<AvatarImage
							src={user?.image ?? ''}
							alt='@shadcn'
						/>
						<AvatarFallback>US</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex items-center gap-4 bg-secondary rounded-xl p-2'>
						<div className=''>
							<Avatar className='h-14 w-14'>
								<AvatarImage
									src={user?.image ?? ''}
									alt={user?.name || 'Agent User'}
								/>
								<AvatarFallback>
									{getInitials(
										user?.name || 'Agent User'
									)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div
							// href='/manage/profile'
							className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>
								{user?.name || 'Agent User'}
							</p>
							<p className='text-xs leading-none text-muted-foreground'>
								{user?.email}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href={
							user?.role === 'TUTOR'
								? '/tutor'
								: '/student'
						}>
						Dashboard
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={async () => logout()}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
