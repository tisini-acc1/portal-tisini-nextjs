import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface SelectSubPlayerProps {
  players: Player[];
  selectedSubs: Set<string>;
  setSelectedSubs: React.Dispatch<React.SetStateAction<Set<string>>>;
  onSubmit: () => void;
}

export const SelectSubPlayer: FC<SelectSubPlayerProps> = ({
  players,
  selectedSubs,
  setSelectedSubs,
  onSubmit,
}) => {
  // Function to toggle selection for a player
  const togglePlayerSelection = (id: string) => {
    const newSelectedSubs = new Set(selectedSubs);
    if (newSelectedSubs.has(id)) {
      newSelectedSubs.delete(id); // Deselect if already selected
    } else {
      newSelectedSubs.add(id); // Select if not selected
    }
    setSelectedSubs(newSelectedSubs); // Update the selected substitutes state
  };

  // Function to check if a player is selected
  const isPlayerSelected = (id: string) => selectedSubs.has(id);

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedSubs.size === players.length}
                onChange={() => {
                  if (selectedSubs.size === players.length) {
                    setSelectedSubs(new Set()); // Deselect all players
                  } else {
                    setSelectedSubs(
                      new Set(players.map((player) => player.id))
                    ); // Select all players
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
              className={isPlayerSelected(player.id) ? "bg-blue-50" : ""}
            >
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={isPlayerSelected(player.id)}
                  onChange={() => togglePlayerSelection(player.id)}
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

      <div className="mt-4 flex justify-between">
        <span>{selectedSubs.size} player(s) selected</span>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Continue</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you satisfied with the selections?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently update
                starting players for this fixture.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onSubmit()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
