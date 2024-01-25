import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeaderProps = {
  competitions: Competition[];
};

const CompsTeamsHeader = ({ competitions }: HeaderProps) => {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="select a team" />
        </SelectTrigger>

        <SelectContent>
          {competitions.map((comp) => (
            <SelectItem key={comp.id} value={comp.id}>
              {comp.competition_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div>comps details</div>
    </div>
  );
};

export default CompsTeamsHeader;
