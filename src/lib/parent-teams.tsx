const ParentTeams = (teams: Team[]) => {
  const parentTeams = teams.filter((team) => {
    // Check if the team's id appears in the children array of any other team
    return !teams.some((otherTeam) =>
      otherTeam.children.some((child) => child.id === team.id)
    );
  });

  return parentTeams;
};

export default ParentTeams;
