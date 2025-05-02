"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";

export const reviewColumns: ColumnDef<AgentFixture>[] = [
  {
    accessorKey: "fixture",
    header: "#",
  },
  {
    accessorKey: "team1_name",
    header: () => <div className="text-right">Home</div>,
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="text-right">
          <div>{fixture.team1_name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "tisiniscores",
    header: "",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex justify-between items-center sm:gap-1">
          <div className="p-2 bg-slate-100 rounded-md">
            {fixture.tisiniscores.Home}
          </div>
          <div className="p-2 bg-slate-100 rounded-md">
            {fixture.tisiniscores.Away}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "team2_name",
    header: "Away",
  },
  {
    accessorKey: "game_status",
    header: "Status",
  },
  {
    accessorKey: "game_date",
    header: "Date",
  },
  {
    accessorKey: "matchday",
    header: "Round",
  },
  {
    accessorKey: "series",
    header: "Review",
  },
  {
    accessorKey: "fixture_type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fixture = row.original;

      return (
        <div className="flex gap-2">
          <OnlineButton fixture={fixture} />
          <NavigateButton fixture={fixture} />
        </div>
      );
    },
  },
];

const OnlineButton = ({ fixture }: { fixture: AgentFixture }) => {
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

const NavigateButton = ({ fixture }: { fixture: AgentFixture }) => {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      onClick={() =>
        router.push(`/home/super-agent/review-data/${fixture.fixture}`)
      }
    >
      Review
    </Button>
  );
};
