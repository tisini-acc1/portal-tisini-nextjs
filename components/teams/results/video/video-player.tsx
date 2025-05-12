import React, { useState, useEffect } from "react";

interface VideoPlayerProps {
  url: string;
  currentTime: number;
  onTimeUpdate?: (time: number) => void;
  autoplay?: boolean;
  controls?: boolean;
}

const VideoPlayer = React.forwardRef<HTMLIFrameElement, VideoPlayerProps>(
  (
    { url, currentTime, onTimeUpdate, autoplay = true, controls = false },
    ref
  ) => {
    const [error, setError] = useState<string | null>(null);
    const [videoId, setVideoId] = useState<string | null>(null);

    // Extract video ID from YouTube URL
    const getVideoId = (url: string): string | null => {
      try {
        const regExp =
          /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
      } catch (err) {
        console.error("Failed to parse YouTube URL:", err);
        return null;
      }
    };

    useEffect(() => {
      const id = getVideoId(url);
      if (!id) {
        setError("Invalid YouTube URL");
        return;
      }
      setVideoId(id);
      setError(null);
    }, [url]);

    if (error) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
          {error}
        </div>
      );
    }

    if (!videoId) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          Loading video...
        </div>
      );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&start=${Math.floor(
      currentTime
    )}&autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`;

    return (
      <iframe
        ref={ref}
        width="100%"
        height="100%"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
        className="youtube-iframe"
      />
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;

// import React, { forwardRef, useEffect, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import YouTube from "react-youtube";
// import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

// interface VideoPlayerProps {
//   url: string;
//   currentTime: number;
//   onTimeUpdate: (time: number) => void;
// }

// const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
//   ({ url, currentTime, onTimeUpdate }, ref) => {
//     const [playing, setPlaying] = useState(false);
//     const [duration, setDuration] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const youtubeRef = useRef<any>(null);

//     // Check if the URL is a YouTube URL
//     const isYoutubeUrl = (url: string) => {
//       return url.includes("youtu.be") || url.includes("youtube.com");
//     };

//     // Extract YouTube video ID and timestamp
//     const extractYoutubeInfo = (url: string) => {
//       let videoId;
//       let timestamp = 0;

//       // Handle youtu.be format
//       if (url.includes("youtu.be")) {
//         const parts = url.split("youtu.be/");
//         if (parts.length > 1) {
//           const idAndParams = parts[1].split("&");
//           videoId = idAndParams[0];

//           // Check for timestamp
//           const timeParam = url.match(/[?&]t=(\d+(\.\d+)?)/);
//           if (timeParam && timeParam[1]) {
//             timestamp = parseFloat(timeParam[1]);
//           }
//         }
//       }
//       // Handle youtube.com format
//       else if (url.includes("youtube.com")) {
//         const videoIdMatch = url.match(/[?&]v=([^&]+)/);
//         if (videoIdMatch && videoIdMatch[1]) {
//           videoId = videoIdMatch[1];
//         }

//         const timeParam = url.match(/[?&]t=(\d+(\.\d+)?)/);
//         if (timeParam && timeParam[1]) {
//           timestamp = parseFloat(timeParam[1]);
//         }
//       }

//       return { videoId, timestamp };
//     };

//     // For direct video - Handle play/pause
//     const togglePlay = () => {
//       if (!ref) return;

//       if (isYoutubeUrl(url)) {
//         if (youtubeRef.current) {
//           if (playing) {
//             youtubeRef.current.internalPlayer.pauseVideo();
//           } else {
//             youtubeRef.current.internalPlayer.playVideo();
//           }
//         }
//       } else {
//         const video = (ref as React.RefObject<HTMLVideoElement>).current;
//         if (!video) return;

//         if (playing) {
//           video.pause();
//         } else {
//           video.play();
//         }
//       }

//       setPlaying(!playing);
//     };

//     // Skip forward/backward
//     const skipTime = (seconds: number) => {
//       if (isYoutubeUrl(url)) {
//         if (youtubeRef.current) {
//           youtubeRef.current.internalPlayer
//             .getCurrentTime()
//             .then((currentTime: number) => {
//               youtubeRef.current.internalPlayer.seekTo(
//                 currentTime + seconds,
//                 true
//               );
//             });
//         }
//       } else if (ref) {
//         const video = (ref as React.RefObject<HTMLVideoElement>).current;
//         if (!video) return;

//         video.currentTime += seconds;
//       }
//     };

//     // Format time in MM:SS
//     const formatTime = (timeInSeconds: number) => {
//       const minutes = Math.floor(timeInSeconds / 60);
//       const seconds = Math.floor(timeInSeconds % 60);
//       return `${minutes.toString().padStart(2, "0")}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//     };

