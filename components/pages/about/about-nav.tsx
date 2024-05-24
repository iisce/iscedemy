import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons';
import { BookOpen, PenIcon } from 'lucide-react';
import Link from 'next/link';

export default function AboutNav() {
	return (
		<div className='sticky -top-1 w-full z-20 h-16 overflow-clip bg-black text-secondary'>
			<MaxWidthWrapper className='grid grid-cols-4 h-full'>
				<Link
					href={'#our-story'}
					className='  border-b-2 border-black hover:border-background py-2 text-center flex gap-2 md:gap-2 justify-center  items-center'
				>
					<BookOpen className='hidden md:block' />
					Story
				</Link>
				<Link
					href={'#our-values'}
					className=' border-b-2 border-black hover:border-background py-2 text-center flex gap-2 md:gap-2 justify-center items-center'
				>
					<PersonIcon className='hidden md:block' />
					Values
				</Link>
				<Link
					href={'#our-mission'}
					className=' border-b-2 border-black hover:border-background py-2 text-center flex gap-2 md:gap-2 justify-center items-center'
				>
					<PenIcon className='hidden md:block' />
					Mission
				</Link>
				<Link
					href={'#our-team'}
					className=' border-b-2 border-black hover:border-background py-2 text-center flex gap-2 md:gap-2 justify-center items-center'
				>
					<HamburgerMenuIcon className='hidden md:block' />
					Team
				</Link>
			</MaxWidthWrapper>
		</div>
	);
}
