import Header from "../components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyTeams from "./components/my-teams";
import AddTeamForm from "./components/add-team-form";
import Competitions from "./components/competitions";
import RegisterComp from "./components/register-comp";

const SwitchTeamPage = () => {
  return (
    <main className="space-y-3">
      <Header />

      <div className="flex flex-col md:flex-row gap-4">
        <Tabs
          defaultValue="myTeams"
          className="flex-1 w-[360px] md:max-w-md md:mx-auto"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="myTeams">Teams</TabsTrigger>
            <TabsTrigger value="addTeam">Add Team</TabsTrigger>
          </TabsList>
          <TabsContent value="myTeams">
            <MyTeams />
          </TabsContent>
          <TabsContent value="addTeam">
            <AddTeamForm />
          </TabsContent>
        </Tabs>

        <Tabs
          defaultValue="competitions"
          className="flex-1 w-[360px] md:max-w-md md:mx-auto"
        >
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="enter">Enter Competition</TabsTrigger>
          </TabsList>
          <TabsContent value="competitions">
            <Competitions />
          </TabsContent>
          <TabsContent value="enter">
            <RegisterComp />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default SwitchTeamPage;
