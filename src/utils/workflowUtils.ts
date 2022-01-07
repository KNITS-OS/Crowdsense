import {
  ICandidate,
  ICandidateStatus,
  ICheckStatusParams,
  IRemoveCandidateOnLastLaneParams,
  IWorkflowCandidates,
  IWorkflowRoutes,
} from "types/types";
import {
  READY_FOR_INTERVIEW,
  READY_TO_OFFER,
} from "variables/statusVariables";

import {
  getCandidatesByStatus,
  getCandidatesByStatusAndIds,
} from "./axios";

/**
 * @description Remove the candidate when card gets moved to the last lane
 */
export const removeCandidateFromLane = ({
  laneId,
  workflow,
  cardId,
  eventBus,
}: IRemoveCandidateOnLastLaneParams) => {
  // declined by candidate
  const lastLaneId1 = workflow.lanes[workflow.lanes.length - 1].id;
  // declined by reviewer
  const lastLaneId2 = workflow.lanes[workflow.lanes.length - 2].id;
  // to next workflow
  const lastLaneId3 = workflow.lanes[workflow.lanes.length - 3].id;

  if (laneId === lastLaneId1) {
    // if true, remove the card
    eventBus.publish({
      type: "REMOVE_CARD",
      laneId,
      cardId,
    });
  } else if (laneId === lastLaneId2) {
    eventBus.publish({
      type: "REMOVE_CARD",
      laneId,
      cardId,
    });
  } else if (
    laneId === lastLaneId3 &&
    (laneId === READY_FOR_INTERVIEW || laneId === READY_TO_OFFER)
  ) {
    eventBus.publish({
      type: "REMOVE_CARD",
      laneId,
      cardId,
    });
  }
};

/**
 * @description creates a query string from given candidate ids
 * @param route given route, where the workflow is
 * @param selectedCandidates array of selected candidates
 */
export const createQueryStringForWorkflow = (
  workflowRoute: IWorkflowRoutes,
  selectedCandidates: ICandidate[],
  defaultStatuses: ICandidateStatus[],
) => {
  let queryString = `${workflowRoute}/`;

  defaultStatuses
    .map(status => {
      return {
        status,
        candidateIds: selectedCandidates
          .map(candidate => {
            if (candidate.status === status) return candidate.reqId;
            else return null;
          })
          .filter(candidate => candidate !== null),
      };
    })
    .forEach(element => {
      if (element.candidateIds.length > 0) {
        // queryString += `${
        //   element.status
        // }=${element.candidateIds.toString()}&`;
        queryString += `${element.candidateIds.toString()}/`;
      } else {
        queryString += `null/`;
      }
    });

  return queryString;
};

/**
 *
 * @param workflowPath
 * @param statuses
 * @returns "cv-workflow/:CVReviewIds/:CVReviewedIds" based on the order that was passed into statuses
 */
export const workflowRoute = (
  workflowPath: IWorkflowRoutes,
  statuses: ICandidateStatus[],
) => {
  let routeString = `${workflowPath}`;
  statuses.forEach(status => {
    routeString += `/:${status.replace(/ /g, "")}Ids`;
  });

  return routeString;
};

export const checkStatusParam = async ({
  statusParam,
  status,
}: ICheckStatusParams) => {
  let res;
  if (statusParam === "null") {
    // gets all candidates with the status
    const { data } = await getCandidatesByStatus({
      status,
      order: "fullName",
    });
    res = data;
  } else {
    // only gets the selected candidates
    const { data } = await getCandidatesByStatusAndIds({
      candidateIds: statusParam,
      status,
      order: "fullName",
    });
    res = data;
  }
  return res;
};

const createCards = (
  data: ICandidate[],
  laneId: ICandidateStatus,
): ReactTrello.Card[] =>
  data.map(candidate => ({
    laneId,
    id: candidate.reqId,
    title: candidate.firstName,
    description: candidate.email,
    label: candidate.country,
  }));

export const createLane = (
  data: ICandidate[],
  laneId: ICandidateStatus,
): ReactTrello.Lane => {
  return {
    id: laneId,
    title: laneId,
    disallowAddingCard: true,
    cards: createCards(data, laneId),
  };
};

export const createDefaultLanes = (candidates: IWorkflowCandidates[]) => {
  let lanes: Array<ReactTrello.Lane> = [];
  candidates.forEach(candidate => {
    lanes.push(createLane(candidate.candidates, candidate.status));
  });
  return lanes;
};

export const declineLanes = () => {
  return [
    createLane([], "Declined By Reviewer"),
    createLane([], "Declined By Candidate"),
  ];
};

/**
 * @description this function is called when the page is rendered (useEffect[]).
 * To put the data from api into trelloBoard lane based on the status
 */
export const setCandidateLane = (
  oldLanes: IWorkflowCandidates[],
  status: ICandidateStatus,
  data: ICandidate[],
) => {
  // find the index of a lane that matches the status
  let laneIndex = oldLanes.findIndex(lane => lane.status === status);
  let oldLane = oldLanes[laneIndex];

  // create a updatedLane object that has the old status and new candidates data
  let updatedLane: IWorkflowCandidates = {
    ...oldLane,
    candidates: data,
  };

  // replace the old lane with the new one
  oldLanes.splice(laneIndex, 1, updatedLane);

  return [...oldLanes];
};

export const cvWorkflow = (
  candidateLanes: IWorkflowCandidates[],
): ReactTrello.BoardData => {
  return {
    lanes: [
      ...createDefaultLanes(candidateLanes),
      createLane([], READY_FOR_INTERVIEW),
      ...declineLanes(),
    ],
  };
};

export const interviewWorkflow = (
  candidateLanes: IWorkflowCandidates[],
): ReactTrello.BoardData => {
  return {
    lanes: [
      ...createDefaultLanes(candidateLanes),
      createLane([], READY_TO_OFFER),
      ...declineLanes(),
    ],
  };
};

export const offerWorkflow = (
  candidateLanes: IWorkflowCandidates[],
): ReactTrello.BoardData => {
  return {
    lanes: [...createDefaultLanes(candidateLanes), ...declineLanes()],
  };
};

export const getWorkflowLaneData = async (
  state: ICandidate[],
  status: ICandidateStatus,
  setCandidateLanes: React.Dispatch<
    React.SetStateAction<IWorkflowCandidates[]>
  >,
) => {
  let data = state.filter(candidate => candidate.status === status);

  if (data.length === 0) {
    let res = await getCandidatesByStatus({
      status,
      order: "fullName",
    });

    data = res.data;
  }

  setCandidateLanes(oldLanes => setCandidateLane(oldLanes, status, data));
};
