'use client'
import React, { useState } from "react";
import Image from "next/image";
import LaunchCoinPopup from "@/components/LaunchCoinPopup";

const CoinHeader = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <button 
          onClick={openPopup}
          className="cursor-pointer w-[139px] h-[54px] rounded-[12px] bg-[#E44615] p-[18px] flex items-center justify-center text-[16px] font-archivo font-[500] leading-[1.15] text-white mb-5 lg:mb-6"
        >
          Lanch a coin
        </button>
        {/* Search sort container */}
        <div className="w-full max-w-[510px] h-[48px] flex items-center gap-3 lg:gap-[20px] mb-5 lg:mb-8">
          {/* Search Button */}
          <div className="relative w-full max-w-[400px] min-w-[241px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-[14px] pl-12 pr-4 text-[16px] font-archivo font-regular font-[400] leading-[1.15] text-[#9DA0A1] bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E44615] focus:border-transparent"
            />
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
          </div>
          {/* Sort Button */}
          <button className="cursor-pointer w-[90px] rounded-xl bg-white flex items-center justify-center p-[14px]">
            <div className="flex items-center gap-2">
              <p className="text-[16px] font-archivo font-regular font-[400] leading-[1.15] text-[#3B4142]">
                Sort
              </p>
              <img
                src="/assets/icons/chevron-down.svg"
                alt="arrow down"
                className="w-5 h-5"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Popup Modal with Backdrop */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#060A0B47] backdrop-blur-[24px]"
            onClick={closePopup}
          ></div>
          
          {/* Modal */}
          <div className="relative z-10">
            <LaunchCoinPopup onClose={closePopup} />
          </div>
        </div>
      )}
    </>
  );
};

export default CoinHeader;
