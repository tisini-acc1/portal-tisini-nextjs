import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

const RugbyPlayers = ({ data }: { data: TeamPlayer[] }) => {
  const [allPlayers, setAllPlayers] = useState<TeamPlayer[]>(data);
  const [subsPlayers, setSubsPlayers] = useState<TeamPlayer[]>([]);
  const [teamPositions, setTeamPositions] = useState<{
    [key: string]: TeamPlayer | null;
  }>({
    goalkeeper: null,
    leftBack: null,
    centerBack1: null,
    centerBack2: null,
    rightBack: null,
    centerAttck: null,
    centerMid1: null,
    centerMid2: null,
    rightWing: null,
    leftWing: null,
    centerFW: null,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const player = allPlayers.find((player) => player.id === active.id);
      const existingPlayer = teamPositions[over.id];

      // Handle player drop to formation area
      if (player && over.id !== "subs") {
        if (existingPlayer) {
          setAllPlayers((prevPlayers) => [...prevPlayers, existingPlayer]);
        }

        setAllPlayers((prevPlayers) =>
          prevPlayers.filter((p) => p.id !== player.id)
        );

        setTeamPositions((prevPositions) => ({
          ...prevPositions,
          [over.id]: player,
        }));
      }

      // Handle drop into substitutes area
      if (over && over.id === "subs") {
        if (player) {
          setSubsPlayers((prevSubs) => [...prevSubs, player]);

          setAllPlayers((prevPlayers) =>
            prevPlayers.filter((p) => p.id !== player.id)
          );

          // Remove the player from teamPositions (if already assigned)
          setTeamPositions((prevPositions) => {
            const updatedPositions = { ...prevPositions };
            for (const pos in updatedPositions) {
              if (updatedPositions[pos]?.id === player.id) {
                updatedPositions[pos] = null;
              }
            }
            return updatedPositions;
          });
        }
      }
    }
  };

  console.log(teamPositions);

  return (
    <main>
      <div>{allPlayers.length} players</div>

      <DndContext onDragEnd={handleDragEnd}>
        <section className="grid grid-cols-3 gap-8">
          {/* Formation Section */}
          <div className="bg-football bg-no-repeat bg-contain bg-center h-[75vh]">
            <div className="h-full relative flex flex-col justify-center items-center">
              {/* Forwards (2 players) */}
              <div className="flex items-center justify-center w-1/2 absolute top-16">
                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerFW"}
                  df={"ST"}
                />
              </div>

              {/* Midfielders (3 players) */}
              <div className="flex justify-between w-full px-8 absolute top-40">
                <SelectedPlayer
                  positions={teamPositions}
                  pos={"leftWing"}
                  df={"LW"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerAttck"}
                  df={"CAM"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"rightWing"}
                  df={"RW"}
                />
              </div>

              {/* Midfielders (2 players) */}
              <div className="flex justify-between w-1/2 absolute bottom-50">
                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerMid2"}
                  df={"CM"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerMid1"}
                  df={"CDM"}
                />
              </div>

              {/* Defenders (4 players) */}
              <div className="flex justify-between w-full p-4 absolute bottom-32">
                <SelectedPlayer
                  positions={teamPositions}
                  pos={"leftBack"}
                  df={"LB"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerBack1"}
                  df={"CBL"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"centerBack2"}
                  df={"CBR"}
                />

                <SelectedPlayer
                  positions={teamPositions}
                  pos={"rightBack"}
                  df={"RB"}
                />
              </div>

              {/* Goalkeeper */}
              <div className="flex justify-center absolute bottom-8">
                <SelectedPlayer
                  positions={teamPositions}
                  pos={"goalkeeper"}
                  df={"GK"}
                />
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="h-[75vh] p-4 overflow-y-auto">
            {allPlayers.map((player) => (
              <DraggablePlayer key={player.id} player={player} />
            ))}
          </div>

          {/* Substitutes List - 3rd column */}
          <div className="bg-blue-200 h-[75vh] overflow-y-auto p-4">
            <div>{subsPlayers.length}</div>

            <DroppableArea id="subs" styleClass="p-4">
              {subsPlayers.map((player) => (
                <DraggablePlayer key={player.id} player={player} />
              ))}
            </DroppableArea>
          </div>
        </section>
      </DndContext>
    </main>
  );
};

// Draggable player component
interface DraggablePlayerProps {
  player: Player;
}

const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ player }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: player.id,
    data: { current: player },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid black",
        padding: "8px",
        borderRadius: "8px",
        marginBottom: "8px",
        backgroundColor: "gray",
        cursor: "grab",
      }}
      className="hover:bg-gray-600 transition-colors"
    >
      {player.current_jersey_no} - {player.pname}
    </div>
  );
};

// Droppable area component
interface DroppableAreaProps {
  id: string;
  styleClass: string;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({
  id,
  styleClass,
  children,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={styleClass}>
      {children}
    </div>
  );
};

interface SelectedPProps {
  positions: { [key: string]: TeamPlayer | null };
  pos: string;
  df: string;
}

export const SelectedPlayer = ({ positions, pos, df }: SelectedPProps) => {
  const player = positions[pos]; // Access the player using the dynamic key

  return (
    <DroppableArea
      id={pos}
      styleClass="w-14 h-12 flex items-center justify-center"
    >
      {player ? (
        <div className="w-full flex flex-col gap-1 items-center justify-center">
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            {player.current_jersey_no}
          </div>
          <span className="text-[0.5rem] font-semibold bg-gray-100 px-1 rounded-sm">
            {`${player.pname.split(" ")[0][0]}
            . 
            ${player.pname.split(" ")[1]}`}
          </span>
        </div>
      ) : (
        <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
          {df}
        </div>
      )}
    </DroppableArea>
  );
};

export default RugbyPlayers;
