type Props = {
  players: TeamPlayer[];
  selectedRows: Set<string>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export function SelectStartingPlayer({
  players,
  selectedRows,
  setSelectedRows,
}: Props) {
  const toggleRowSelection = (id: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const isRowSelected = (id: string) => selectedRows.has(id);
  console.log(selectedRows);
  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.size === players.length}
                  onChange={() => {
                    if (selectedRows.size === players.length) {
                      setSelectedRows(new Set());
                    } else {
                      setSelectedRows(new Set(players.map((item) => item.id)));
                    }
                  }}
                  className="form-checkbox"
                />
              </th>
              <th className="px-4 py-2 text-left">Player Name</th>
              <th className="px-4 py-2 text-left">Date of Birth</th>
              <th className="px-4 py-2 text-left">Nationality</th>
              <th className="px-4 py-2 text-left">Jersey No.</th>
              <th className="px-4 py-2 text-left">Signed Date</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                className={isRowSelected(player.id) ? "bg-blue-50" : ""}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isRowSelected(player.id)}
                    onChange={() => toggleRowSelection(player.id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="px-4 py-2">{player.pname}</td>
                <td className="px-4 py-2">{player.dob}</td>
                <td className="px-4 py-2">{player.nationality}</td>
                <td className="px-4 py-2">{player.current_jersey_no}</td>
                <td className="px-4 py-2">{player.signed_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <span>{selectedRows.size} player(s) selected</span>
      </div>
    </div>
  );
}
