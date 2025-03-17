"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import VerifyFixtureData from "./verify-fixture-data";
import { useState } from "react";

const FixtureDataMenu = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  console.log(openAdd);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenVerify(true)}>
            Verify
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            Populate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <AddFixtureData /> */}
      <VerifyFixtureData open={openVerify} setOpen={setOpenVerify} />
    </>
  );
};

export default FixtureDataMenu;
