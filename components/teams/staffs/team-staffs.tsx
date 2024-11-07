"use client";

import { useEffect, useState } from "react";

import { columns } from "../staffs/columns";
import { StaffsTable } from "./staffs-table";
import TeamsHeader from "../shared/teams-header";
import CreateStaffModal from "./create-staff-modal";

const TeamStaffs = ({ teams }: { teams: Team[] }) => {
  const [id, setId] = useState(teams[0]?.id);
  const [staffs, setStaffs] = useState([]);

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      const res = await fetch(`/api/staffs/${id}`);
      const data = await res.json();
      setStaffs(data);
    };

    fetchStaffs();
  }, [id]);

  const team = teams.find((team) => team.id === id) as Team;

  return (
    <main className="space-y-3">
      <TeamsHeader
        teams={teams}
        onChange={onChange}
        id={id}
        modal={<CreateStaffModal team={team} />}
      />

      <section className="flex-grow">
        <StaffsTable columns={columns} data={staffs} />
      </section>
    </main>
  );
};

export default TeamStaffs;
