import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DeleteRefEvent from "./delete-refData";
import { useState } from "react";

type CardProps = { data: RefEvents; homeId: string };

export const RefDataCard = ({ data, homeId }: CardProps) => {
  const [open, setOpen] = useState(false);

  const isHomeTeam = data.teamid === homeId;

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
    <>
      <Card
        className={cn(
          "relative overflow-hidden",
          isHomeTeam
            ? "border-l-4 border-l-blue-600"
            : "border-r-4 border-r-red-600"
        )}
      >
        <CardContent className="p-3">
          <div
            className={cn(
              "flex items-center gap-2",
              isHomeTeam ? "justify-start" : "justify-end"
            )}
          >
            {isHomeTeam && (
              <span className="font-medium">{data.minute}&apos;</span>
            )}

            <div
              className={cn(
                "flex items-center gap-2",
                isHomeTeam ? "flex-row" : "flex-row-reverse"
              )}
            >
              <span className="text-xl">
                <Image src={img} alt={data.eventname} width={25} height={25} />
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{data.playername}</span>
                <span className="text-xs text-muted-foreground">
                  {data.eventid === "52"
                    ? data.eventname
                    : data.subeventname || data.eventname}
                </span>
              </div>
            </div>

            {!isHomeTeam && (
              <span className="font-medium">{data.minute}&apos;</span>
            )}
          </div>

          <div
            className={
              isHomeTeam
                ? "absolute top-2 right-2 flex gap-1"
                : "absolute top-2"
            }
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => console.log("edit")}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive"
              onClick={() => setOpen(!open)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeleteRefEvent fixId={data.id} open={open} setOpen={setOpen} />
    </>
  );
};

{
  /* <div className="p-2 font-semibold">
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
                data.subeventname === "Scored"
                  ? "text-green-600"
                  : "text-red-500"
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
      </div> */
}
