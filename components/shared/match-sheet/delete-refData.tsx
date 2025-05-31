import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DeleteRefData } from "@/actions/php-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DeleteProps = {
  fixId: string;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DeleteRefEvent = ({ fixId, open, setOpen }: DeleteProps) => {
  const serie = useStore((state) => state.store.serie);

  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    try {
      const res = await DeleteRefData(fixId);

      // console.log(res);
      if (res.error === "0") {
        setOpen(false);
        router.refresh();
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
            {`This action cannot be undone. This will permanently delete fixture this event and
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

export default DeleteRefEvent;
