import Image from "next/image";
import React from "react";

const MusicCard = ({ isPlaying = true }) => {
  return (
    <div
      className={`w-full max-w-[343px] lg:max-w-[654px] min-h-[197px] lg:min-h-[240px] rounded-xl p-2 
        shadow-[0px_-2px_22.5px_0px_rgba(0,0,0,0.12)] bg-white 
    ${isPlaying ? "border-[3px] border-[#E44615]" : "border-none"}`}
    >
      <div className="w-full flex items-center gap-2">
        <Image
          src="/assets/images/card-1.svg"
          alt="card"
          width={224}
          height={224}
          className="rounded-[4px] w-[224px] h-[224px]"
        />
        {/* Card Details */}
        <div className="w-full flex flex-col py-[17px] pr-[14px]">
          {/* header */}
          <div className="w-full flex items-center justify-between mb-3">
            <h2 className="w-full min-w-[180px] text-[20px] font-archivo font-semibold leading-[1.15] text-[#0A1113]">
              Don't Stop Believin'
            </h2>
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
              {"00:19"}
            </p>
            {/* music bars */}
            <div className="w-full max-w-[290px] flex gap-[2px] mt-[3px]">
              {Array.from({ length: 50 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[2px] bg-[#E44615]"
                  style={{
                    height: "33px",
                  }}
                />
              ))}
              {Array.from({ length: 30 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[2px] bg-[#E7E7E7]"
                  style={{
                    height: "33px",
                  }}
                />
              ))}
            </div>
            <p className="mt-5 text-[14px] font-archivo font-[500] leading-[1.15] text-[#0A1113]">
              {"3:19"}
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
              <button className="cursor-pointer w-12 h-12 rounded-xl p-[14px] bg-[#11252A]  flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
