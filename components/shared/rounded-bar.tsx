type BarProps = {
  hValue: number;
  aValue: number;
  hPercent: number;
  aPercent: number;
  stat: string;
};

const RoundedBar = ({ hValue, aValue, hPercent, aPercent, stat }: BarProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <DonutBar value={hValue} percent={hPercent} />
      <p className="text-center font-mono capitalize text-xs">{stat}</p>
      <DonutBar away={true} value={aValue} percent={aPercent} />
    </div>
  );
};

export default RoundedBar;

type DonutProps = {
  value: number;
  percent: number;
  away?: boolean;
};

const DonutBar = ({ value, percent, away }: DonutProps) => {
  const radius = 40; // Radius of the donut chart
  const strokeWidth = 7; // Width of the donut's stroke
  const circleLength = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circleLength - (circleLength * percent) / 100; // Offset for the stroke

  return (
    <div className="relative flex justify-center items-center">
      <svg
        width={radius * 2}
        height={radius * 2}
        className="transform rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#ddd"
          strokeWidth={strokeWidth}
        />
        {/* Foreground circle for the value */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={away ? "#e74c3c" : "#3498db"}
          strokeWidth={strokeWidth}
          strokeDasharray={circleLength}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>

      {/* Percentage text inside the donut */}
      <div className="absolute flex flex-col text-black">
        <div className="text-xs">{value} tackles</div>
        <div className="text-center text-sm">{percent}%</div>
      </div>
    </div>
  );
};
