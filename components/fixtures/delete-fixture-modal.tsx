import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../ui/button";
import { useStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { DeleteFixture } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DeleteProps = {
  fixture: AgentFixture;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DeleteFixtureModal = ({ fixture, open, setOpen }: DeleteProps) => {
  const serie = useStore((state) => state.store.serie);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    try {
      const res = await DeleteFixture(fixture.fixture);

      console.log(res);
      if (res.error === "0") {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["fixtures", serie] });
        toast({ title: "Success", description: res.message });
      } else {
        toast({
          title: "Error!",
          variant: "destructive",
          description: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while deleting fixture",
      });
    }
  };

  const onOpenChangeWrapper = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeWrapper}>
      <DialogTrigger asChild className="hidden">
        <Button size="icon" variant="outline">
          <Trash2 className="w-4 h-4" color="#fa0000" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete fixture ${fixture.team1_name} vs ${fixture.team2_name} and
            remove it data from our servers.`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" variant={"outline"} onClick={() => onSubmit()}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFixtureModal;
