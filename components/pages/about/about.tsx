import Image from "next/image";

export default function AboutIsce() {
  return (
    <div className="text-black grid gap-5 h-[100svh]">
      <div className="text-start">
        <div className="text-5xl font-bold ">{``}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-center w-full mx-auto  overflow-x-clip  justify-center py-20">
        <div className="flex flex-col max-w-[500px]">
          <div className="flex flex-col gap-2 font-bold text-lg lg:text-xl  text-[34px] leading-normal ">
            <span>{`About us `}</span>
            <span className="font-normal text-black">
              {`At Mimo, we believe that coding can open doors to opportunities like few other skills. 
              That's why we've rallied around the purpose of making coding accessible to as many people as possible.`}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-light text-lg">
            <Image src="/arin.png" width={400} height={400} alt="arin"></Image>
            
          </div>
          
        </div>
        <div className="bg-black w-screen rounded-lg bg-blend-screen px-4   border h-24  -translate-y-14 "></div>
      </div>
    </div>
  );
}
