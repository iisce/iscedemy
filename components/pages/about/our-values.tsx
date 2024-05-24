import Image from 'next/image';

export default function OurValues() {
	return (
		<div
			id='our-values'
			className='min-h-fit pt-16 border-b'
		>
			<div className='grid md:grid-cols-2 gap-16 items-center mx-auto w-full justify-center'>
				<div className='grid grid-cols-2 gap-5 md:text-2xl text-md text-wrap'>
					<div className='text-2xl font-bold pt-12 col-span-2'>{`Our Values`}</div>
					<div className='col-span-2'>
						<span className=''>{`We plan to lead the charge of technological innovation and solutions in africa while improving consumers lives.`}</span>
					</div>
					<div className=' '>
						<span className='font-normal text-black flex flex-col'>{`Transparency`}</span>
					</div>
					<div className=''>
						<span className=''>{`We are the solution `}</span>
					</div>
					<div className=''>
						<span className=''>{`Be relevant `}</span>
					</div>
					<div className=''>
						<span className=''>{`Connectivity is our reality `}</span>
					</div>
					<div className=''>
						<span className=''>{`Focus `}</span>
					</div>
				</div>

				<div className='md:text-2xl text-md text-wrap  '>
					<div className='w-full h-full rounded-xl overflow-clip my-3'>
						<Image
							src='/innovation.jpg'
							width={400}
							height={400}
							alt='arin'
							className='w-full h-96 object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
