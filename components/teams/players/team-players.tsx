"use client";

const TeamPlayers = ({ data }: { data: TeamTournament[] }) => {
  return (
    <main>
      <header>filters</header>
      <section>table {data.length}</section>
    </main>
  );
};

export default TeamPlayers;
