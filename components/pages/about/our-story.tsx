import Image from "next/image";

export default function OurStory() {
	return (
		<div id="our-story" className="h-[100svh]">
			<h2 className="text-2xl font-bold pb-10 pt-16">{`Our Story`}</h2>
			<div className="grid grid-cols-2 gap-10 items-center justify-center mx-auto w-full">
				<div className="w-full h-full rounded-xl overflow-clip">
					<Image
					src="/jopwe.jpg"
					width={400}
					height={400}
					alt="arin"
					className="w-full object-cover"
					/>
				</div>
				<div className="text-2xl grid font-normal gap-4 ">
					<span>{`We exist specifically for our customers because we know heroes such as yourselves deserve only the best sidekicks.`}</span>
					<span>{`We believe that everyone has the right to change the world we want to give the younger generation the ability to affect their world using tech.`}</span>
					<span>{`We believe in child education because the only way to really change the current world for the better is by enabling them to paint a world of their own.`}</span>
				</div>
			</div>
		</div>
	);
}
