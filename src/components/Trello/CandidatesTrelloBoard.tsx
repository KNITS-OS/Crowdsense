import { useState } from "react";
import Board from "react-trello";
import { ICandidateStatus } from "types/types";

import { trelloDefaults } from "variables/workflowDefaults";
import {
  updateCandidateMutation,
  getCandidateByIdQuery,
} from "utils/axios";
import { removeCandidateFromLane } from "utils/workflowUtils";

interface Props {
  workflow: ReactTrello.BoardData;
}

export const CandidatesTrelloBoard = ({ workflow }: Props) => {
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
        _: ICandidateStatus,
        toLaneId: ICandidateStatus,
        cardId: string,
        __: number,
      ) => {
        const { data } = await getCandidateByIdQuery(cardId);

        await updateCandidateMutation({
          reqId: cardId,
          body: {
            ...data,
            status: toLaneId,
          },
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
