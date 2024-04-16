import Image from "next/image";

export default function OurMission() {
  return (
    <div id="our-mission" className="h-[100svh]">
        <div className="grid md:grid-cols-2 items-center mx-auto w-full justify-center py-20">
        <div className="text-start ">
              <h1 className="text-2xl font-bold ">{`Our Mission`}</h1>
            </div>
          <div className="">
            
            <div className="font-light text-lg w-full rounded-xl overflow-clip">
              <Image
                src="/pixabay.jpg"
                width={400}
                height={400}
                alt="arin"
                className="w-full object-cover"
              ></Image>
            </div>
            <div className="">
              <span className="">{`We are constantly evolving and improving by breaking down problems and solving themin the most effecient way.`}</span>
            </div>
          </div>

          <div className="font-light text-lg w-full rounded-xl overflow-clip">
            <Image
              src="/gomes.jpg"
              width={400}
              height={400}
              alt="arin"
              className="w-full object-cover"
            ></Image>
            <div className="">
              <span className="">{`We believe in child education because the only way to really change the current world for the better is by enabling them to paint a world of their own.`}</span>
            </div>
          </div>
        </div>
    </div>
  );
}
