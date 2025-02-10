import { SelectedPlayer } from "./select-player";

type FootballProps = {
  teamPositions: { [key: string]: TeamPlayer | null };
};

const FootballSP = ({ teamPositions }: FootballProps) => {
  return (
    <div className="bg-football bg-no-repeat bg-contain bg-center h-[75vh]">
      <div className="h-full relative flex flex-col justify-center items-center">
        {/* Forwards (2 players) */}
        <div className="flex items-center justify-center w-1/2 absolute top-16">
          <SelectedPlayer
            positions={teamPositions}
            pos={"centerFW"}
            df={"ST"}
          />
        </div>

        {/* Midfielders (3 players) */}
        <div className="flex justify-between w-full px-8 absolute top-40">
          <SelectedPlayer
            positions={teamPositions}
            pos={"leftWing"}
            df={"LW"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"centerAttck"}
            df={"CAM"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"rightWing"}
            df={"RW"}
          />
        </div>

        {/* Midfielders (2 players) */}
        <div className="flex justify-between w-1/2 absolute bottom-50">
          <SelectedPlayer
            positions={teamPositions}
            pos={"centerMid2"}
            df={"CM"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"centerMid1"}
            df={"CDM"}
          />
        </div>

        {/* Defenders (4 players) */}
        <div className="flex justify-between w-full p-4 absolute bottom-32">
          <SelectedPlayer
            positions={teamPositions}
            pos={"leftBack"}
            df={"LB"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"centerBack1"}
            df={"CBL"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"centerBack2"}
            df={"CBR"}
          />

          <SelectedPlayer
            positions={teamPositions}
            pos={"rightBack"}
            df={"RB"}
          />
        </div>

        {/* Goalkeeper */}
        <div className="flex justify-center absolute bottom-8">
          <SelectedPlayer
            positions={teamPositions}
            pos={"goalkeeper"}
            df={"GK"}
          />
        </div>
      </div>
    </div>
  );
};

export default FootballSP;
