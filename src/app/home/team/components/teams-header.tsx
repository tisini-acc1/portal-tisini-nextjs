import Image from "next/image";
import HeaderButton from "./header-button";
import SelectTeam from "./shared/select-team";
import SelectSubteams from "./shared/select-subteam";

type Props = {
  url?: string;
  team: Team;
  title?: string;
  modal?: React.ReactNode;
  onChange: (v: string) => void;
};

const TeamsHeader: React.FC<Props> = ({
  title,
  team,
  onChange,
  url,
  modal,
}) => {
  return (
    <div className="flex justify-between p-2 gap-3 border-b">
      <div className="flex gap-3">
        <div className="border rounded-md p-2">
          <Image
            src="/logo-placeholder.png"
            alt="team-logo"
            width={70}
            height={70}
            priority
          />
        </div>
        <div className="flex justify-center flex-col">
          {/* <SelectTeam teams={teams} onChange={onChange} /> */}
          <h1 className="text-xl font-bold">{team.team_name}</h1>
          {team.children.length > 0 && (
            <SelectSubteams subteams={team?.children} onChange={onChange} />
          )}
          {/* <h4 className="text-sm text-muted-foreground">{team.team_type}</h4> */}
        </div>
      </div>

      {/* modal button to add new objects */}
      <div className="flex flex-col justify-end">
        {title && url && <HeaderButton title={title} url={url} />}
        {modal && <div>{modal}</div>}
      </div>
    </div>
  );
};

export default TeamsHeader;
