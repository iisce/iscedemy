'use client';
import { useEffect, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  lessonId: string;
  onVideoEnd: (lessonId: string) => void;
}

/**
 * A React component for embedding and controlling a YouTube video player.
 *
 * This component dynamically loads the YouTube IFrame Player API and initializes
 * a YouTube player instance. It handles player events such as video end, errors,
 * and state changes, and provides error feedback to the user if the video cannot
 * be loaded or played.
 *
 * @param {YouTubePlayerProps} props - The props for the YouTubePlayer component.
 * @param {string} props.videoId - The ID of the YouTube video to be played.
 * @param {string} props.lessonId - A unique identifier for the lesson, used to
 * generate a unique DOM element ID for the player.
 * @param {(lessonId: string) => void} props.onVideoEnd - A callback function
 * invoked when the video playback ends. Receives the `lessonId` as an argument.
 *
 * @returns {JSX.Element} A JSX element containing the YouTube player or an error
 * message if the player fails to load.
 *
 * @remarks
 * - The component ensures that the YouTube IFrame Player API is loaded only once
 *   and cleans up the player instance when the component is unmounted.
 * - If the video playback is restricted or the video is not found, an appropriate
 *   error message is displayed to the user.
 *
 * @example
 * ```tsx
 * <YouTubePlayer
 *   videoId="dQw4w9WgXcQ"
 *   lessonId="lesson-123"
 *   onVideoEnd={(lessonId) => console.log(`Video ended for lesson: ${lessonId}`)}
 * />
 * ```
 */
export default function YouTubePlayer({ videoId, lessonId, onVideoEnd }: YouTubePlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if the YouTube IFrame API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      setIsApiLoaded(true);
      return;
    }

    // Load the YouTube IFrame Player API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = () => {
      console.error('Failed to load YouTube IFrame API script');
      setError('Failed to load video player. Please try again later.');
    };
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize the YouTube player when the API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API loaded successfully');
      setIsApiLoaded(true);
    };

    return () => {
      delete (window as any).onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (!isApiLoaded) return;

    const player = new (window as any).YT.Player(`youtube-player-${lessonId}`, {
      height: '315',
      width: '100%',
      videoId: videoId,
      playerVars: {
        enablejsapi: 1,
        origin: window.location.origin,
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          console.log('YouTube Player is ready');
          setError(null);
        },
        onStateChange: (event: any) => {
          if (event.data === (window as any).YT.PlayerState.ENDED) {
            onVideoEnd(lessonId);
          }
        },
        onError: (event: any) => {
          console.error('YouTube Player Error:', event.data);
          if (event.data === 150 || event.data === 101) {
            setError('Video playback is restricted. Please check the video settings.');
          } else if (event.data === 100) {
            setError('Video not found. Please check the video URL.');
          } else {
            setError('An error occurred while loading the video.');
          }
        },
      },
    });

    return () => {
      player.destroy();
    };
  }, [isApiLoaded, videoId, lessonId, onVideoEnd]);

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return <div id={`youtube-player-${lessonId}`} />;
}