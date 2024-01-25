import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyCompsHeader = () => {
  return (
    <div className="border-b p-3 h-16">
      <div className="float-right">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" /> Tournament
            </Button>
          </DialogTrigger>

          <DialogContent>form</DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyCompsHeader;
