import { axiosInstance } from ".";
import {
  ICandidate,
  IRemoveCandidateOnLastLaneParams,
  IUpdateCandidateStatusParams,
  IFetchOrderedCandidatesByStatusParams,
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
