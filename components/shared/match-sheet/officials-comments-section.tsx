"use client";

import { useQuery } from "@tanstack/react-query";
import FixCommentModal from "./fix-comment-modal";
import RefreeCard from "./ref-card";
import { getPitchCond, getWeatherCond } from "@/actions/php-actions";
import { useStore } from "@/lib/store";

type CommentsProps = {
  details: MatchDetails;
  refData: RefData;
};

const OfficialsCommentsSection = ({ details, refData }: CommentsProps) => {
  const user = useStore((state) => state.store.user);

  const { data, isLoading } = useQuery({
    queryKey: ["weatherConditions"],
    queryFn: () => getWeatherCond(),
  });

  const { data: pCond } = useQuery({
    queryKey: ["pitchConditions"],
    queryFn: () => getPitchCond(),
  });

  return (
    <section>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
        <div className="col-span-4 space-y-2 shadow-md p-3 bg-gray-100 rounded-md">
          <strong>Match Officials</strong>
          <div className="flex flex-col gap-4">
            {/* <RefreeCard title="Commissioner" /> */}
            {refData.ref1.length > 0 && (
              <RefreeCard title="Center Refree" refData={refData.ref1?.[0]} />
            )}

            {refData.ref2?.length > 0 && (
              <RefreeCard title="1st Asst. Ref" refData={refData.ref2?.[0]} />
            )}

            {refData.ref3.length > 0 && (
              <RefreeCard title="2nd Asst. Ref" refData={refData.ref3?.[0]} />
            )}

            {refData.ref4.length > 0 && (
              <RefreeCard title="Reserve Ref" refData={refData.ref4?.[0]} />
            )}
          </div>
        </div>

        <div className="col-span-4 space-y-4 shadow-md p-3 bg-gray-100 rounded-md">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <strong>Commissioner Comments</strong>

              {/* <FixCommentModal wCond={wCond} pCond={pitchCond} /> */}
            </div>

            <div className="border h-40 p-2 bg-gray-50">
              <p className="text-muted-foreground text-xs md:text-sm">
                {details.commisioner_comment}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <strong>Other Comments</strong>

              {/* <FixCommentModal wCond={wCond} pCond={pitchCond} /> */}
            </div>

            <div className="border h-40 p-2 bg-gray-50">
              <p className="text-muted-foreground text-xs md:text-sm">
                {details.other_comment}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-4 space-y-4 shadow-md p-3 bg-gray-100 rounded-md">
          {isLoading || !data || !pCond ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <strong>Referee Comments</strong>

                {user.role === "9" && (
                  <FixCommentModal wCond={data} pCond={pCond} />
                )}
              </div>

              <div className="flex flex-col gap-4 p-2">
                <p className="p-2 border bg-gray-50">
                  <strong>Weather:</strong>{" "}
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {details.weather_type}
                  </span>
                </p>

                <p className="p-2 border bg-gray-50">
                  <strong>Pitch:</strong>{" "}
                  <span className="text-muted-foreground text-xs md:text-sm">
                    {details.pitch_condition}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <strong>Referee Comments</strong>

                <div className="border h-48 p-2 bg-gray-50">
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {details.commisioner_comment}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfficialsCommentsSection;
