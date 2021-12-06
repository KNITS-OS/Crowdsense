import { axiosInstance } from ".";
import {
  ICandidate,
  ITableColumn,
  IUpdateCandidateStatusParams,
} from "types/types";

/**
 * @description Update multible candidates
 */
export const updateCandidatesMutation = async (
  table: ITableColumn,
  updatedCandidates: ICandidate[],
) => {
  const { data } = await axiosInstance.post(
    table,
    [...updatedCandidates],
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );

  return {
    data,
  };
};

/**
 * @description Update the status of a candidate
 */
export const updateCandidateStatusMutation = async ({
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
