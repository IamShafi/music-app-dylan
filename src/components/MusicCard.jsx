import Image from "next/image";
import React from "react";
import MusicBars from "./MusicBars";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Helper function to format seconds to MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const MusicCard = ({
  isPlaying = true,
  progress = 0,
  totalDuration = 199, // 3:19 in seconds
  currentTime = 0,
  onPlayPause = () => {},
}) => {
  const router = useRouter();
  return (
    <div
      className={`w-full max-w-[343px] lg:max-w-[654px] min-h-[197px] lg:min-h-[240px] rounded-xl p-2 
        shadow-[0px_-2px_22.5px_0px_rgba(0,0,0,0.12)] bg-white 
    ${isPlaying ? "border-[3px] border-[#E44615]" : "border-none"}`}
    >
      <div className="w-full flex items-center gap-2">
        {/* redirect to music page */}
        <Image
          src="/assets/images/card-1.svg"
          alt="card"
          width={224}
          height={224}
          className="rounded-[4px] w-[224px] h-[224px] object-cover cursor-pointer"
          onClick={() => {
            router.push("/music/123");
          }}
        />

        {/* Card Details */}
        <div className="w-full flex flex-col py-[17px] pr-[14px]">
          {/* header */}
          <div className="w-full flex items-center justify-between mb-3">
            <Link href={"/music/123"}>
              <h2 className="w-full min-w-[180px] text-[20px] font-archivo font-semibold leading-[1.15] text-[#0A1113]">
                Don't Stop Believin'
              </h2>
            </Link>
            <div className="cursor-pointer w-8 h-8 flex items-center justify-center">
              <Image
                src={"/assets/icons/heart.svg"}
                alt="heart"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>
          {/* music body */}
          <div className="w-full max-w-[384px] h-[38px] flex items-center gap-[10px] mb-3">
            <p className="mt-5 text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
              {formatTime(currentTime)}
            </p>
            {/* music bars */}
            <MusicBars
              progress={progress}
              totalDuration={totalDuration}
              isPlaying={isPlaying}
            />
            <p className="mt-5 text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
              {formatTime(totalDuration)}
            </p>
          </div>
          {/* music play/pause */}
          <div className="w-full h-[48px] flex items-center justify-between mb-3">
            {/* market cap */}
            <div className="min-w-[104px] flex items-center gap-2">
              <p className="text-[14px] font-archivo font-[400] leading-[1.15] text-[grey]">
                Market cap
              </p>
              <h2 className="text-[16px] font-archivo font-[600] leading-[1.15] text-[#0A1113]">
                {"12K"}
              </h2>
            </div>
            {/* play buttons */}
            <div className="w-full max-w-[104px] flex items-center gap-2">
              {/* play / pause button */}
              <button
                onClick={onPlayPause}
                className="cursor-pointer w-12 h-12 rounded-xl p-[14px] bg-[#11252A]  flex items-center justify-center"
              >
                <Image
                  src={
                    isPlaying
                      ? "/assets/icons/pause.svg"
                      : "/assets/icons/play.svg"
                  }
                  alt="pause/play"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </button>
              {/* copy button */}
              <button className="cursor-pointer w-12 h-12 rounded-xl p-[14px] bg-[#E7E9EA] flex items-center justify-center">
                <Image
                  src={"/assets/icons/copy.svg"}
                  alt="pause/play"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
          {/* user */}
          <Link href={"/music/123"}>
            <div className="w-full h-[32px] flex items-center justify-between">
              {/* user */}
              <div className="min-w-[139px] flex items-center gap-2">
                <Image
                  src={"/assets/images/user-1.svg"}
                  alt="user"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-[14px] font-archivo font-[400] leading-[1.15] text-[#0A1113]">
                  Kathryn Murphy
                </p>
              </div>
              {/* hour ago */}
              <div className="min-w-[80px] h-[29px] rounded-xl bg-[#E7E7E7] p-2 flex items-center justify-center">
                <p className="text-[12px] font-archivo font-[400] leading-[1.15] text-[#3B4142]">
                  {"1 hour ago"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
