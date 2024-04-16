
export default function OurValues() {
  return (
    <div id="our-values" className="h-[100svh]">
        <div className="grid md:grid-cols-2 gap-16 items-center mx-auto w-full justify-center py-20 ">
          <div className="text-xl  ">
            <div className="text-start pb-10 ">
              <div className="text-2xl font-bold ">{`Our Values`}</div>
            </div>
            <div className=" ">
              <span className="">{`We plan to lead the charge of technological innovation and solutions in africa while improving consumers lives.`}</span>
            </div>
          </div>
          
            <div className="grid grid-cols-2 gap-10  text-xl">
              <div className=" ">
                <span className="font-normal text-black flex flex-col">{`Transparency`}</span>
              </div>
              <div className="">
                <span className="">{`We are the solution `}</span>
              </div>
              <div className="">
                <span className="">{`Be relevant `}</span>
              </div>
              <div className="">
                <span className="">{`Connectivity is our reality `}</span>
              </div>
              <div className="">
                <span className="">{`Focus `}</span>
              </div>
            </div>
     
        </div>
    </div>
  );
}
