import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

  
  export default function PodcastDisplay() {
    return (
      <>
        <div className="relative w-full mx-auto h-[300px] sm:h-[400px] mb-2">
          <img
            src="podcast.jpg"
            alt="Background Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative h-full flex items-center p-4 sm:p-8">
            <div className="text-white max-w-full sm:max-w-[60%] lg:max-w-[40%]">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 py-2 sm:py-4 text-center md:text-left">
                Digital Dialogues: Unpacking the Latest in Tech.
              </h1>
            </div>
          </div>
        </div>
  
        <main className="flex min-h-screen mx-auto flex-col items-center justify-between p-4 sm:p-8 lg:p-24">
          <span className="text-2xl sm:text-3xl lg:text-xl font-bold mb-1">Meet your Speakers</span>
          <div className="flex flex-wrap justify-center -space-x-4 rtl:space-x-reverse mb-10">
            {[...Array(8)].map((_, index) => (
              <img
                key={index}
                className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-white rounded-full dark:border-gray-800 transition-transform duration-300 hover:scale-150"
                src="yptoewml87ra1.jpg"
                alt=""
              />
            ))}
          </div>
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="p-2">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/IS4WfDyDuGI?si=n-c4QEyDaeuGMC3u"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-left px-2 text-lg sm:text-xl mt-2">
                    How To Bypass FRP Galaxy S9
                  </p>
                  <p className="text-left p-2 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                    suscipit laudantium aliquid in reiciendis dolores officiis! Ab
                    reprehenderit rem amet magni incidunt itaque minima veritatis
                    fugit aliquid rerum. Sapiente, impedit.
                  </p>
                </div>
              ))}
            </div>
          </div>
  
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#'  />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" >1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#"  isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" >3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext  href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </>
    );
  }
  