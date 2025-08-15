import CoinHeader from "@/components/CoinHeader";
import MusicLists from "@/components/MusicLists";
import React from "react";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Launch a coin header */}
      <CoinHeader />
      <MusicLists />
    </div>
  );
};

export default HomePage;
