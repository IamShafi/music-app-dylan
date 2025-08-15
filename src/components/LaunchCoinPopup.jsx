import React from "react";

const LaunchCoinPopup = () => {
  return (
    <div className="w-full max-w-[343px] lg:max-w-[600px] h-[762px] lg:h-[656px] overloflow-y-scroll bg-white rounded-xl py-2.5 px-4 lg:px-[24px] lg:py-[14px] relative">
      {/* header */}
      <div className="w-full flex items-center justify-between mb-4 lg:mb-5">
        <p className="text-[16px] font-archivo font-[400] leading-[1.15] text-[#020304]">
          Launch a coin
        </p>
        <button className="w-8 h-8 flex items-center justify-center cursor-pointer">
          <img src="/assets/icons/close.svg" alt="close" className="w-5 h-5" />
        </button>
      </div>
      {/* name - ticker */}
      <div className="w-full flex items-center gap-3 lg:gap-5 mb-4 lg:mb-5">
        <div className="w-full max-w-[388px] flex flex-col gap-2">
          <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
            Name
          </p>
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-[179px] lg:max-w-[388px] py-[15px] px-4 text-[16px] font-archivo font-regular font-[400] leading-[1.15] text-[#9DA0A1] bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#E44615] focus:border-transparent"
          />
        </div>
        <div className="w-full max-w-[120px] lg:max-w-[144px] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
              Ticker
            </p>
            <img src="/assets/icons/info.svg" alt="info" className="w-6 h-6" />
          </div>
          <button className="w-full max-w-[120px] lg:max-w-[144px] h-[48px] rounded-[12px] bg-[#FCEDE8] p-[15px] text-[16px] font-archivo font-[400] leading-[1.15] text-[#E44615]">
            VIBES
          </button>
        </div>
      </div>
      {/* description */}
      <div className="w-full flex flex-col gap-2 mb-4 lg:mb-5">
        <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
          Name
        </p>
        <input
          type="textarea"
          placeholder="What does your track feel like? Describe the vibe — sad, upbeat, chill, nostalgic, etc."
          className="w-full h-[120px] py-[14px] px-4 text-[16px] font-archivo font-regular font-[400] leading-[1.15] text-[#9DA0A1] bg-white rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>
      {/* link */}
      <div className="w-full flex flex-col gap-2 mb-4 lg:mb-5">
        <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
          Website <span className="text-[#6C7071]">(Optional)</span>
        </p>
        <input
          type="text"
          placeholder="https://www.google.com/"
          className="w-full h-[48px] py-[15px] px-4 text-[16px] font-archivo font-regular font-[400] leading-[1.15] text-[#9DA0A1] bg-white rounded-xl border border-gray-200 focus:outline-none"
        />
      </div>
      {/* Upload */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-5 mb-4 lg:mb-5">
        <div className="w-full flex flex-col gap-2 lg:max-w-[266px]">
          <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
            Sound
          </p>
          <button className="w-full max-w-[311px] lg:max-w-[266px] h-[96px] bg-[#F5F5F5] rounded-xl border-[2px] border-dashed border-[#E7E7E7] flex items-center justify-center cursor-pointer p-10">
            <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#6C7071]">
              Upload the sound here
            </p>
          </button>
        </div>
        <div className="w-full flex flex-col gap-2 lg:max-w-[266px]">
          <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#3B4142]">
            Image <span className="text-[#6C7071]">(Optional)</span>
          </p>
          <button className="w-full max-w-[311px] lg:max-w-[266px] h-[96px] bg-[#F5F5F5] rounded-xl border-[2px] border-dashed border-[#E7E7E7] flex items-center justify-center cursor-pointer p-10">
            <p className="text-[14px] font-archivo font-[400] leading-[1.25] text-[#6C7071]">
              Upload the image
            </p>
          </button>
        </div>
      </div>
      {/* Submit */}
      <button className="cursor-pointer w-full h-[54px] rounded-[12px] bg-[#E44615] p-[18px] flex items-center justify-center text-[16px] font-archivo font-[500] leading-[1.15] text-white mb-5 lg:mb-6">
        Lanch a coin
      </button>
    </div>
  );
};

export default LaunchCoinPopup;
