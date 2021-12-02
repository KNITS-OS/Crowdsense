import { useState } from "react";
import { ICandidateStatus, ITableColumn } from "types/types";
import { removeCandidateOnLastLane, updateCandidateStatus } from "utils";
import { trelloDefaults } from "variables";
import Board from "react-trello";

interface Props {
  workflow: any;
  table: ITableColumn;
}

const TrelloBoard = ({ workflow, table }: Props) => {
  const [eventBus, setEventBus] = useState<any>();
  return (
    // https://github.com/rcdexta/react-trello#properties
    <Board
      data={workflow}
      draggable
      editable={false}
      hideCardDeleteIcon
      laneDraggable={false}
      style={trelloDefaults.trelloBoardDefaults}
      laneStyle={trelloDefaults.trelloLaneDefaults.style}
      cardStyle={trelloDefaults.trelloCardDefaults.style}
      tagStyle={trelloDefaults.trelloTagDefaults}
      // https://github.com/rcdexta/react-trello#publish-events
      eventBusHandle={setEventBus}
      onCardMoveAcrossLanes={async (
        fromLaneId: ICandidateStatus,
        toLaneId: ICandidateStatus,
        cardId: string,
        index: number,
      ) => {
        updateCandidateStatus({
          table,
          reqId: cardId,
          status: toLaneId,
        });

        if (eventBus) {
          removeCandidateOnLastLane({
            workflow,
            laneId: toLaneId,
            cardId,
            eventBus,
          });
        }
      }}
    />
  );
};
export default TrelloBoard;
