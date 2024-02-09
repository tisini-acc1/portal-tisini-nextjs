import { Card, CardContent } from "@/components/ui/card"

type CompProps = {
    competition: Competition
}

const TournamentTeams = ({competition}: CompProps) => {

    if (competition.teams.length <= 0) {
        return <div className="flex items-center justify-center mt-8">Ooops, no teams have registered yet!</div>
    }
    
  return (
    <div className="mt-4 space-y-4">
        <h1>{competition.teams.length} teams have registered so far</h1>

        <div className="grid grid-cols-4 gap-2">
            {competition.teams.map((team) => (
                <Card key={team.team.id} className="p-0">
                <CardContent className="p-2">
                    {team.team.team_name}
                </CardContent>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default TournamentTeams