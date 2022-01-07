import {
  ICandidate,
  IGetWorkflowCandidatesParams,
  IUpdateCandidateParams,
} from "types/types";
import { candidatesTable, tagsTable } from "variables/tableVariables";
import { axiosInstance } from ".";

/**
 * @description Update single candidate
 */
export const updateCandidateMutation = async ({
  reqId,
  body,
}: IUpdateCandidateParams) => {
  await axiosInstance.patch(
    candidatesTable,
    [
      {
        reqId,
        ...body,
      },
    ],
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );
};

/**
 * @description Update multible candidates
 */
export const updateCandidatesMutation = async (
  updatedCandidates: ICandidate[],
) => {
  const { data } = await axiosInstance.patch(
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
 * @description Update single candidate
 */
export const getWorkflowCandidatesMutation = async ({
  reqIds,
}: IGetWorkflowCandidatesParams) => {
  await axiosInstance.post(
    candidatesTable,
    {
      reqIds,
    },
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );
};

/**
 * @description Update single candidate
 */
export const createTagMutation = async ({ name }: { name: string }) => {
  const { data } = await axiosInstance.post(
    tagsTable,
    { name },
    {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    },
  );
  return data;
};
