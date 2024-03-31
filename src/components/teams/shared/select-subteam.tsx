import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  subteams: Team[];
  onChange: (value: string) => void;
};

const SelectSubteams = ({ subteams, onChange }: SelectProps) => {
  return (
    <div className="space-y-4">
      <Select onValueChange={onChange} defaultValue={subteams?.[0]?.id}>
        <SelectTrigger>
          <SelectValue placeholder="Select team" />
        </SelectTrigger>

        <SelectContent>
          {subteams.map((team) => (
            <SelectItem key={team.id} value={team.id}>
              {team.team_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSubteams;
