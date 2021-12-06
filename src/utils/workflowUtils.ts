import {
  ICandidate,
  ICandidateStatus,
  ICheckStatusParams,
  IRemoveCandidateOnLastLaneParams,
  IWorkflowRoutes,
} from "types/types";
import {
  getCandidatesByStatus,
  getCandidatesByStatusAndIds,
} from "./axios";

/**
 * @description Remove the candidate when card gets moved to the last lane
 */
export const removeCandidateOnLastLane = ({
  laneId,
  workflow,
  cardId,
  eventBus,
}: IRemoveCandidateOnLastLaneParams) => {
  // check if its the last lane
  if (laneId === workflow.lanes[workflow.lanes.length - 1].id) {
    // if true, remove the card
    eventBus.publish({
      type: "REMOVE_CARD",
      laneId,
      cardId,
    });
  }
};

/**
 * @description Move selected candidates to given workflow page
 * @param route given route, where the workflow is
 * @param selectedCandidates array of selected candidates
 */
export const moveCandidatesToWorkflow = (
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

export const workflowRoute = (
  workflowPath: IWorkflowRoutes,
  statuses: ICandidateStatus[],
) => {
  let routeString = `${workflowPath}`;
  statuses.forEach(status => {
    routeString += `/:${status.replace(" ", "")}`;
  });
  console.log("routestring", routeString);

  return routeString;
};

export const checkStatusParam = async ({
  statusParam,
  table,
  status,
  order,
}: ICheckStatusParams) => {
  let res;
  if (statusParam === "null") {
    const { data } = await getCandidatesByStatus({ order, status, table });
    res = data;
  } else {
    const { data } = await getCandidatesByStatusAndIds({
      table,
      candidateIds: statusParam,
      status,
      order,
    });
    res = data;
  }
  return res;
};

const createCards = (data: ICandidate[], laneId: ICandidateStatus) =>
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
) => {
  return {
    id: laneId,
    title: laneId,
    disallowAddingCard: true,
    cards: createCards(data, laneId),
  };
};
