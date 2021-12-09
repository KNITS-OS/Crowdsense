import { axiosInstance } from ".";
import {
  ICandidate,
  IUpdateCandidateStatusParams,
  IUpdateCandidateParams,
} from "types/types";
import { candidatesTable } from "variables";

/**
 * @description Update multible candidates
 */
export const updateCandidatesMutation = async (
  updatedCandidates: ICandidate[],
) => {
  const { data } = await axiosInstance.post(
    candidatesTable,
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
  reqId,
  status,
}: IUpdateCandidateStatusParams) => {
  await axiosInstance.post(
    candidatesTable,
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
 * @description Update the status of a candidate
 */
export const updateCandidateMutation = async ({
  reqId,
  body,
}: IUpdateCandidateParams) => {
  await axiosInstance.post(
    candidatesTable,
    {
      reqId,
      ...body,
    },
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );
};
