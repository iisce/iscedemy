import { logout } from '@/actions/main';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function ProfileButton() {
	const {data: session} = useSession();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='overflow-hidden rounded-full'>
					<Avatar>
						<AvatarImage
							src={session?.user?.image ?? ''}
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
									src={session?.user?.image ?? ''}
									alt={session?.user?.name || 'Agent User'}
								/>
								<AvatarFallback>
									{getInitials(
										session?.user?.name || 'Agent User'
									)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div
							// href='/manage/profile'
							className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>
								{session?.user?.name || 'Agent User'}
							</p>
							<p className='text-xs leading-none text-muted-foreground'>
								{session?.user?.email}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{(session?.user?.role === 'ADMIN' || session?.user?.role === 'TUTOR' || session?.user?.role === 'STUDENT') && (
				<DropdownMenuItem asChild>
					<Link
						href={
							session?.user?.role === 'ADMIN' 
								? '/admin'
								: session?.user?.role === 'TUTOR'
								? '/tutor'
								: session?.user?.role === 'STUDENT'
								? '/student'
								: '/courses'
						}>
						Dashboard
					</Link>
				</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				{(session?.user?.role === 'USER') && (
				<DropdownMenuItem asChild>
					<Link href='/courses'>
					Purchase a course
					</Link>
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