//     // YouTube event handlers
//     const onYoutubeReady = (event: any) => {
//       setIsLoading(false);
//       setDuration(event.target.getDuration());

//       // If we have a specific start time, seek to it
//       if (currentTime > 0) {
//         event.target.seekTo(currentTime, true);
//       }

//       // Set up interval to update currentTime
//       const interval = setInterval(() => {
//         if (youtubeRef.current) {
//           youtubeRef.current.internalPlayer
//             .getCurrentTime()
//             .then((time: number) => {
//               onTimeUpdate(time);
//             });
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     };

//     const onYoutubeStateChange = (event: any) => {
//       // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering)
//       setPlaying(event.data === 1);
//     };

//     // For direct video files - event handlers
//     useEffect(() => {
//       if (isYoutubeUrl(url) || !ref) return;

//       const video = (ref as React.RefObject<HTMLVideoElement>).current;
//       if (!video) return;

//       const handleTimeUpdate = () => {
//         onTimeUpdate(video.currentTime);
//       };

//       const handleDurationChange = () => {
//         setDuration(video.duration);
//       };

//       const handleLoadedData = () => {
//         setIsLoading(false);
//         setDuration(video.duration);
//       };

//       const handlePlay = () => {
//         setPlaying(true);
//       };

//       const handlePause = () => {
//         setPlaying(false);
//       };

//       video.addEventListener("timeupdate", handleTimeUpdate);
//       video.addEventListener("durationchange", handleDurationChange);
//       video.addEventListener("loadeddata", handleLoadedData);
//       video.addEventListener("play", handlePlay);
//       video.addEventListener("pause", handlePause);

//       return () => {
//         video.removeEventListener("timeupdate", handleTimeUpdate);
//         video.removeEventListener("durationchange", handleDurationChange);
//         video.removeEventListener("loadeddata", handleLoadedData);
//         video.removeEventListener("play", handlePlay);
//         video.removeEventListener("pause", handlePause);
//       };
//     }, [ref, onTimeUpdate, url]);

//     // Parse YouTube URL if needed
//     const youtubeInfo = isYoutubeUrl(url)
//       ? extractYoutubeInfo(url)
//       : { videoId: null, timestamp: 0 };

//     // YouTube player options
//     const youtubeOpts = {
//       width: "100%",
//       height: "100%",
//       playerVars: {
//         autoplay: 0,
//         controls: 0,
//         start: Math.floor(currentTime),
//         modestbranding: 1,
//         rel: 0,
//       },
//     };

//     return (
//       <div className="w-full max-w-4xl mx-auto flex flex-col">
//         {/* Video Element or YouTube Player */}
//         <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-2">
//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
//               <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}

//           {isYoutubeUrl(url) ? (
//             <YouTube
//               videoId={youtubeInfo.videoId || ""}
//               opts={youtubeOpts}
//               onReady={onYoutubeReady}
//               onStateChange={onYoutubeStateChange}
//               ref={youtubeRef}
//               className="w-full h-full"
//             />
//           ) : (
//             <video
//               ref={ref}
//               src={url}
//               className="w-full h-full object-contain"
//               onLoadStart={() => setIsLoading(true)}
//               onLoadedData={() => setIsLoading(false)}
//             />
//           )}
//         </div>

//         {/* Video Controls */}
//         <div className="px-2">
//           {/* Time Display */}
//           <div className="flex justify-between text-xs text-gray-500 my-2">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>

//           {/* Playback Controls */}
//           <div className="flex items-center justify-center gap-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => skipTime(-10)}
//               className="rounded-full h-9 w-9"
//             >
//               <SkipBack className="h-4 w-4" />
//             </Button>

//             <Button
//               variant="default"
//               size="icon"
//               onClick={togglePlay}
//               className="rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-700"
//             >
//               {playing ? (
//                 <Pause className="h-5 w-5" />
//               ) : (
//                 <Play className="h-5 w-5 ml-0.5" />
//               )}
//             </Button>

//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => skipTime(10)}
//               className="rounded-full h-9 w-9"
//             >
//               <SkipForward className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// VideoPlayer.displayName = "VideoPlayer";

// export default VideoPlayer;
