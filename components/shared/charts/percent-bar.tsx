import React from "react";

type BarProps = {
  hValue: string;
  aValue: string;
  stat: string;
};

const PercentBar = ({ hValue, aValue, stat }: BarProps) => {
  // Ensure percentages add up to 100
  const team1Width = `${hValue}%`;
  const team2Width = `${aValue}%`;

  // Combine the two team's colors into a linear gradient for the background
  const gradientBackground = `linear-gradient(to right, #3498db ${team1Width}, #e74c3c ${team1Width} ${team2Width})`;

  return (
    <div className="flex flex-col w-full">
      <p className="text-center text-xs capitalize font-mono">{stat} %</p>
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

export default PercentBar;
