import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { YoutubeChannelsResponse, YoutubePlaylistItem, YoutubePlaylistItemsResponse } from "@/lib/types";
import Image from "next/image";

export const revalidate = 3600; // Revalidate every hour

export default async function PodcastDisplay() {
    const channelId = process.env.YOUTUBE_CHANNEL_ID; 
    const apiKey = process.env.GOOGLE_API_KEY_FOR_YOUTUBE;

    if (!channelId || !apiKey) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: YouTube API configuration is missing. Please contact support.</p>
      </div>
    );
  }

  

  let uploadsPlaylistId: string | undefined;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch channel: ${res.statusText}`);
      }
      const channelResponse: YoutubeChannelsResponse = await res.json();
      uploadsPlaylistId = channelResponse.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    } catch (error) {
      console.error("Error fetching channel:", error);
      return (
        <div className="text-center p-8">
          <p className="text-red-500">Error fetching podcast channel. Please try again later.</p>
        </div>
      );
    }

    let channelResponse = null;
    if (apiKey) {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
      );
      channelResponse = await res.json();
    }
  let videos: YoutubePlaylistItem[] = [];
    let nextPageToken: string | null = null;
    let totalVideos = 0;
  
    if (uploadsPlaylistId) {
      try {
        do {
          const playlistRes = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=10&pageToken=${nextPageToken ?? ""}&key=${apiKey}`
          );
          if (!playlistRes.ok) {
            throw new Error(`Failed to fetch playlist items: ${playlistRes.statusText}`);
          }
          const playlistResponse: YoutubePlaylistItemsResponse = await playlistRes.json();
          videos = videos.concat(playlistResponse.items || []);
          nextPageToken = playlistResponse.nextPageToken ?? null;
          totalVideos = playlistResponse.pageInfo.totalResults || 0;
        } while (nextPageToken && videos.length < 50);
      } catch (error) {
        console.error("Error fetching videos:", error);
        return (
          <div className="text-center p-8">
            <p className="text-red-500">Error fetching podcast videos. Please try again later.</p>
          </div>
        );
      }
    }
  
    const videosPerPage = 10;
    const totalPages = Math.ceil(totalVideos / videosPerPage);
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
              <Image
              width={10}
              height={10}
                key={index}
                className="w-10 h-10 sm:w-14 sm:h-14 border-2 border-green-600 rounded-full dark:border-gray-800 transition-transform duration-300 hover:scale-150"
                src="/yptoewml87ra1.jpg"
                alt=""
              />
            ))}
          </div>
          <div className="w-full max-w-5xl">
            {videos.length === 0 ? (
                        <p className="text-center text-gray-500">No podcasts available at the moment.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {videos.map((item, index) => {
                            const videoId = item.snippet.resourceId.videoId;
                            const title = item.snippet.title;
                            const description = item.snippet.description || "No description available.";
                            const thumbnailUrl = item.snippet.thumbnails.medium.url;
                            const publishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();
            
                            return (
                              <div key={index} className="p-2">
                                <div className="aspect-w-16 aspect-video">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title={title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="w-full h-full"
                                  ></iframe>
                                </div>
                               
                                <p className="text-left px-2 text-lg sm:text-xl mt-2">{title}</p>
                                <p className="text-left p-2 text-sm text-gray-600">Published: {publishedAt}</p>
                                <p className="text-left p-2 text-sm truncate-10">{description}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
          </div>
  
            {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href={`/podcast?page=1`} />
                        </PaginationItem>
                        {[...Array(totalPages)].slice(0, 5).map((_, pageIndex) => (
                          <PaginationItem key={pageIndex}>
                            <PaginationLink
                              href={`/podcast?page=${pageIndex + 1}`}
                              isActive={pageIndex === 0}
                            >
                              {pageIndex + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationNext href={`/podcast?page=${totalPages}`} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
        </main>
      </>
    );
  }
  