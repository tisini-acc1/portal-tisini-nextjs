"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import AddFixtureData from "./add-fixture-data";
import VerifyFixtureData from "./verify-fixture-data";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOfficialsEvents } from "@/actions/php-actions";

const FixtureDataMenu = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  const { data } = useQuery({
    queryKey: ["refEvents"],
    queryFn: () => getOfficialsEvents(),
  });

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

      <AddFixtureData
      // open={openAdd}
      // setOpen={setOpenAdd}
      // refEvents={data as RefEvents[]}
      />
      <VerifyFixtureData open={openVerify} setOpen={setOpenVerify} />
    </>
  );
};

export default FixtureDataMenu;
