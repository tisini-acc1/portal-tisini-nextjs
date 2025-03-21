// import { EyeIcon } from "lucide-react";
// import Image from "next/image";
import { RefreeCard } from "../match-officials/fixtures/ref-fix-details";

const OfficialsCommentsSection = ({ details }: { details: MatchDetails }) => {
  return (
    <section>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4">
        <div className="col-span-8 space-y-2 shadow-md p-3 bg-gray-100 rounded-md">
          <strong>Match Officials</strong>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <RefreeCard title="Commissioner" />
            <RefreeCard title="Center Refree" />
            <RefreeCard title="1st Assistant Refree" />
            <RefreeCard title="2nd Assistant Refree" />
            <RefreeCard title="Reserve Refree" />
          </div>
        </div>

        <div className="col-span-4 space-y-4 shadow-md p-3 bg-gray-100 rounded-md">
          <strong>Match Conditions</strong>

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
            <div className="flex justify-between items-center">
              <strong>Match Comments</strong>

              {/* <FixCommentModal wCond={wCond} pCond={pitchCond} /> */}
            </div>

            <div className="border h-48 p-2 bg-gray-50">
              <p className="text-muted-foreground text-xs md:text-sm">
                {details.commisioner_comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// type RefProps = {
//   title: string;
// };

// const RefreeCard = ({ title }: RefProps) => {
//   const [blur, setBlur] = useSta(true);

//   return (
//     <div className="border rounded-md p-1 pt-2 flex flex-col gap-2 items-center bg-slate-50">
//       <Image
//         src={"/avatar.webp"}
//         alt="profile"
//         width={100}
//         height={100}
//         className="rounded-full object-contain"
//       />
//       <div className="flex flex-col items-center text-xs md:text-sm font-mono">
//         <span className="">Michael Odiambo</span>
//         <span className="text-muted-foreground">{title}</span>
//         <span className="text-muted-foreground flex items-center gap-2">
//           <span className={blur ? "blur-lg" : ""}>0700000000</span>
//           <EyeIcon
//             className="h-4 w-4 cursor-pointer"
//             onClick={() => setBlur(!blur)}
//           />{" "}
//         </span>
//       </div>
//     </div>
//   );
// };

export default OfficialsCommentsSection;
