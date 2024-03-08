"use client"

import { ColumnDef } from "@tanstack/react-table"

export const fixtureColumns: ColumnDef<Fixture>[] = [
  {
    accessorKey: 'home',
    header: "Home",
    cell: ({row}) => {
        const fixture = row.original
        return <div>{fixture.fixtures.team_a.team.team_name}</div>
    }
  },
  {
    accessorKey: "away",
    header: "Away",
    cell: ({row}) => {
        const fixture = row.original
        return <div>{fixture.fixtures.team_b.team.team_name}</div>
    }
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({row}) => {
        const fixture = row.original
        return <div>{fixture.fixtures.game_date}</div>
    }
  },
  {
    accessorKey: "dateCreated",
    header: "Date created",
    cell: ({row}) => {
        const fixture = row.original
        return <div>{fixture.fixtures.date_created}</div>
    }
  },
  {
    accessorKey: "field",
    header: "Venue",
    cell: ({row}) => {
        const fixture = row.original
        return <div>{fixture.fixtures.field}</div>
    }
  },
]
