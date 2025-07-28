import FullCallender from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const FixturesCalendar = ({ fixtures }: { fixtures: TeamFixture[] }) => {
  const events = fixtures.map((fixture) => {
    return {
      title: `${fixture.team1_name} v ${fixture.team2_name}`,
      date: fixture.game_date,
    };
  });

  return (
    <FullCallender
      height={"80vh"}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
};

export default FixturesCalendar;
