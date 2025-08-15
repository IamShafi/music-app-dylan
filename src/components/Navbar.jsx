import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white flex items-center justify-center px-[16px] lg:px[56px] py-[12px] lg:py-[24px]">
      <div className="w-full max-w-[1328px] flex flex-row gap-[135px] items-center justify-between">
        <Image
          src="/assets/icons/Logo.svg"
          alt="nav logo"
          width={176}
          height={32}
          className="w-[110px] h-[20px] lg:w-[176px] lg:h-[32px]"
        />
        <button className="w-[92px] h-[46px] rounded-[12px] bg-[#FCEDE8] p-[14px] flex items-center justify-center text-[16px] font-archivo font-[400] leading-[1.15] text-[#E44615]">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
