import Board from "react-trello";
import { ICandidate, ICandidateStatus, ITrello } from "types/types";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils";
import { addFilter } from "redux/filters";
import { trelloDefaults } from "variables";
import { useParams } from "react-router";

interface RouteParams {
  candidateIds: string | undefined;
}

const WorkflowPageCV = () => {
  const { candidateIds } = useParams<RouteParams>();
  const table = "/candidates2";
  const [eventBus, setEventBus] = useState(undefined);

  const [cvReviewCandidates, setCVReviewCandidates] = useState<
    ICandidate[]
  >([]);
  const [cvReviewedCandidates, setCVReviewedCandidates] = useState<
    ICandidate[]
  >([]);

  useEffect(() => {
    const fetchCVReviewedCandidates = async () => {
      const statusFilter = addFilter({
        param: "CV Reviewed",
        filter: "eq",
      });

      const filters = {
        status: statusFilter,
        order: "firstName.asc",
      };

      let { data } = await axiosInstance.get<ICandidate[]>(table, {
        params: {
          select: "*",
          ...filters,
        },
      });

      setCVReviewedCandidates(data);
    };

    const fetchAllCVReviewCandidates = async () => {
      const statusFilter = addFilter({
        param: "CV Review",
        filter: "eq",
      });

      const filters = {
        status: statusFilter,
        order: "firstName.asc",
      };

      let { data } = await axiosInstance.get<ICandidate[]>(table, {
        params: {
          select: "*",
          ...filters,
        },
      });

      setCVReviewCandidates(data);
    };

    const fetchCVReviewCandidatesByIds = async () => {
      const statusFilter = addFilter({
        param: "CV Review",
        filter: "eq",
      });
      const reqIdFilter = addFilter({
        param: [candidateIds] as any,
        filter: "in",
      });

      const filters = {
        status: statusFilter,
        reqId: reqIdFilter,
      };
      let { data } = await axiosInstance.get(table, {
        params: {
          select: "*",
          ...filters,
        },
      });
      setCVReviewCandidates(data);
    };

    fetchCVReviewedCandidates();

    if (candidateIds === "null" || candidateIds === ":candidateIds") {
      fetchAllCVReviewCandidates();
    } else {
      fetchCVReviewCandidatesByIds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cvWorkflow: ITrello = {
    lanes: [
      {
        id: "CV Review",
        title: "CV Review",
        disallowAddingCard: true,
        cards: cvReviewCandidates.map(candidate => ({
          laneId: "CV Review",
          id: candidate.reqId,
          title: candidate.firstName,
          description: candidate.email,
          label: candidate.country,
        })),
      },
      {
        id: "CV Reviewed",
        title: "CV Reviewed",
        disallowAddingCard: true,
        cards: cvReviewedCandidates.map(candidate => ({
          laneId: "CV Reviewed",
          id: candidate.reqId,
          title: candidate.firstName,
          description: candidate.email,
          label: candidate.country,
        })),
      },
      {
        id: "Ready for interview",
        title: "Ready for interview",
        disallowAddingCard: true,
        cards: [],
      },
    ],
  };

  return (
    <>
      {/* https://github.com/rcdexta/react-trello#properties */}
      <Board
        data={cvWorkflow}
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
          // update the card status
          await axiosInstance.post(
            table,
            {
              reqId: cardId,
              status: toLaneId,
            },
            {
              headers: {
                prefer: "resolution=merge-duplicates",
              },
            },
          );
          // check if its the last lane
          if (
            toLaneId === cvWorkflow.lanes[cvWorkflow.lanes.length - 1].id
          ) {
            // if true, then remove the card
            // @ts-ignore
            eventBus.publish({
              type: "REMOVE_CARD",
              laneId: toLaneId,
              cardId: cardId,
            });
          }
        }}
      />
    </>
  );
};
export default WorkflowPageCV;
