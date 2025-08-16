import React from "react";
import Image from "next/image";

const DesktopFooter = ({ isPlaying = false, isFavorite=false }) => {
  return (
    <div className="hidden lg:flex w-full max-w-[1440px] py-[15px] items-center justify-between gap-[48px]">
      <div className="w-full max-w-[368px] flex items-center justify-between">
        <Image
          src="/assets/images/user-2.svg"
          alt="user"
          width={56}
          height={56}
          className="w-[56px] h-[56px] rounded-xl"
        />
        <div className="w-full max-w-[260px] py-[10.5px] flex flex-col gap-1">
          <h2 className="w-full text-[16px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
            Bass loop
          </h2>
          <p className="w-full text-[12px] font-archivo font-[400] leading-[1.15] text-[#6C7071]">
            Robert Fox
          </p>
        </div>
        <div className="w-[36px] h-[36px] flex items-center justify-center rounded-xl bg-white cursor-pointer">
          <Image
            src={isFavorite ? "/assets/icons/heart-red.svg" : "/assets/icons/heart.svg"}
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
        </div>
      </div>

      <div className="w-full max-w-[575px] flex flex-col gap-2">
        <div className="w-full flex items-center justify-center">
          {/* play / pause button */}
          <button
            // onClick={onPlayPause}
            className="cursor-pointer w-12 h-12  rounded-xl p-[14px] bg-[#11252A] flex items-center justify-center"
          >
            <Image
              src={
                isPlaying ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"
              }
              alt="pause/play"
              width={20}
              height={20}
              className="w-5 h-5 "
            />
          </button>
        </div>
        <div className="w-full px-[15px] flex items-center justify-between gap-[10px]">
          <p className="min-w-[33px] text-[12px] font-archivo font-[400] leading-[1.15] text-[#020304]">
            {"00:19"}
          </p>
          {/* progress */}
          <div className="w-full max-w-[460px] h-1 bg-[#CECFD0]"></div>
          <p className="min-w-[33px] text-[12px] font-archivo font-[400] leading-[1.15] text-[#020304]">
            {"02:19"}
          </p>
        </div>
      </div>

      <div className="w-full max-w-[368px] flex items-center justify-end">
        <div className="w-full max-w-[141] h-10 flex items-center gap-[8px] py-2">
          <Image
            src="/assets/icons/volume-2.svg"
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px]  cursor-pointer"
          />
          <div className="w-full max-w-[93px] h-1 bg-[#CECFD0]  cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

const MobileFooter = ({ isPlaying = false, isFavorite=true }) => {
  return (
    <div className="block lg:hidden w-full py-4">
      <div className="w-full flex items-center justify-between mb-2">
        <div className="w-full max-w-[102px] flex items-center gap-1.5">
          {/* play / pause button */}
          <button
            // onClick={onPlayPause}
            className="cursor-pointer w-12 h-12  rounded-xl p-[14px] bg-[#11252A] flex items-center justify-center"
          >
            <Image
              src={
                isPlaying ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"
              }
              alt="pause/play"
              width={20}
              height={20}
              className="w-5 h-5 "
            />
          </button>
          {/* favorite */}
          <button className="cursor-pointer w-11 h-11 rounded-xl p-[12px] bg-[#E7E9EA] flex items-center justify-center">
            <Image
              src={isFavorite ? "/assets/icons/heart-red.svg" : "/assets/icons/heart.svg"}
              alt="heart"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        </div>
        {/* sound */}
        <div className="cursor-pointer w-10 h-10 flex items-center justify-center">
          <Image
            src="/assets/icons/volume-2.svg"
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-[2px]">
        {/* progress */}
        <div className="w-full h-1 bg-[#CECFD0] cursor-pointer"></div>
        {/* durations */}
        <div className="w-full flex items-center justify-between mb-3">
          <p className="min-w-[33px] text-[12px] font-archivo font-[400] leading-[1.15] text-[#020304]">
            {"00:19"}
          </p>
          <p className="min-w-[33px] text-[12px] font-archivo font-[400] leading-[1.15] text-[#020304]">
            {"02:19"}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <Image
            src="/assets/images/user-2.svg"
            alt=""
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
          <h2 className="text-[14px] font-archivo font-[500] leading-[1.25] text-[#0A1113]">
            Bass loop
          </h2>
        </div>
        <p className="min-w-[60px] text-[12px] font-archivo font-[400] leading-[1.15] text-[#6C7071]">
          Robert Fox
        </p>
      </div>
    </div>
  );
};
const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <DesktopFooter />
      <MobileFooter />
    </div>
  );
};

export default Footer;
