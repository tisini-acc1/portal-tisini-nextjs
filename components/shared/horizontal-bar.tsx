import React from "react";

type BarProps = {
  hValue: string;
  aValue: string;
  stat: string;
};

const HorizontalBar = ({ hValue, aValue, stat }: BarProps) => {
  // Ensure percentages add up to 100
  const total = parseInt(hValue) + parseInt(aValue);

  const hPercent = Math.floor((parseInt(hValue) / total) * 100);

  const team1Width = `${hPercent}%`;
  const team2Width = `${100 - hPercent}%`;

  // Combine the two team's colors into a linear gradient for the background
  const gradientBackground = `linear-gradient(to right, #3498db ${team1Width}, #e74c3c ${team1Width} ${team2Width})`;

  if (hValue === "0" && aValue === "0") {
    return (
      <div>
        <p className="text-center text-xs capitalize font-mono">{stat}</p>
        <div className="bg-gray-300 h-5 rounded-full relative">
          <div className="flex justify-between items-center absolute inset-0 text-white w-full px-2 text-xs">
            <p>0</p>
            <p>0</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-center text-xs capitalize font-mono">{stat}</p>
      <div className="relative h-5 rounded-full overflow-hidden">
        {/* Single bar with gradient background */}
        <div
          className="w-full h-full"
          style={{
            background: gradientBackground,
          }}
        />
        {/* Optional: Add labels inside the bar */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          <span className="text-xs text-white font-medium">{hValue}</span>
          <span className="text-xs text-white font-medium">{aValue}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBar;
