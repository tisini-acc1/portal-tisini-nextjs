"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { verifyPlayer } from "@/actions/php-actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RotateCw } from "lucide-react";

const VerifyPlayerCard = ({ player }: { player: Lineup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const verifylineup = async (id: string) => {
    try {
      setIsLoading(true);

      const res = await verifyPlayer(id);

      toast({
        title: "Success",
        description: `${player.pname} verified successfully`,
      });

      router.refresh();
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: "error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full rounded-lg shadow-md flex flex-col sm:flex-row md:items-center gap-6 p-6 ${
        player.verify === "1" ? "bg-white" : "bg-red-100"
      }`}
    >
      <div className="relative md:w-1/2 h-60 mb-4 sm:mb-0">
        <Image
          src={"/avatar.webp"}
          alt={player.pname}
          width={200}
          height={240}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {player.pname}
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="font-medium">Jersey No:</span> {player.Jersey_No}
          </p>
          <p>
            <span className="font-medium">Licence No:</span> {player.id}
          </p>

          <p>
            <span className="font-medium">Role:</span>{" "}
            {player.player_type === "first11" ? (
              <strong className="">Starter</strong>
            ) : (
              "Substitute"
            )}
          </p>

          <p>
            <span className="font-medium">Status:</span>{" "}
            {player.verify === "1" ? (
              <span className="text-green-600">Verified</span>
            ) : (
              <span className="text-red-600">Not Verified</span>
            )}
          </p>
        </div>

        {player.verify === "0" && (
          <Button
            size={"sm"}
            variant={"outline"}
            className="px-3 py-1 text-xs text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all mt-4"
            disabled={isLoading}
            onClick={() => verifylineup(player.id)}
          >
            Verify{" "}
            {isLoading ? <RotateCw className="h-4 w-4 animate-spin" /> : ""}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyPlayerCard;
