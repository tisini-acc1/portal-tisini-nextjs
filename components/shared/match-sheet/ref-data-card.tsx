import Image from "next/image";
import { Volleyball } from "lucide-react";

type CardProps = { data: RefEvents; homeId: string };

export const RefDataCard = ({ data, homeId }: CardProps) => {
  const img =
    data.subeventid === "60"
      ? "/conversion.png"
      : data.eventid === "19"
      ? "/ball.png"
      : ["42", "62", "61"].includes(data.subeventid)
      ? "/missed.png"
      : ["43", "44"].includes(data.subeventid)
      ? "/goal.png"
      : ["66", "200"].includes(data.subeventid)
      ? "/rugby.jpg"
      : ["46", "21"].includes(data.subeventid)
      ? "/yellowcard.avif"
      : ["45", "22"].includes(data.subeventid)
      ? "/redcard.webp"
      : "/homeLogo.png";

  return (
    <div className="p-2 font-semibold">
      {data.teamid === homeId ? (
        data.eventname === "Substitute" ? (
          <div className="flex items-center gap-1">
            {data.minute}&apos;
            <div>
              <div className="text-red-500 capitalize">
                {"⬇️"} {data.playername}
              </div>
              <div className="text-green-600 capitalize">
                {"⬆️"} {data.subplayername}
              </div>
            </div>
          </div>
        ) : data.eventname === "PM Penalties" ? (
          <div
            className={`${
              data.subeventname === "Scored" ? "text-green-600" : "text-red-500"
            } capitalize flex items-center gap-1`}
          >
            {data.minute}&apos; <Volleyball /> {data.playername}
          </div>
        ) : (
          <div className="capitalize flex items-center">
            {data.minute}&apos;{" "}
            <Image src={img} alt={data.eventname} width={25} height={25} />{" "}
            {data.playername}{" "}
            <span className="text-muted-foreground text-xs ml-1">
              {data.eventid === "52" ? data.eventname : data.subeventname}
            </span>
          </div>
        )
      ) : data.eventname === "Substitute" ? (
        <div className="flex items-center justify-end gap-1">
          <div>
            <div className="text-red-500 text-end capitalize">
              {data.playername} {"⬇️"}
            </div>
            <div className="text-green-600 text-end capitalize">
              {data.subplayername} {"⬆️"}
            </div>
          </div>
          {data.minute}&apos;
        </div>
      ) : data.eventname === "PM Penalties" ? (
        <div
          className={`${
            data.subeventname === "Scored" ? "text-green-600" : "text-red-500"
          } capitalize flex items-center justify-end gap-1`}
        >
          {data.playername} <Volleyball /> {data.minute}&apos;
        </div>
      ) : (
        <div className="flex justify-end items-center capitalize">
          <span className="text-muted-foreground text-xs mr-1">
            {data.eventid === "52" || data.eventid === "19"
              ? data.eventname
              : data.subeventname}
          </span>
          {data.playername}{" "}
          <Image src={img} alt={data.eventname} width={25} height={25} />{" "}
          {data.minute}&apos;
        </div>
      )}
    </div>
  );
};
