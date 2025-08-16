"use client";
import React, { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import MobileMusicCard from "./MobileMusicCard";

const musicList = [
  {
    id: 1,
    musicName: "Delicate Weapon",
    isFavorite: true,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Grimes",
    userLogo: "/assets/images/user-1.svg",
    time: "1 hour ago",
    image: "/assets/images/card-1.svg",
  },
  {
    id: 2,
    musicName: "Don't Stop Believin'",
    isFavorite: false,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Kathryn Murphy",
    userLogo: "/assets/images/user-1.svg",
    time: "2 hour ago",
    image: "/assets/images/card-1.svg",
  },
  {
    id: 3,
    musicName: "Don't Stop Believin'",
    isFavorite: false,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Kathryn Murphy",
    userLogo: "/assets/images/user-1.svg",
    time: "3 hour ago",
    image: "/assets/images/card-1.svg",
  },
  {
    id: 4,
    musicName: "Don't Stop Believin'",
    isFavorite: true,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Kathryn Murphy",
    userLogo: "/assets/images/user-1.svg",
    time: "1 hour ago",
    image: "/assets/images/card-1.svg",
  },
  {
    id: 5,
    musicName: "Don't Stop Believin'",
    isFavorite: true,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Kathryn Murphy",
    userLogo: "/assets/images/user-1.svg",
    time: "1 hour ago",
    image: "/assets/images/card-1.svg",
  },
  {
    id: 6,
    musicName: "Don't Stop Believin'",
    isFavorite: true,
    musicUrl: "/musics/Delicate Weapon.mp3",
    marketCap: "12K",
    musicLink: "/music/123",
    user: "Kathryn Murphy",
    userLogo: "/assets/images/user-1.svg",
    time: "1 hour ago",
    image: "/assets/images/card-1.svg",
  },
];

const MusicLists = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const totalDuration = 199; // 3:19 in seconds

  // Simulate music progress when playing
  useEffect(() => {
    let interval;
    if (isPlaying && progress < totalDuration) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            setCurrentlyPlayingId(null);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, totalDuration]);

  const handlePlayPause = (cardId) => {
    if (currentlyPlayingId === cardId) {
      // Same card clicked - toggle play/pause
      if (isPlaying) {
        setIsPlaying(false);
        setCurrentlyPlayingId(null);
      } else {
        setIsPlaying(true);
        setCurrentlyPlayingId(cardId);
      }
    } else {
      // Different card clicked - start playing new card
      if (progress >= totalDuration) {
        setProgress(0);
      }
      setIsPlaying(true);
      setCurrentlyPlayingId(cardId);
    }
  };

  return (
    <>
      {/* Desktop Screen Cards */}
      <div className="hidden lg:flex w-full max-w-[1328px] flex-wrap gap-5 justify-center">
        {/* Demo card with functional music bars */}
        {musicList.map((music) => (
          <MusicCard
            key={music.id}
            cardId={music.id}
            currentlyPlayingId={currentlyPlayingId}
            isPlaying={isPlaying}
            progress={progress}
            totalDuration={totalDuration}
            currentTime={progress}
            onPlayPause={() => handlePlayPause(music.id)}
            {...music}
          />
        ))}
      </div>
      {/* Mobile Screen Cards */}
      <div className="flex lg:hidden w-full max-w-[1328px] flex-col gap-5 items-center">
        {/* Demo card with functional music bars */}
        {musicList.map((music) => (
          <MobileMusicCard
            key={music.id}
            cardId={music.id}
            currentlyPlayingId={currentlyPlayingId}
            isPlaying={isPlaying}
            progress={progress}
            totalDuration={totalDuration}
            currentTime={progress}
            onPlayPause={() => handlePlayPause(music.id)}
            {...music}
          />
        ))}
      </div>
    </>
  );
};

export default MusicLists;
