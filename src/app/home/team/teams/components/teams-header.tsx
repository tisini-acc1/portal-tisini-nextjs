import Image from "next/image";
import HeaderButton from "../../components/header-button";

type Props = {
  url?: string;
  team: Team;
  title?: string;
  modal?: React.ReactNode;
};

const TeamsHeader: React.FC<Props> = async ({ title, team, url, modal }) => {
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
          <h1 className="text-xl font-bold">{team.team_name}</h1>
          <h4 className="text-sm text-muted-foreground">{team.team_type}</h4>
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
