import { axiosInstance } from ".";
import {
  ICandidate,
  IRemoveCandidateOnLastLaneParams,
  IUpdateCandidateStatusParams,
  IFetchOrderedCandidatesByStatusParams,
  IWorkflowRoutes,
} from "types/types";
import { addFilter } from "redux/filters";

/**
 * @description Update the status of a candidate
 */
export const updateCandidateStatus = async ({
  table,
  reqId,
  status,
}: IUpdateCandidateStatusParams) => {
  await axiosInstance.post(
    table,
    {
      reqId,
      status,
    },
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );
};

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
 * @description Fetches Ordered Candidates By Status
 * @param asc default true
 */
export const fetchOrderedCandidatesByStatus = async ({
  status,
  table,
  order,
  asc = true,
}: IFetchOrderedCandidatesByStatusParams) => {
  const statusFilter = addFilter({
    param: status,
    filter: "eq",
  });

  let finalOrder;

  if (asc) {
    finalOrder = `${order}.asc`;
  } else {
    finalOrder = `${order}.desc`;
  }

  const filters = {
    status: statusFilter,
    order: finalOrder,
  };

  let res = await axiosInstance.get<ICandidate[]>(table, {
    params: {
      select: "*",
      ...filters,
    },
  });

  return res;
};

/**
 * @description Move selected candidates to given workflow page
 * @param route given route, where the workflow is
 * @param selectedRows array of selected candidates
 */
export const moveCandidatesToWorkflow = (
  route: IWorkflowRoutes,
  selectedRows: ICandidate[],
  history: any,
) => {
  // dispatch(addCandidatesToCVWorkflow(selectedRows));
  const candidateIds = selectedRows.map(candidate => candidate.reqId);

  // if user selected any candidates
  if (candidateIds.length > 0) {
    history.push(`${route}/${candidateIds.toString()}`);
  } else {
    history.push(`${route}/null`);
  }
};
