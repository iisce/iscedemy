'use client'
import { subscribe } from "@/actions/subcribe";
import {
	Loader,
	LucideFacebook,
	LucideInstagram,
	LucideLinkedin,
	LucideMail,
	LucideMapPin,
	LucidePhone,
	LucideTwitter
} from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./max-width-wrapper";

export default function Footer() {
	const [email, setEmail] = useState('');
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string| undefined>(undefined);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setSuccess("");

		startTransition(async () => {


			try {

				const result = await subscribe({email});
				if (result.error) {
					setError(result.error);
				} else {
					setSuccess(result.success);
					setEmail("");
				}
			}catch (error) {
				console.error('Error subscribing to newsletter:', error);
				setError('An error occurred while subscribing. Please try again.');
			}
			})
	}
		return (
			<div className="pt-8 bg-primary text-background">
				<MaxWidthWrapper>
					<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-7 justify-between">
						<div className="w-full flex flex-col gap-4">
							<div className="font-bold text-lg">{`PalmTechnIQ`}</div>
							<div className=" font-normal text-sm">
								{`PalmTechnIQ is an educational platform that offers a wide range of courses and resources in various fields such as technology, business, arts, and more. Our mission is to provide accessible and high-quality education to learners worldwide. `}
						</div>
					</div>

					<div className="w-full flex flex-col gap-4 text-sm">
						<ol className="font-bold text-lg"> Contact Us</ol>
						<ol className="flex gap-2 cursor-pointer">
							<LucideMapPin className="shrink-0" />
							<Link href="https://maps.app.goo.gl/V3F3m68ZbcWWp8in8">
								{`1st Floor, (Festac Tower) Chicken Republic building, 22rd ,Festac Town, Lagos, Nigeria`}
							</Link>
						</ol>
						<ol className="flex gap-2 cursor-pointer">
							<LucideMail className="shrink-0" />
							<Link href="mailto:support@palmtechniq.com">
							support@palmtechniq.com
							</Link>
						</ol>
						<ol className="flex gap-2 cursor-pointer">
							<LucidePhone className="shrink-0" />
							<Link href="tel:+2349137206365"> 09137206365 </Link>
						</ol>
					</div>

					<div className=" w-full flex flex-col gap-4 text-sm">
						<ol className="font-bold text-lg">Company</ol>
						<Link href="https://www.isce.tech" className="cursor-pointer">
							About Us
						</Link>
						<Link href="/terms-of-use" className="cursor-pointer">
							Terms Of Use
						</Link>
						<Link href="/privacy-policy" className="cursor-pointer">
							Privacy & Policy
						</Link>
						<Link href="/faq" className="cursor-pointer">
							{`Frequently Asked Question`}
						</Link>
					</div>

			<div className='flex flex-col gap-4 text-sm'>
				<div className='font-bold text-lg'>
					{`Subscribe To Our Newsletter`}
				</div>
				<form onSubmit={handleSubmit} >
					<div className=' rounded-full h-12 my-4'>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email Address'
							type='email' 
							className='px-3 w-full h-full border-none bg-slate-100 text-black rounded-full placeholder:text-black'
						/>
					</div>
					<Button 
						type="submit"
						variant='outline' 
						className='h-12 w-full rounded-full bg-background text-primary hover:bg-none '
						disabled={isPending || !email}
					>
						{isPending ? <Loader className="w-6 h-6 animate-spin" /> : 'Subscribe'}
					</Button>
					<FormError message={error} />
					<FormSuccess message={success} />
				</form>
				</div>
			</div>
			<div className='pt-10  space-y-2'>
				<div className='flex items-center gap-4 justify-center py-2'>
					{/* <Link href='https://www.twitter.com/'>
						<LucideTwitter />
					</Link> */}
					<Link href='https://www.facebook.com/profile.php?id=61560523394595'>
						<LucideFacebook />
					</Link>
					<Link href='https://www.instagram.com/palmtechniq/'>
						<LucideInstagram />
					</Link>
					<Link href='https://www.linkedin.com/'>
						<LucideLinkedin />
					</Link>
				</div>
				<div className='grid justify-center'>
					{`Powered by ISCE`}
					{`2024 PalmTechnIQ. All Rights Reserved.`}
				</div>
			</div>
			</MaxWidthWrapper>
		</div>
	);
}
