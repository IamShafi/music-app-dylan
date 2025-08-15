"use client";
import React, { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import MobileMusicCard from "./MobileMusicCard";
import Link from "next/link";

const MusicLists = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalDuration = 199; // 3:19 in seconds

  // Simulate music progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying && progress < totalDuration) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, totalDuration]);

  const handlePlayPause = () => {
    if (progress >= totalDuration) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Desktop Screen Cards */}
      <div className="hidden lg:flex w-full max-w-[1328px] flex-wrap gap-5 justify-center">
        {/* Demo card with functional music bars */}
        {/* Redirect to MusicId page - Add Route link here */}
        <Link href={"/music/123"}>
          <MusicCard
            isPlaying={isPlaying}
            progress={progress}
            totalDuration={totalDuration}
            currentTime={progress}
            onPlayPause={handlePlayPause}
          />
        </Link>
        
        {/* Static cards with different progress values for demonstration */}
        {Array.from({ length: 7 }).map((_, index) => (
          <MusicCard
            key={index + 1}
            isPlaying={false}
            progress={Math.floor((index + 1) * 25)} // Different progress values
            totalDuration={totalDuration}
            currentTime={Math.floor((index + 1) * 25)}
          />
        ))}
      </div>
      {/* Mobile Screen Cards */}
      <div className="flex lg:hidden w-full max-w-[1328px] flex-col gap-5 items-center">
        {/* Demo card with functional music bars */}
        <MobileMusicCard
          isPlaying={isPlaying}
          progress={progress}
          totalDuration={totalDuration}
          currentTime={progress}
          onPlayPause={handlePlayPause}
        />

        {/* Static cards with different progress values for demonstration */}
        {Array.from({ length: 7 }).map((_, index) => (
          <MobileMusicCard
            key={index + 1}
            isPlaying={false}
            progress={Math.floor((index + 1) * 25)} // Different progress values
            totalDuration={totalDuration}
            currentTime={Math.floor((index + 1) * 25)}
          />
        ))}
      </div>
    </>
  );
};

export default MusicLists;
