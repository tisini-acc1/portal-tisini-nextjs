"use client";

import { useState } from "react";

import CompetionsHeader from "./comps-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SelectCompetition from "@/app/home/components/competitions/select-competition";

const CompetionTeams = ({ competitions }: { competitions: Competition[] }) => {
  const [id, setId] = useState(competitions[0]?.id);
  const [categoryId, setCategoryId] = useState(competitions[0]?.children[0].id);

  const competition = competitions.find((comp) => comp.id === id) as Competition;

  const onChange = (value: string) => {
    setId(value);
  };

  const onCategoryChange = (value:string) => {
    setCategoryId(value)
  }

  return (
    <div className="space-y-4">
      <CompetionsHeader
        allComps={competitions}
        onChange={onChange}
        competition={competition}
      />

      <div className="space-y-4 mt-2 w-full">
        <div className="flex">

        <Tabs defaultValue="teams" className="w-full">
          <TabsList>
          {competition?.children.length > 0 && 
          <SelectCompetition competition={competition} onChange={onCategoryChange} value={competition?.children[0].id}
          />}
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
          </TabsList>

          <TabsContent value="teams">Teams</TabsContent>
          <TabsContent value="fixtures">Fixtures</TabsContent>
          <TabsContent value="results">Results</TabsContent>
          <TabsContent value="standings">Standings</TabsContent>
        </Tabs>
        </div>
        {/* <h1 className="text-xl text-center">

        Tournament sub-categories under {competition?.competition_name}
        </h1>

        <Accordion type="single" collapsible className="px-4">
          {competition?.children.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger>{category.competition_name}</AccordionTrigger>
            <AccordionContent>
              <h1>Registered teams</h1>
              {category.teams.map((team) => (
                <div key={team.id}>
                  {team.team.team_name}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          ))}
          </Accordion> */}
      </div>
    </div>
  );
};

export default CompetionTeams;
