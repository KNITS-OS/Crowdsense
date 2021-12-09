import { useState } from "react";
import Board from "react-trello";
import { ICandidateStatus } from "types/types";
import { removeCandidateFromLane } from "utils";
import { trelloDefaults } from "variables";
import { updateCandidateStatusMutation } from "../../utils/axios";

interface Props {
  workflow: ReactTrello.BoardData;
}

const CandidatesTrelloBoard = ({ workflow }: Props) => {
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
        updateCandidateStatusMutation({
          reqId: cardId,
          status: toLaneId,
        });

        if (eventBus) {
          removeCandidateFromLane({
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
export default CandidatesTrelloBoard;
