type PieChartProps = {
  value1: number;
  value2: number;
};

const PieChart = ({ value1, value2 }: PieChartProps) => {
  const radius = 40; // Radius of the pie chart
  const strokeWidth = 20; // Width of the pie chart's stroke (this creates the pie chart look)
  // const circleLength = 2 * Math.PI * radius;
  // const offset1 = (circleLength * value1) / 100;
  // const offset2 = (circleLength * value2) / 100;

  // Create the arc for the first value (this is the 'slice' of the pie for value1)
  const arc1 = `M ${radius} ${strokeWidth / 2} 
                L ${radius} 0 
                A ${radius} ${radius} 0 ${value1 > 50 ? 1 : 0} 1 
                ${radius + radius * Math.sin((Math.PI * 2 * value1) / 100)} 
                ${radius - radius * Math.cos((Math.PI * 2 * value1) / 100)} 
                Z`;

  // Create the arc for the second value (this is the 'slice' of the pie for value2)
  const arc2 = `M ${radius} ${strokeWidth / 2} 
                L ${radius} 0 
                A ${radius} ${radius} 0 ${value2 > 50 ? 1 : 0} 1 
                ${
                  radius +
                  radius * Math.sin((Math.PI * 2 * (value1 + value2)) / 100)
                } 
                ${
                  radius -
                  radius * Math.cos((Math.PI * 2 * (value1 + value2)) / 100)
                } 
                Z`;

  return (
    <div className="relative flex justify-center items-center">
      <svg
        width={radius * 2}
        height={radius * 2}
        className="transform rotate-90"
      >
        {/* Background circle (remaining part) */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="#ddd"
          strokeWidth={strokeWidth}
        />
        {/* First slice of the pie chart */}
        <path d={arc1} fill="#3498db" />
        {/* Second slice of the pie chart */}
        <path d={arc2} fill="#e74c3c" />
      </svg>

      {/* Percentage text inside the pie */}
      <div className="absolute text-center text-xl font-semibold text-white">
        {value1}% / {value2}%
      </div>
    </div>
  );
};

export default PieChart;
