import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/header";

const SwitchTeamPage = () => {
  return (
    <main className="space-y-3">
      <Header />

      <div className="flex gap-4">
        <Tabs defaultValue="myTeams" className="flex-1 w-[400px]">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="myTeams">Teams</TabsTrigger>
            <TabsTrigger value="addTeam">Add Team</TabsTrigger>
          </TabsList>
          <TabsContent value="myTeams">Teams</TabsContent>
          <TabsContent value="addTeam">Add Teams</TabsContent>
        </Tabs>

        <Tabs defaultValue="competitions" className="flex-1 w-[400px]">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="enter">Enter Competition</TabsTrigger>
          </TabsList>
          <TabsContent value="competitions">Teams</TabsContent>
          <TabsContent value="enter">Add Teams</TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default SwitchTeamPage;
