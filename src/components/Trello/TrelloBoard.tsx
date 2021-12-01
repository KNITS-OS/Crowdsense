import { useState } from "react";
import Board from "react-trello";
import {
  ICandidateStatus,
  IEventBus,
  ITableColumn,
  ITrello,
} from "types/types";
import { removeCandidateOnLastLane, updateCandidateStatus } from "utils";
import { trelloDefaults } from "variables";

interface Props {
  workflow: ITrello;
  table: ITableColumn;
}

const TrelloBoard = ({ workflow, table }: Props) => {
  const [eventBus, setEventBus] = useState<IEventBus>();
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
