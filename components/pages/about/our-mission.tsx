import Image from "next/image";

export default function OurMission() {
  return (
    <div id="our-mission" className="h-[100svh] mb-56 md:py-0 py-2  pb-10 pt-16  ">
    <div className="grid mb:mb-0  mb-8 md:grid-cols-2 grid-cols-1 gap-10 items-center justify-between mx-auto w-full">
    <div className="md:text-2xl text-md text-wrap grid font-normal gap-4 ">
    <h1 className="text-2xl font-bold  ">{`Our Mission`}</h1>

        <p className="">{`We are constantly evolving and improving by breaking down problems and solving themin the most effecient way.`}</p>					
    </div>
      <div className="w-full h-full rounded-xl overflow-clip">
        <Image
        src="/pixabay.jpg"
        width={400}
        height={400}
        alt="arin"
        className="w-full object-cover"
        ></Image>
      </div>
    </div>
    <div className="md:flex-row-reverse flex-col flex gap-10 items-center justify-between mx-auto w-full">
    <div className="md:text-2xl text-md text-wrap  grid font-normal gap-4 ">
        <p className="">{`We believe in child education because the only way to really change the current world for the better is by enabling them to paint a world of their own.`}</p>					
    </div>
      <div className="w-full h-full rounded-xl overflow-clip">
      <Image
	  src="/gomes.jpg"
	  width={400}
	  height={400}
	  alt="arin"
	  className="w-full object-cover"
	></Image>
      </div>
    </div>
  </div>
  );
}
