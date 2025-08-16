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
  isFavorite = true,
  onPlayPause = () => {},
  cardId = null,
  currentlyPlayingId = null,
}) => {
  const router = useRouter();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);
  const audioRef = useRef(null);

  // Check if this specific card is currently playing
  const isThisCardPlaying = cardId === currentlyPlayingId;

  // Initialize wavesurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      // Test if audio file can be loaded
      const testAudio = new Audio(musicUrl);
      testAudio.addEventListener('canplaythrough', () => {
        console.log("Audio file can be loaded:", musicName);
        testAudio.remove();
        
        // Initialize WaveSurfer after confirming audio can be loaded
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
          console.log("WaveSurfer ready for:", musicName);
          setDuration(wavesurfer.getDuration());
          setIsLoading(false);
          setError(null);
        });

        wavesurfer.on("timeupdate", () => {
          // Update current time when playing
          if (isThisCardPlaying && isPlaying) {
            const time = wavesurfer.getCurrentTime();
            setCurrentTime(time);
          }
        });

        wavesurfer.on("finish", () => {
          console.log("Audio finished for:", musicName);
          setIsPlaying(false);
          setCurrentTime(0);
          onPlayPause(); // Stop playing this card
        });

        wavesurfer.on("error", (error) => {
          console.error("WaveSurfer error for", musicName, ":", error);
          console.log("Switching to fallback audio for:", musicName);
          setUseFallback(true);
          setError(null);
          setIsLoading(false);
        });

        wavesurfer.on("loading", (percent) => {
          console.log("Loading audio for", musicName, ":", percent + "%");
        });
      });

      testAudio.addEventListener('error', (error) => {
        console.error("Audio file cannot be loaded:", musicName, error);
        setUseFallback(true);
        setError(null);
        setIsLoading(false);
        testAudio.remove();
      });

      // Cleanup function
      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
        }
        testAudio.remove();
      };
    }
  }, [musicUrl]); // Only depend on musicUrl

  // Update wavesurfer when playing state changes
  useEffect(() => {
    if (useFallback && audioRef.current) {
      if (isThisCardPlaying && isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Fallback audio play error:", err);
          setError("Failed to play audio");
        });
      } else {
        audioRef.current.pause();
        if (!isThisCardPlaying) {
          setCurrentTime(0);
        }
      }
    } else if (wavesurferRef.current) {
      if (isThisCardPlaying && isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
        if (!isThisCardPlaying) {
          setCurrentTime(0);
        }
      }
    }
  }, [isThisCardPlaying, isPlaying, useFallback]);

  // Update playing state when currentlyPlayingId changes
  useEffect(() => {
    setIsPlaying(isThisCardPlaying);
  }, [isThisCardPlaying]);

  // Handle fallback audio time updates
  useEffect(() => {
    if (useFallback && audioRef.current) {
      const handleTimeUpdate = () => {
        if (isThisCardPlaying && isPlaying) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
      
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        setIsLoading(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        onPlayPause();
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [useFallback, isThisCardPlaying, isPlaying, onPlayPause]);

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
                {formatTime(duration)}
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
              <button className="cursor-pointer w-12 h-12 rounded-xl p-[12px] bg-[#E7E9EA] flex items-center justify-center">
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
      {/* Fallback audio element */}
      {useFallback && (
        <audio
          ref={audioRef}
          src={musicUrl}
          preload="metadata"
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
};

export default MusicCard;
