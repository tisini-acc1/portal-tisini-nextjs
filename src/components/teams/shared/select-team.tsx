import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  teams: Team[];
  onChange: (value: string) => void;
};

const SelectTeam = ({ teams, onChange }: SelectProps) => {
  return (
    // <div className="md:w-1/4 bg-background flex justify-center items-center border rounded-sm p-2">
    <div className="space-y-4">
      <Select onValueChange={onChange} defaultValue={teams[0]?.id}>
        <SelectTrigger>
          <SelectValue placeholder="Select team" />
        </SelectTrigger>

        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              {team.team_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    // </div>
  );
};

export default SelectTeam;
