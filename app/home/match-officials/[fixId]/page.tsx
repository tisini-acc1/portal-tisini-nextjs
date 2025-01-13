import { getTeamLineup } from "@/actions/php-actions";
import Image from "next/image";

type LineupProps = {
  params: Promise<{ fixId: string }>;
};

const LineupPage = async ({ params }: LineupProps) => {
  const { fixId } = await params;

  const fixture = fixId.split("-");

  const data = await getTeamLineup(fixture[0], fixture[1]);

  const first11 = data?.filter((item) => item.player_type === "first11");
  const subs = data?.filter((item) => item.player_type === "sub");

  return (
    <main>
      <header></header>

      <section className="space-y-6">
        <div>
          <strong className="mb-2">First 11</strong>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {first11.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-4 h-20 border px-1 rounded-sm"
              >
                <div>
                  <Image
                    src={"/footballer.jpg"}
                    alt={"name"}
                    width={50}
                    height={50}
                    className={
                      "h-full w-full object-cover rounded-sm aspect-square"
                    }
                  />
                </div>

                <div className="">
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>{player.pname}</strong>{" "}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Jersey Number:</strong> {player.Jersey_No}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Position:</strong> {player.lineupposition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <strong className="mb-2">Substitutes</strong>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {subs.map((player) => (
              <div
                key={player.id}
                className="flex items-center gap-4 h-20 border px-1 rounded-sm"
              >
                <div>
                  <Image
                    src={"/footballer.jpg"}
                    alt={"name"}
                    width={50}
                    height={50}
                    className={
                      "h-full w-full object-cover rounded-sm aspect-square"
                    }
                  />
                </div>

                <div className="">
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>{player.pname}</strong>{" "}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Jersey Number:</strong> {player.Jersey_No}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Position:</strong> {player.lineupposition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LineupPage;
