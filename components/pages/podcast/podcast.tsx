import Pagination from "@/components/shared/pagination";
import { YoutubePlaylistItem } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";



export const revalidate = 3600; // Revalidate every hour

interface PodcastDisplayProps {
  searchParams: { page?: string };
}
export default async function PodcastDisplay({searchParams}: PodcastDisplayProps) {
    const channelId = process.env.YOUTUBE_CHANNEL_ID; 
    const apiKey = process.env.GOOGLE_API_KEY_FOR_YOUTUBE;

    if (!channelId || !apiKey) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: YouTube API configuration is missing. Please contact support.</p>
      </div>
    );
  }

  let videoIds: string[] = [];
  let nextPageToken: string | null = null;
  let totalVideos = 0;
  
try {
    do {
      const searchRes: any = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&q=&type=video&maxResults=10&pageToken=${nextPageToken ?? ""}&key=${apiKey}`
      );
      if (!searchRes.ok) {
        throw new Error(`Failed to search videos: ${searchRes.statusText}`);
      }
      const searchResponse = await searchRes.json();
      const items = searchResponse.items || [];

      // Filter videos where "podcast" is in the description
      const filteredItems = items.filter((item: any) => {
        const description = item.snippet.description?.toLowerCase() || "";
        return description.includes("podcast");
      });

      videoIds = videoIds.concat(filteredItems.map((item: any) => item.id.videoId));
      nextPageToken = searchResponse.nextPageToken ?? null;
      totalVideos = searchResponse.pageInfo?.totalResults || 0;
    } while (nextPageToken && videoIds.length < 50);
  } catch (error) {
    console.error("Error searching videos:", error);
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error searching podcast videos. Please try again later.</p>
      </div>
    );
  }
  
    let videos: YoutubePlaylistItem[] = [];
      if (videoIds.length > 0) {
        try {
          const videoRes = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds.join(",")}&key=${apiKey}`
          );
          if (!videoRes.ok) {
            throw new Error(`Failed to fetch video details: ${videoRes.statusText}`);
          }
          const videoResponse: { items?: YoutubePlaylistItem[] } = await videoRes.json();
          videos = (videoResponse.items || []).map((item) => ({
            ...item,
            snippet: {
              ...item.snippet,
              resourceId: { kind: "youtube#video", videoId: item.id },
              playlistId: "",
              position: 0,
            },
          }));
        } catch (error) {
          console.error("Error fetching video details:", error);
          return (
            <div className="text-center p-8">
              <p className="text-red-500">Error fetching podcast video details. Please try again later.</p>
            </div>
          );
        }
      }
  
      const page = parseInt(searchParams?.page || "1", 8);
      const videosPerPage = 8;
      const totalPages = Math.ceil(totalVideos / videosPerPage);
      const startIndex = (page - 1) * videosPerPage;
      const paginatedVideos = videos.slice(startIndex, startIndex + videosPerPage);

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
            {[...Array(6)].map((_, index) => (
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
                          {paginatedVideos.map((item, index) => {
                            const videoId = item.snippet.resourceId.videoId;
                            const title = item.snippet.title;
                            const description = item.snippet.description || "No description available.";
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
                                <p className="text-left p-2 text-sm line-clamp-6">{description}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
          </div>
  
           {videos.length > videosPerPage && (
            <Pagination 
            page={page}
            totalPages={totalPages}
            baseUrl="/podcast"
            />
           )}
        </main>
      </>
    );
  }
  