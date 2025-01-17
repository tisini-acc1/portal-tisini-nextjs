"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { verifyPlayer } from "@/actions/php-actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const VerifyPlayerCard = ({ player }: { player: Lineup }) => {
  const { toast } = useToast();
  const router = useRouter();

  const verifylineup = async (id: string) => {
    try {
      const res = await verifyPlayer(id);

      toast({ title: "Success", description: "Player verified successfully" });
      router.refresh();
      console.log(res);
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "error", variant: "destructive" });
    }
  };

  return (
    <div className="w-full bg-gray-100 relative flex items-center gap-4 h-28 border px-1 rounded-sm">
      <div>
        <Image
          src={"/footballer.jpg"}
          alt={"name"}
          width={70}
          height={70}
          className={"h-full w-full object-cover rounded-sm aspect-square"}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-600 mb-1">
          <strong>{player.pname}</strong>{" "}
        </p>
        <p className="text-xs text-gray-600 mb-1">
          <strong>Jersey no:</strong> {player.Jersey_No}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Licence no:</strong> {player.id}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Status:</strong>{" "}
          {player.verify === "1" ? "Verified" : "Not Verified"}
        </p>
      </div>

      {player.verify === "0" && (
        <Button
          size={"sm"}
          variant={"ghost"}
          className="absolute bottom-1 right-1"
          onClick={() => verifylineup(player.id)}
        >
          verify
        </Button>
      )}
    </div>
  );
};

export default VerifyPlayerCard;
