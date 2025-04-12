"use client";

import { Button } from "../ui/button";
import { formattedDate } from "../teams/fixtures/team-fixtures";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { ArrowRightIcon, CalendarDaysIcon, TrophyIcon } from "lucide-react";

const FixtureCard = ({ fixture }: { fixture: PlayerFixture }) => {
  const router = useRouter();

  const { updateFixture } = useStore((state) => state);

  return (
    <Card
      key={fixture.id}
      className={
        fixture.game_status === "FT" || fixture.game_status === "ended"
          ? "text-gray-400"
          : ""
      }
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>{formattedDate(fixture.game_date)}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Round {fixture.matchday}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-6">
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
          <div className="absolute bottom-0 right-0 h-20 w-20 rounded-full bg-blue-100 opacity-20 transform translate-x-10 translate-y-10"></div>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="md:text-sm text-xs text-gray-800">
                {fixture.team1_name}
              </div>
            </div>

            <div className="relative px-4">
              <div className="absolute top-1/2 left-0 h-px w-full bg-gray-300 transform -translate-y-1/2"></div>
              <span className="relative z-10 px-2 bg-white text-sm font-mono text-gray-500">
                VS
              </span>
            </div>

            <div className="text-center">
              <div className="md:text-sm text-xs text-gray-800">
                {fixture.team2_name}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500 whitespace-nowrap">
          <p
            className="w-9/12 overflow-hidden text-ellipsis
                "
          >
            League
          </p>{" "}
          <Button
            size={"sm"}
            variant={"outline"}
            className="mr-2"
            onClick={
              () => "pushed"
              //   router.push(
              //     `/home/teams/results/match-sheet/${fixture.id}-${fixture.team1_id}`
              //   )
            }
          >
            match sheet
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
            onClick={() => {
              updateFixture(fixture.id);
              router.push(`/home/players/fixtures/${fixture.id}`);
            }}
          >
            View stats
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

//  {
//    fixture.pay_status === 0 ? (
//      <FixPaymentModal fixture={fixture} />
//    ) : (
//      // <DepositModal open={open} setOpen={setOpen} />
//      <Button
//        size={"sm"}
//        className={"bg-green-600"}
//        onClick={() => {
//          updateFixture(fixture.id);
//          router.push(`/home/teams/results/single-result/${fixture.id}`);
//        }}
//      >
//        view
//      </Button>
//    );
//  }

export default FixtureCard;
