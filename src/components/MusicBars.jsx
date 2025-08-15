import React from "react";

const MusicBars = ({ progress = 0, totalDuration = 100, isPlaying = false }) => {
  const totalBars = 72;
  
  // Calculate how many bars should be active based on progress
  const activeBars = Math.floor((progress / totalDuration) * totalBars);
  
  // Generate consistent heights for the bars to create a more realistic waveform effect
  const generateBarHeight = (index) => {
    // Create a more natural waveform pattern using sine waves
    const baseHeight = 20;
    const wave1 = Math.sin(index * 0.2) * 6;
    const wave2 = Math.sin(index * 0.5) * 3;
    const wave3 = Math.sin(index * 0.8) * 2;
    const totalVariation = wave1 + wave2 + wave3;
    return Math.max(8, Math.min(40, baseHeight + totalVariation));
  };

  return (
    <div className="w-full max-w-[290px] flex gap-[2px] mt-[3px] items-end">
      {Array.from({ length: totalBars }).map((_, index) => {
        const isActive = index < activeBars;
        const barHeight = generateBarHeight(index);
        
        return (
          <div
            key={index}
            className={`w-[2px] rounded-t-[16px] transition-all duration-300 ease-in-out ${
              isActive 
                ? "bg-[#E44615]" 
                : "bg-[#E7E7E7]"
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

export default MusicBars;
