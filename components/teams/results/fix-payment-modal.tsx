import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FixPaymentModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>pay</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for fixture</DialogTitle>
        </DialogHeader>
        form
      </DialogContent>
    </Dialog>
  );
};

export default FixPaymentModal;
