import Image from 'next/image';

export default function OurStory() {
	return (
		<div
			id='our-story'
			className='min-h-fit pt-16 border-b'
		>
			<h2 className='text-2xl font-bold py-5'>{`Our Story`}</h2>
			<div className='grid mb:mb-0  mb-8 md:grid-cols-2 grid-cols-1 gap-10 items-center justify-center mx-auto w-full'>
				<div className='w-full h-full rounded-xl overflow-clip'>
					<Image
						src='/jopwe.jpg'
						width={400}
						height={400}
						alt='arin'
						className='w-full h-96 object-cover'
					/>
				</div>
				<div className='md:text-2xl text-md text-wrap  w-full grid font-normal md:gap-4 space-y-2 '>
					<span>{`We exist specifically for our customers because we know heroes such as yourselves deserve only the best sidekicks.`}</span>
					<span>{`We believe that everyone has the right to change the world we want to give the younger generation the ability to affect their world using tech.`}</span>
					<span>{`We believe in child education because the only way to really change the current world for the better is by enabling them to paint a world of their own.`}</span>
				</div>
			</div>
		</div>
	);
}
