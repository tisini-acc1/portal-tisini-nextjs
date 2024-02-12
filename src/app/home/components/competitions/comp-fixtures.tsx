'use client'

import { useEffect, useState } from "react"
import { FixtureTable } from "./fixture-table"
import { fixtureColumns } from "./fixture-columns"


const CompetitionFixtures = ({comp}: {comp:Competition}) => {
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    const getFixtures = async () => {
      const res = await fetch(`/api/competitions/${comp.id}`)
      const data = await res.json()
      setFixtures(data)
    }

    getFixtures()
  }, [comp])

  return (
    <div className="container mx-auto py-10">
      <FixtureTable columns={fixtureColumns} data={fixtures} comp={comp} />
    </div>
  )
}

export default CompetitionFixtures