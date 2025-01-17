import { getTeamLineup } from "@/actions/php-actions";
import VerifyPlayerCard from "@/components/match-officials/verify-player-card";

type LineupProps = {
  params: Promise<{ fixId: string }>;
};

const LineupPage = async ({ params }: LineupProps) => {
  const { fixId } = await params;

  const fixture = fixId.split("-");

  const data = await getTeamLineup(fixture[0], fixture[1]);

  const first11 = data?.filter((item) => item.player_type === "first11");
  const subs = data?.filter((item) => item.player_type === "sub");
  console.log(data);
  return (
    <main>
      <header></header>

      <section className="space-y-6">
        <div>
          <strong className="mb-2">First 11</strong>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {first11.map((player) => (
              <VerifyPlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>

        <div>
          <strong className="mb-2">Substitutes</strong>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {subs.map((player) => (
              <VerifyPlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LineupPage;
