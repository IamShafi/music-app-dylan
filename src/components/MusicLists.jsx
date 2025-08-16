"use client";
import React, { useState } from "react";
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
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  const handlePlayPause = (cardId) => {
    if (currentlyPlayingId === cardId) {
      // Same card clicked - stop playing
      setCurrentlyPlayingId(null);
    } else {
      // Different card clicked - start playing new card
      setCurrentlyPlayingId(cardId);
    }
  };

  return (
    <>
      {/* Desktop Screen Cards */}
      <div className="hidden lg:flex w-full max-w-[1328px] flex-wrap gap-5 justify-center mb-10">
        {musicList.map((music) => (
          <MusicCard
            key={music.id}
            cardId={music.id}
            currentlyPlayingId={currentlyPlayingId}
            onPlayPause={() => handlePlayPause(music.id)}
            {...music}
          />
        ))}
      </div>
      {/* Mobile Screen Cards */}
      <div className="flex lg:hidden w-full max-w-[1328px] flex-col gap-5 items-center mb-10">
        {musicList.map((music) => (
          <MobileMusicCard
            key={music.id}
            cardId={music.id}
            currentlyPlayingId={currentlyPlayingId}
            onPlayPause={() => handlePlayPause(music.id)}
            {...music}
          />
        ))}
      </div>
    </>
  );
};

export default MusicLists;
