import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ModifyOnlineFixture } from "@/actions/php-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const OnlineButton = ({ fixture }: { fixture: AgentFixture }) => {
  const online = fixture.live;

  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: ModifyOnlineFixture,
    onSuccess(data) {
      console.log(data);
      router.refresh();

      toast({ title: "Success", description: data.message });

      if (data.error === "0") {
      } else if (data.error === "1") {
        toast({
          title: "Error!",
          variant: "destructive",
          description: data.message,
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "An error occured while creating tournament",
      });
    },
  });

  async function onSubmit() {
    const data = {
      fixtureid: fixture.fixture,
      live: online === "1" ? "0" : "1",
    };

    mutation.mutate(data);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className={
            online === "1"
              ? "text-red-400 border-red-400"
              : "border-green-400 text-green-600"
          }
        >
          {fixture.live === "1" ? "online" : "offline"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {online === "1" ? "Remove" : "Add"} {fixture.team1_name} vs{" "}
            {fixture.team2_name} {online === "1" ? "from" : "to"} live games.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
