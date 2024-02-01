import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeaderProps = {
  allComps: Competition[];
  competition: Competition | undefined;
  onChange: (v: string) => void;
};

const CompetionsHeader = ({ allComps, onChange, competition }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row justify-between gap-3 border p-2">
      <div className="flex gap-2">
        <div className="rounded-sm p-2 border">
          <Image src="/tournament-img.jpg" alt="" width={80} height={80} />
        </div>

        <div className="w-[200px] flex flex-col gap-2">
          {/* <div className="flex flex-col gap-2"> */}
          <Select onValueChange={onChange} defaultValue={allComps[0]?.id}>
            <SelectTrigger>
              <SelectValue placeholder="select a team" />
            </SelectTrigger>

            <SelectContent>
              {allComps.map((comp) => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.competition_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <p>Type: {competition?.competition_type}</p>
          {/* </div> */}

          {/* <div className="flex flex-col gap-2"> */}
          {/* <p>Starts on: {competition?.start_period}</p> */}
          {/* <p>Registered teams: {competition?.teams.length}</p> */}
          {/* </div> */}
        </div>
      </div>

      <div className="flex items-end justify-end">
        <p>Categories: 3</p>
      </div>
    </header>
  );
};

export default CompetionsHeader;
