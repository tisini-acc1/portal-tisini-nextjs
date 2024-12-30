type BarProps = {
  hValue: number;
  hTotal: number;
  aValue: number;
  aTotal: number;
  hPercent: number;
  aPercent: number;
  stat: string;
};

const RoundedBar = ({ hValue, aValue, hTotal, aTotal, stat }: BarProps) => {
  const hPercent = Math.floor((hValue / hTotal) * 100);
  const aPercent = Math.floor((aValue / aTotal) * 100);

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <DonutBar value={hValue} percent={hPercent} total={hTotal} />
      <p className="text-center font-mono capitalize text-xs">{stat}</p>
      <DonutBar away={true} value={aValue} percent={aPercent} total={aTotal} />
    </div>
  );
};

export default RoundedBar;

type DonutProps = {
  value: number;
  total: number;
  percent: number;
  away?: boolean;
};

const DonutBar = ({ value, total, percent, away }: DonutProps) => {
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
        <div className="text-center text-sm font-medium">{percent}%</div>
        <div className="text-xs text-center">
          {value}/{total}
        </div>
      </div>
    </div>
  );
};
