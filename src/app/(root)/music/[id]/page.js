"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(1);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);

  // Initialize wavesurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "rgb(255, 195, 176)",
        progressColor: "rgb(233, 107, 68)",
        cursorColor: "rgb(233, 107, 68)",
        barWidth: 4,
        barGap: 6,
        barRadius: 34,
        height: 174,
        url: "/musics/Delicate Weapon.mp3",
        responsive: true,
        normalize: true,
        interact: true,
        hideScrollbar: true,
        fillParent: true,
        barMinHeight: 2,
        barMaxHeight: 40,
        cursorWidth: 2,
        autoCenter: true,
        autoScroll: true,
      });

      wavesurferRef.current = wavesurfer;

      // Set up event listeners
      wavesurfer.on("ready", () => {
        setDuration(wavesurfer.getDuration());
        setIsLoading(false);
        setError(null);
        // console.log("WaveSurfer is ready");
      });

      wavesurfer.on("audioprocess", () => {
        setCurrentTime(wavesurfer.getCurrentTime());
        setProgress(wavesurfer.getCurrentTime());
      });

      wavesurfer.on("finish", () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      });

      wavesurfer.on("seek", (progress) => {
        setProgress(progress * wavesurfer.getDuration());
        setCurrentTime(progress * wavesurfer.getDuration());
      });

      wavesurfer.on("error", (error) => {
        console.error("WaveSurfer error:", error);
        setError("Failed to load audio file");
        setIsLoading(false);
      });

      wavesurfer.on("loading", (percent) => {
        setIsLoading(true);
      });

      // Add click-to-seek functionality
      wavesurfer.on("click", (position) => {
        const seekTime = position * wavesurfer.getDuration();
        wavesurfer.seekTo(position);
        setCurrentTime(seekTime);
        setProgress(seekTime);
      });

      // Add hover functionality for time display
      // wavesurfer.on("interaction", (position) => {
      //   const hoverTime = position * wavesurfer.getDuration();
      //   // You can add a tooltip here to show the hover time
      // });

      // Add play/pause state sync
      wavesurfer.on("play", () => {
        setIsPlaying(true);
      });

      wavesurfer.on("pause", () => {
        setIsPlaying(false);
      });

      // Cleanup function
      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
          wavesurferRef.current = null;
        }
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
      setVolume(newVolume);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full flex flex-col mb-10">
      <div className="w-full flex flex-col xl:flex-row items-center gap-[24px] lg:gap-[32px] mb-6 lg:mb-8">
        <div className="w-full max-w-[881px] flex flex-col gap-10 lg:gap-[84px]">
          <div className="w-full flex items-center gap-3 lg:gap-6 mb-10 lg:mb-0">
            {/* play / pause button */}
            <button
              onClick={handlePlayPause}
              className="cursor-pointer w-12 lg:w-[72px] h-12 lg:h-[72px] rounded-xl p-[14px] bg-[#11252A]  flex items-center justify-center"
            >
              <Image
                src={
                  isPlaying
                    ? "/assets/icons/pause.svg"
                    : "/assets/icons/play.svg"
                }
                alt="pause/play"
                width={32}
                height={32}
                className="w-5 lg:w-8 h-5 lg:h-8"
              />
            </button>
            {/* volume control */}
            {/* <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/volume-2.svg"
                alt="volume"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-[#CECFD0] rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #0A1113 0%, #0A1113 ${volume * 100}%, #CECFD0 ${volume * 100}%, #CECFD0 100%)`
                }}
              />
            </div> */}
            {/* text */}
            <div className="w-full max-w-[705px] flex flex-col gap-[6px]">
              <div className="flex items-center gap-2 lg:gap-4">
                <h2 className="min-w-[92px] lg:min-w-[147px] text-[20px] lg:text-[32px] font-archivo font-semibold leading-[1.10] text-[#111111]">
                  Bass loop
                </h2>
                <div className="w-[66px] h-[26px] lg:h-[30px] bg-[#FDF4F1] rounded-[8px] p-1.5 flex items-center justify-center font-[400] text-[14px] text-[#E96B44]">
                  VIBES
                </div>
              </div>
              {/* hour ago */}
              <p className="text-[12px] lg:text-[14px] font-archivo font-[400] leading-[1.1] text-[#3B4142]">
                {"1 hour ago"}
              </p>
            </div>
            {/* favorite */}
            <div className="w-12 h-12 lg:w-[56px] lg:h-[56px] rounded-xl bg-white flex items-center justify-center">
              <img
                src={
                  isFavorite
                    ? "/assets/icons/heart-red.svg"
                    : "/assets/icons/heart.svg"
                }
                alt=""
                className="w-5 lg:w-[24px] h-5 lg:h-[24px]"
              />
            </div>
          </div>
          {/* music box */}
          <div className="w-full h-[155px] lg:h-[206px] flex-1 gap-8 lg:gap-[14px]">
            {/* music bar */}
            <div className="w-full flex gap-1.5 items-end h-[134px] lg:h-[174px]">
              {/* wavesurfer.js implementation */}
              {isLoading && !error && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-[#E96B44] text-sm">
                    Loading waveform...
                  </div>
                </div>
              )}
              {error && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-red-500 text-sm">{error}</div>
                </div>
              )}
              <div
                ref={waveformRef}
                className="w-full h-full"
                style={{
                  minHeight: "174px",
                  display: isLoading || error ? "none" : "block",
                }}
              />
            </div>
            {/* duration */}
            <div className="w-full flex items-center justify-between">
              <p className="min-w-[37px] h-[13px] text-[12px] lg:text-[14px] font-archivo font-[400] leading-[1.1] text-[#0A1113]">
                {formatTime(currentTime)}
              </p>
              {/* progress bar */}
              {/* <div
                className="w-full max-w-[800px] h-2 bg-[#FFC3B0] rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  if (wavesurferRef.current && duration > 0) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickPercent = clickX / rect.width;
                    const seekTime = clickPercent * duration;
                    wavesurferRef.current.seekTo(clickPercent);
                    setCurrentTime(seekTime);
                    setProgress(seekTime);
                  }
                }}
              >
                <div
                  className="h-full bg-[#E96B44] rounded-full transition-all duration-100 ease-out"
                  style={{
                    width: `${
                      duration > 0 ? (currentTime / duration) * 100 : 0
                    }%`,
                  }}
                />
              </div> */}
              <p className="min-w-[37px] h-[13px] text-[12px] lg:text-[14px] font-archivo font-[400] leading-[1.1] text-[#0A1113]">
                {formatTime(duration)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[343px] h-[219px] lg:w-[415px] lg:h-[362px] rounded-xl">
          <Image
            src="/assets/images/card-2.svg"
            alt="card"
            width={415}
            height={362}
            className="w-[343px] h-[219px] lg:w-[415px] lg:h-[362px] rounded-xl object-cover"
          />
        </div>
      </div>
      {/*  */}
      <div className="w-full flex flex-col xl:flex-row items-center gap-[24px] lg:gap-[32px]">
        <div
          className="w-full max-w-[881px] rounded-xl flex flex-col p-[12px] lg:px-5 lg:py-3"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.44)",
          }}
        >
          {/* mcap */}
          <div className="w-full h-[66px] border-b border-[#CECFD0] flex items-center justify-between">
            <div className="min-w-[65px] flex items-center gap-1.5">
              <Image
                src="/assets/icons/globe.svg"
                alt=""
                width={18}
                height={18}
                className="w-4.5 h-4.5"
              />
              <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#575959]">
                MCAP
              </p>
            </div>
            <h2 className="text-[24px] font-archivo font-[400] leading-[1.15] text-[#040708]">
              $4K
            </h2>
          </div>
          {/* royalties */}
          <div className="w-full h-[66px] border-b border-[#CECFD0] flex items-center justify-between">
            <div className="min-w-[65px] flex items-center gap-1.5">
              <Image
                src="/assets/icons/tag.svg"
                alt="tag"
                width={18}
                height={18}
                className="w-4.5 h-4.5"
              />
              <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#575959]">
                Royalitites
              </p>
            </div>
            <h2 className="text-[24px] font-archivo font-[400] leading-[1.15] text-[#040708]">
              5%
            </h2>
          </div>
          {/* shopping-cart */}
          <div className="w-full h-[66px] border-b border-[#CECFD0] flex items-center justify-between">
            <div className="min-w-[65px] flex items-center gap-1.5">
              <Image
                src="/assets/icons/shopping-cart.svg"
                alt=""
                width={18}
                height={18}
                className="w-4.5 h-4.5"
              />
              <p className="min-w-[96px]text-[14px] font-archivo font-[400] leading-[1.25] text-[#575959]">
                Price
              </p>
            </div>
            <h2 className="text-[24px] font-archivo font-[400] leading-[1.15] text-[#040708]">
              $150
            </h2>
          </div>

          {/* building-2.svg */}
          <div className="w-full h-[66px] border-b border-[#CECFD0] flex items-center justify-between">
            <div className="min-w-[65px] flex items-center gap-1.5">
              <Image
                src="/assets/icons/building-2.svg"
                alt=""
                width={18}
                height={18}
                className="w-4.5 h-4.5"
              />
              <p className="min-w-[96px] text-[14px] font-archivo font-[400] leading-[1.25] text-[#575959]">
                Contract address
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="overflow-hidden text-ellipsis w-[156px] lg:w-[375px] text-[16px] font-archivo font-[400] leading-[1.15] text-[#040708]">
                0x5B3eD4E3d896dDaF2BbFAD49C7A16f40A51B4Af1
              </p>
              <Image
                src={"/assets/icons/copy-2.svg"}
                alt=""
                width={18}
                height={18}
                className="w-4.5 h-4.5 cursor-pointer "
              />
            </div>
          </div>

          {/* web link */}
          <div className="w-full h-[66px] border-b border-[#CECFD0] flex items-center justify-between">
            <div className="min-w-[65px] flex items-center gap-1.5">
              <Image
                src="/assets/icons/link-2.svg"
                alt=""
                width={18}
                height={18}
                className="w-4.5 h-4.5"
              />
              <p className="min-w-[96px] text-[14px] font-archivo font-[400] leading-[1.25] text-[#575959]">
                Web link
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="overflow-hidden text-ellipsismin-w-[156px] lg:min-w-[176px] text-[16px] font-archivo font-[400] leading-[1.15] text-[#040708]">
                https://www.google.com
              </p>
              <Image
                src={"/assets/icons/copy-2.svg"}
                alt="heart"
                width={18}
                height={18}
                className="w-4.5 h-4.5 cursor-pointer "
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full max-w-[415px] flex flex-col gap-6">
          <div
            className="w-full max-w-[415px] h-[68px] lg:h-[126px] rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.44)",
            }}
          >
            <div className="flex items-center gap-[10px]">
              <Image
                src={"/assets/icons/user.svg"}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-[16px] font-[500] leading-[1.15] text-[#040708]">
                Robert Fox
              </p>
            </div>
          </div>
          {/*  */}
          <div className="w-full max-w-[415px] flex flex-col gap-3">
            <div className="cursor-pointer w-full h-[56px] rounded-xl bg-[#040708] flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/Logo_Axiom.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <p className="text-[16px] font-[400] leading-[1.15] text-[#FFFFFF]">
                  Buy on Axiom
                </p>
              </div>
            </div>

            <div className="cursor-pointer w-full h-[56px] rounded-xl bg-[#040708] flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/Logo_Jupiter.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <p className="text-[16px] font-[400] leading-[1.15] text-[#FFFFFF]">
                  Buy on Jupiter
                </p>
              </div>
            </div>

            <div className="cursor-pointer w-full h-[56px] rounded-xl bg-[#040708] flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/icons/Logo_photon.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <p className="text-[16px] font-[400] leading-[1.15] text-[#FFFFFF]">
                  Buy on Photon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
