type BarProps = {
  hValue: number;
  aValue: number;
};

const RoundedBar = ({ hValue, aValue }: BarProps) => {
  return (
    <div className="w-full flex items-center gap-3">
      <DonutBar value={hValue} />
      <p className="text-center font-mono capitalize text-xs">
        successful tackles
      </p>
      <DonutBar away={true} value={aValue} />
    </div>
  );
};

export default RoundedBar;

type DonutProps = {
  value: number;
  away?: boolean;
};

const DonutBar = ({ value, away }: DonutProps) => {
  const radius = 40; // Radius of the donut chart
  const strokeWidth = 7; // Width of the donut's stroke
  const circleLength = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circleLength - (circleLength * value) / 100; // Offset for the stroke

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
        <div className="text-xs">248 tackles</div>
        <div className="text-center text-sm">{value}%</div>
      </div>
    </div>
  );
};
