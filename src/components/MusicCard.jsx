import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";

// Helper function to format seconds to MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const MusicCard = ({
  musicName = "Don't Stop Believin'",
  user = "Kathryn Murphy",
  time = "1 hour ago",
  marketCap = "12K",
  musicLink = "/music/123",
  userLogo = "/assets/images/user-1.svg",
  image = "/assets/images/card-1.svg",
  musicUrl = "/musics/Delicate Weapon.mp3",
  isPlaying = false,
  isFavorite = true,
  progress = 0,
  totalDuration = 199, // 3:19 in seconds
  currentTime = 0,
  onPlayPause = () => {},
  cardId = null,
  currentlyPlayingId = null,
}) => {
  const router = useRouter();
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);

  // Check if this specific card is currently playing
  const isThisCardPlaying = cardId === currentlyPlayingId && isPlaying;

  // Initialize wavesurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "rgb(255, 195, 176)",
        progressColor: "rgb(233, 107, 68)",
        cursorColor: "rgb(233, 107, 68)",
        barWidth: 2,
        barGap: 3,
        barRadius: 2,
        height: 38,
        url: musicUrl,
        responsive: true,
        normalize: true,
        interact: false,
        hideScrollbar: true,
        fillParent: true,
        barMinHeight: 2,
        barMaxHeight: 38,
        cursorWidth: 0,
        autoCenter: false,
        autoScroll: false,
      });

      wavesurferRef.current = wavesurfer;

      // Set up event listeners
      wavesurfer.on("ready", () => {
        setDuration(wavesurfer.getDuration());
        setIsLoading(false);
        setError(null);
      });

      wavesurfer.on("audioprocess", () => {
        // Update progress when playing
        if (isThisCardPlaying) {
          const currentTime = wavesurfer.getCurrentTime();
          // You can add a callback here to update parent state if needed
        }
      });

      wavesurfer.on("finish", () => {
        // Handle when audio finishes
      });

      wavesurfer.on("error", (error) => {
        console.error("WaveSurfer error:", error);
        setError("Failed to load audio file");
        setIsLoading(false);
      });

      // Cleanup function
      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
        }
      };
    }
  }, [musicUrl, isThisCardPlaying]);

  // Update wavesurfer when playing state changes
  useEffect(() => {
    if (wavesurferRef.current) {
      if (isThisCardPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isThisCardPlaying]);

  const handlePlayPause = () => {
    onPlayPause();
  };

  return (
    <div
      className={`w-full max-w-[343px] lg:max-w-[654px] min-h-[197px] lg:min-h-[240px] rounded-xl p-2 
        shadow-[0px_-2px_22.5px_0px_rgba(0,0,0,0.12)] bg-white 
    ${isThisCardPlaying ? "border-[3px] border-[#E44615]" : "border-none"}`}
    >
      <div className="w-full flex items-center gap-2">
        {/* redirect to music page */}
        {/* music image */}
        <Image
          src={image}
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
              {/* music name */}
              <h2 className="w-full min-w-[180px] text-[20px] font-archivo font-semibold leading-[1.15] text-[#0A1113]">
                {musicName}
              </h2>
            </Link>
            {/* favorite button */}
            <div className="cursor-pointer w-8 h-8 flex items-center justify-center">
              <Image
                src={
                  isFavorite
                    ? "/assets/icons/heart-red.svg"
                    : "/assets/icons/heart.svg"
                }
                alt="heart"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>
          {/* music body */}
          <div className="w-full h-[38px] mb-3">
            <div
              className={`${
                isThisCardPlaying ? "flex" : "hidden"
              } w-full max-w-[384px] h-[38px] items-center gap-[10px]`}
            >
              <p className="mt-5 text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
                {formatTime(currentTime)}
              </p>
              {/* music bars - replaced with WaveSurfer */}
              <div className="flex-1 h-[38px] flex items-center">
                {isLoading && !error && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-[#E96B44] text-xs">Loading...</div>
                  </div>
                )}
                {error && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-red-500 text-xs">Error</div>
                  </div>
                )}
                <div
                  ref={waveformRef}
                  className="w-full h-full"
                  style={{
                    display: isLoading || error ? "none" : "block",
                  }}
                />
              </div>
              <p className="mt-5 text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
                {formatTime(totalDuration)}
              </p>
            </div>
          </div>

          {/* music play/pause */}
          <div className="w-full h-[48px] flex items-center justify-between mb-3">
            {/* market cap */}
            <div className="min-w-[104px] flex items-center gap-2">
              <p className="text-[14px] font-archivo font-[400] leading-[1.15] text-[grey]">
                Market cap
              </p>
              <h2 className="text-[16px] font-archivo font-[600] leading-[1.15] text-[#0A1113]">
                {marketCap}
              </h2>
            </div>
            {/* buttons */}
            <div className="w-full max-w-[104px] flex items-center gap-2">
              {/* play / pause button */}
              <button
                onClick={handlePlayPause}
                className="cursor-pointer w-12 h-12 rounded-xl p-[14px] bg-[#11252A]  flex items-center justify-center"
              >
                <Image
                  src={
                    isThisCardPlaying
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
                  onClick={() => {
                    navigator.clipboard.writeText(musicLink);
                  }}
                />
              </button>
            </div>
          </div>
          {/* user and time */}
          <Link href={"/music/123"}>
            <div className="w-full h-[32px] flex items-center justify-between">
              {/* user */}
              <div className="min-w-[139px] flex items-center gap-2">
                <Image
                  src={userLogo}
                  alt="user"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-[14px] font-archivo font-[400] leading-[1.15] text-[#0A1113]">
                  {user}
                </p>
              </div>
              {/* hour ago */}
              <div className="min-w-[80px] h-[29px] rounded-xl bg-[#E7E7E7] p-2 flex items-center justify-center">
                <p className="text-[12px] font-archivo font-[400] leading-[1.15] text-[#3B4142]">
                  {time}
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
