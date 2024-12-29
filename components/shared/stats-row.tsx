type RowProps = {
  hValue: string;
  aValue: string;
  stat: string;
};

const StatsRow = ({ hValue, stat, aValue }: RowProps) => {
  return (
    <div className="w-full flex justify-center items-center bg-gray-50 font-mono">
      <div className="bg-[#3498db] px-3 py-1 text-xs font-semibold text-white rounded-sm">
        {hValue}
      </div>
      <div className="w-4/5 text-center text-xs whitespace-nowrap overflow-ellipsis capitalize">
        {stat}
      </div>
      <div className="bg-[#e74c3c] px-3 py-1 text-xs font-semibold text-white rounded-sm">
        {aValue}
      </div>
    </div>
  );
};

export default StatsRow;
