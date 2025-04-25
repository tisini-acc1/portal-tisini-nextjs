export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

export function StatBar({ name, data }: { name: string; data: string }) {
  // Parse the data string
  const parts = data.split(/\s+/);
  const attempted = parseInt(parts[0]);
  const successful = parseInt(parts[2]);
  const percentage = parts[3];

  // Calculate widths
  const successWidth = (successful / attempted) * 100;
  const missedWidth = 100 - successWidth;

  return (
    <div className="my-4 relative">
      <div className="text-center mt-1 font-medium text-xs text-gray-600 dark:text-gray-300">
        {name} {percentage}
      </div>

      <div className="flex gap-1">
        <span className="">{successful}</span>
        <div className="flex w-11/12 h-6 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
          <div
            className={"bg-blue-500"}
            style={{ width: `${successWidth}%` }}
            title={`Successful: ${successful}`}
          ></div>
          <div
            className={"bg-gray-200"}
            style={{ width: `${missedWidth}%` }}
            title={`Missed: ${attempted - successful}`}
          ></div>
        </div>
        <span className="text-gray-600 dark:text-gray-300">{attempted}</span>
      </div>
    </div>
  );
}
