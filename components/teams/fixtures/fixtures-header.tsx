import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectTeam from "../shared/select-team";

type FixtuerProps = {
  teams: Team[];
  comps: Competition;
  onCompChange: (v: string) => void;
  onTeamChange: (v: string) => void;
};

export const FixturesHeader = ({
  teams,
  comps,
  onCompChange,
  onTeamChange,
}: FixtuerProps) => {
  return (
    <header className="flex w-full justify-between p-2 gap-3 border-b">
      <Select onValueChange={onCompChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select competition" />
        </SelectTrigger>

        <SelectContent>
          {comps.data.map((comp) => (
            <SelectItem key={comp.id} value={comp.id}>
              {comp.competition_name} - {comp.season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onTeamChange}>
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

      {/* <div className="flex gap-3">
        <div className="border rounded-md p-2"></div>
        <div className="flex justify-center flex-col gap-2"> */}
      {/* {teams.length > 1 ? (
        <SelectTeam teams={teams} onChange={onChange} />
      ) : (
        <h1 className="text-xl font-bold">{team.team_name}</h1>
      )}

      <h1 className="text-sm text-muted-foreground font-semibold">
        {team.team_type}
      </h1> */}
      {/* </div>
      </div> */}

      {/* modal button to add new objects */}
      {/* <div className="flex flex-col justify-end"> */}
      {/* {title && url && <HeaderButton title={title} url={url} />} */}
      {/* {modal && <div>{modal}</div>} */}
      {/* </div> */}
    </header>
  );
};
