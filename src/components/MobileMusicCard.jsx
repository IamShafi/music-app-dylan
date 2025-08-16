import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

// Helper function to format seconds to MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const MobileMusicCard = ({
  musicName = "Don't Stop Believin'",
  user = "Kathryn Murphy",
  time = "1 hour ago",
  marketCap = "12K",
  musicUrl = "/musics/Delicate Weapon.mp3",
  onPlayPause = () => {},
  cardId = null,
  currentlyPlayingId = null,
  isFavorite = false,
}) => {
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
          height: 49,
          url: musicUrl,
          responsive: true,
          normalize: true,
          interact: false,
          hideScrollbar: true,
          fillParent: true,
          barMinHeight: 2,
          barMaxHeight: 49,
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
          const time = wavesurfer.getCurrentTime();
          setCurrentTime(time);
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

  // Update playing state when currentlyPlayingId changes
  useEffect(() => {
    setIsPlaying(isThisCardPlaying);
  }, [isThisCardPlaying]);

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
      className={`w-full max-w-[350px] flex flex-col gap-[10px] min-h-[138px] rounded-xl p-2 
        shadow-[0px_-2px_22.5px_0px_rgba(0,0,0,0.12)] bg-white 
    ${isThisCardPlaying ? "border-[1.5px] border-[#E44615]" : "border-none"}`}
    >
      <div className="w-full flex items-center gap-[10px]">
        <Image
          src="/assets/images/card-1.svg"
          alt="card"
          width={122}
          height={122}
          className="rounded-[4px] w-[122px] h-[122px]"
        />
        {/* Card Details */}
        <div className="w-full flex flex-col py-[17px] pr-[14px]">
          {/* header */}
          <div className="w-full flex items-center justify-between mb-[6px]">
            <h2 className="w-full min-w-[123px] text-[18px] font-archivo font-semibold leading-[1.2] text-[#0A1113]">
              {musicName}
            </h2>
            {/* market cap */}
            <div className="min-w-[64px] flex items-center gap-1">
              <p className="text-[12px] font-archivo font-[400] leading-[1.15] text-[grey]">
                MCAP
              </p>
              <h2 className="text-[14px] font-archivo font-[600] leading-[1.15] text-[#0A1113]">
                {marketCap}
              </h2>
            </div>
          </div>
          {/* user */}
          <div className="w-full h-[18px] flex items-center justify-between mb-2">
            {/* user */}
            <div className="min-w-[109px] flex items-center gap-2">
              <Image
                src={"/assets/images/user-1.svg"}
                alt="user"
                width={32}
                height={32}
                className="w-4.5 h-4.5 rounded-full"
              />
              <p className="text-[12px] font-archivo font-[400] leading-[1.15] text-[#0A1113]">
                {user}
              </p>
            </div>
            {/* hour ago */}
            <div className="min-w-[56px] rounded-xl p-2 flex items-center justify-center">
              <p className="text-[12px] font-archivo font-[400] leading-[1.15] text-[#3B4142]">
                {time}
              </p>
            </div>
          </div>
          {/* music play/pause */}
          <div className="w-full h-[44px] flex items-center justify-between gap-2">
            {/* play / pause button */}
            <button
              onClick={handlePlayPause}
              className="cursor-pointer w-[91px] h-11 rounded-xl p-[12px] bg-[#11252A]  flex items-center justify-center"
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
            <button className="cursor-pointer w-11 h-11 rounded-xl p-[12px] bg-[#E7E9EA] flex items-center justify-center">
              <Image
                src={"/assets/icons/copy.svg"}
                alt="pause/play"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
            {/* favorite */}
            <button className="cursor-pointer w-11 h-11 rounded-xl p-[12px] bg-[#E7E9EA] flex items-center justify-center">
              <Image
                src={
                  isFavorite
                    ? "/assets/icons/heart-red.svg"
                    : "/assets/icons/heart.svg"
                }
                alt="heart"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className={`${isThisCardPlaying ? "block" : "hidden"} w-full h-[1px] bg-[#E7E7E7]`} />
      {/* music body */}
      <div
        className={`${
          isThisCardPlaying ? "flex" : "hidden"
        } w-full max-w-[327px] h-[49px] flex items-center gap-[10px]`}
      >
        <p className="mt-[26px] text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
          {formatTime(currentTime)}
        </p>
        {/* music bars - replaced with WaveSurfer */}
        <div className="flex-1 h-[49px] flex items-center">
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
        <p className="mt-[26px] text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
          {formatTime(duration)}
        </p>
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

export default MobileMusicCard;
