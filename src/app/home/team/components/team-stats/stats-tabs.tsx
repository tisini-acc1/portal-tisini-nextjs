import GeneralStats from "./general-stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PosessionStats from "./posession-stats";
import DefenseStats from "./defense-stats";
import DisciplineStats from "./discipline-stats";

const StatsTabs = () => {
  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="squad">Squad</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="posession">Posession</TabsTrigger>
        <TabsTrigger value="defense">Defense</TabsTrigger>
        <TabsTrigger value="discipline">Discipline</TabsTrigger>
      </TabsList>

      <TabsContent value="squad">Squad</TabsContent>

      <TabsContent value="general">
        <GeneralStats />
      </TabsContent>

      <TabsContent value="posession">
        <PosessionStats />
      </TabsContent>

      <TabsContent value="defense">
        <DefenseStats />
      </TabsContent>

      <TabsContent value="discipline">
        <DisciplineStats />
      </TabsContent>
    </Tabs>
  );
};

export default StatsTabs;
