import Image from "next/image";

const CompsHeader = ({ competition }: { competition: Competition }) => {
  return (
    <div className="">
      <div className="flex gap-3">
        <Image
          src="/tournament-img.jpg"
          alt=""
          width={180}
          height={180}
          className="rounded"
        />

        <div className="space-y-1">
          <h1 className="font-bold ">{competition.competition_name}</h1>
          <p>Type: {competition.competition_type}</p>
          <p>Starts on: {competition.start_period}</p>
          <p>Registered teams: {competition.teams.length}</p>
          <p>Categories: 3</p>
        </div>
      </div>

      {/* <div>add category</div> */}
    </div>
  );
};

export default CompsHeader;
