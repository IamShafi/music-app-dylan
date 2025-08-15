import React from "react";
import MusicCard from "./MusicCard";

const MusicLists = () => {
  return (
    <div className="w-full max-w-[1328px] flex flex-wrap gap-5 justify-center">
      {Array.from({ length: 8 }).map((_, index) => (
        <MusicCard key={index} />
      ))}
    </div>
  );
};

export default MusicLists;
