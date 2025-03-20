'use client'
import { useEffect, useRef } from 'react';

const BackgroundVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.49; // Adjust this value between 0.1 and 1.0
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute h-full w-full object-cover"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;