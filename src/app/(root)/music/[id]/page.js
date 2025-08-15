"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MusicBars = ({
  progress = 0,
  totalDuration = 100,
  isPlaying = false,
}) => {
  const totalBars = 84;

  // Calculate how many bars should be active based on progress
  const activeBars = Math.floor((progress / totalDuration) * totalBars);

  // Generate consistent heights for the bars to create a more realistic waveform effect
  const generateBarHeight = (index) => {
    // Create a more natural waveform pattern using sine waves
    const baseHeight = 166;
    const wave1 = Math.sin(index * 0.2) * 6;
    const wave2 = Math.sin(index * 0.5) * 3;
    const wave3 = Math.sin(index * 0.8) * 2;
    const totalVariation = wave1 + wave2 + wave3;
    return Math.max(8, Math.min(40, baseHeight + totalVariation));
  };

  return (
    <div className="w-full flex gap-[6.7px] items-end  overflow-hidden">
      {Array.from({ length: totalBars }).map((_, index) => {
        const isActive = index < activeBars;
        const barHeight = generateBarHeight(index);

        return (
          <div
            key={index}
            className={`w-[4px] rounded-t-[16px] transition-all duration-300 ease-in-out ${
              isActive ? "bg-[#E44615]" : "bg-[#FFC3B0]"
            }`}
            style={{
              height: `${barHeight}px`,
              opacity: isActive ? 1 : 0.6,
            }}
          />
        );
      })}
    </div>
  );
};

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
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
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col xl:flex-row items-center gap-[24px] lg:gap-[32px]">
        <div className="w-full max-w-[881px] flex flex-col gap-10 lg:gap-[84px]">
          <div className="w-full flex items-center gap-3 lg:gap-6">
            {/* play / pause button */}
            <button
              // onClick={onPlayPause}
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
            {/* text */}
            <div className="w-full max-w-[705px] flex flex-col gap-[6px]">
              <div className="flex items-center gap-2 lg:gap-4">
                <h2 className="min-w-[147px] text-[20px] lg:text-[32px] font-archivo font-semibold leading-[1.10] text-[#111111]">
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
                src="/assets/icons/heart-red.svg"
                alt="heart"
                className="w-5 lg:w-[24px] h-5 lg:h-[24px]"
              />
            </div>
          </div>
          {/* music box */}
          <div className="w-full h-[155px] lg:h-[206px] flex-1 gap-8 lg:gap-[14px]">
            {/* music bar */}
            <div className="w-full h-[134px] lg:h-[174px]">
              <MusicBars
                progress={progress}
                totalDuration={totalDuration}
                isPlaying={isPlaying}
              />
            </div>
            {/* duration */}
            <div className="w-full flex items-center justify-between">
              <p className="min-w-[37px] h-[13px] text-[12px] lg:text-[14px] font-archivo font-[400] leading-[1.1] text-[#0A1113]">
                00:19
              </p>
              <p className="min-w-[37px] h-[13px] text-[12px] lg:text-[14px] font-archivo font-[400] leading-[1.1] text-[#0A1113]">
                02:19
              </p>
            </div>
          </div>
        </div>
        <Image
          src="/assets/images/card-2.svg"
          alt="card"
          width={415}
          height={362}
          className="w-[343px] h-[219px] lg:w-[415px] lg:h-[362px] rounded-xl"
        />
      </div>
    </div>
  );
};

export default MusicPage;
