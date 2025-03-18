import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

const SelectPlayers = ({ data }: { data: TeamPlayer[] }) => {
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

  const onSubmit = () => {
    // const squad = generatePlayerRoles();
    const lineUp = {
      first11: teamPositions,
      subs: subsPlayers,
    };

    console.log(lineUp);
  };

  // console.log(teamPositions);

  return (
    <main>
      <div>
        {allPlayers.length} players
        <Button type="submit" onClick={() => onSubmit()}>
          Submit
        </Button>
      </div>

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

export default SelectPlayers;

// interface Player {
//   id: string;
//   pname: string;
//   current_jersey_no: string;
// }

// interface FootballComponentProps {
//   data: Player[];
// }

// const FootballComponent: React.FC<FootballComponentProps> = ({ data }) => {
//   const [startingPlayers, setStartingPlayers] = useState<Player[]>([]);
//   const [subsPlayers, setSubsPlayers] = useState<Player[]>([]);
//   const [allPlayers, setAllPlayers] = useState<Player[]>(data);
//   const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null); // Track the currently dragged player

//   const handleDragStart = (event: any) => {
//     const { active } = event;
//     const player = active.data.current;
//     setDraggedPlayer(player); // Set the dragged player
//   };

//   const handleDragEnd = (event: any) => {
//     const { over } = event;

//     if (!over || !draggedPlayer) return;

//     if (
//       over.id.startsWith("forward") ||
//       over.id.startsWith("midfielder") ||
//       over.id.startsWith("defender") ||
//       over.id === "goalkeeper"
//     ) {
//       // Add to startingPlayers
//       setStartingPlayers((prev) => {
//         const newStartingPlayers = [...prev];
//         if (over.id.startsWith("forward")) {
//           const forwardIndex = Number(over.id.split("-")[1]);
//           newStartingPlayers[forwardIndex] = draggedPlayer;
//         } else if (over.id.startsWith("midfielder")) {
//           const midfielderIndex = Number(over.id.split("-")[1]) + 2;
//           newStartingPlayers[midfielderIndex] = draggedPlayer;
//         } else if (over.id.startsWith("defender")) {
//           const defenderIndex = Number(over.id.split("-")[1]) + 6;
//           newStartingPlayers[defenderIndex] = draggedPlayer;
//         } else if (over.id === "goalkeeper") {
//           newStartingPlayers[10] = draggedPlayer;
//         }
//         return newStartingPlayers;
//       });
//     } else if (over.id === "subs") {
//       // Add to subsPlayers
//       setSubsPlayers((prev) => [...prev, draggedPlayer]);
//     }

//     // Remove the player from allPlayers
//     setAllPlayers((prev) => prev.filter((p) => p.id !== draggedPlayer.id));

//     // Reset the dragged player
//     setDraggedPlayer(null);
//   };

//   return (
//     <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//       <section className="grid grid-cols-3 gap-8">
//         {/* Starting 11 */}
//         <div className="bg-football bg-no-repeat bg-contain bg-center h-[75vh]">
//           <div className="h-full relative flex flex-col justify-center items-center">
//             {/* Forwards (2 players) */}
//             <div className="flex justify-between w-1/2 absolute top-16">
//               {[0, 1].map((index) => (
//                 <DroppableArea
//                   key={`forward-${index}`}
//                   id={`forward-${index}`}
//                   styleClass="w-12 h-12 bg-gray-500 rounded-full text-center flex items-center justify-center"
//                 >
//                   {startingPlayers[index] ? (
//                     <DraggablePlayer
//                       key={startingPlayers[index].id}
//                       player={startingPlayers[index]}
//                     />
//                   ) : (
//                     <span>FW</span>
//                   )}
//                 </DroppableArea>
//               ))}
//             </div>
//             {/* Midfielders (4 players) */}
//             <div className="flex justify-between w-full p-4 absolute top-40">
//               {[2, 3, 4, 5].map((index) => (
//                 <DroppableArea
//                   key={`midfielder-${index}`}
//                   id={`midfielder-${index}`}
//                   styleClass="w-12 h-12 bg-gray-500 rounded-full text-center flex items-center justify-center"
//                 >
//                   {startingPlayers[index] ? (
//                     <DraggablePlayer
//                       key={startingPlayers[index].id}
//                       player={startingPlayers[index]}
//                     />
//                   ) : (
//                     <span>MF</span>
//                   )}
//                 </DroppableArea>
//               ))}
//             </div>
//             {/* Defenders (4 players) */}
//             <div className="flex justify-between w-full p-4 absolute bottom-32">
//               {[6, 7, 8, 9].map((index) => (
//                 <DroppableArea
//                   key={`defender-${index}`}
//                   id={`defender-${index}`}
//                   styleClass="w-12 h-12 bg-gray-500 rounded-full text-center flex items-center justify-center"
//                 >
//                   {startingPlayers[index] ? (
//                     <DraggablePlayer
//                       key={startingPlayers[index].id}
//                       player={startingPlayers[index]}
//                     />
//                   ) : (
//                     <span>DF</span>
//                   )}
//                 </DroppableArea>
//               ))}
//             </div>
//             {/* Goalkeeper (GK) */}
//             <div className="absolute bottom-8">
//               <DroppableArea
//                 id="goalkeeper"
//                 styleClass="w-12 h-12 bg-gray-500 rounded-full text-center flex items-center justify-center"
//               >
//                 {startingPlayers[10] ? (
//                   <DraggablePlayer
//                     key={startingPlayers[10].id}
//                     player={startingPlayers[10]}
//                   />
//                 ) : (
//                   <span>GK</span>
//                 )}
//               </DroppableArea>
//             </div>
//           </div>
//         </div>

//         {/* Players List */}
//         <div className="bg-red-200 h-[75vh] overflow-y-auto">
//           {allPlayers.map((player) => (
//             <DraggablePlayer key={player.id} player={player} />
//           ))}
//         </div>

//         {/* Subs List */}
//         <div id="subs" className="bg-red-200 h-[75vh] overflow-y-auto">
//           <DroppableArea id="subs" styleClass="p-4">
//             {subsPlayers.map((player) => (
//               <DraggablePlayer key={player.id} player={player} />
//             ))}
//           </DroppableArea>
//         </div>
//       </section>
//     </DndContext>
//   );
// };

// export default FootballComponent;
