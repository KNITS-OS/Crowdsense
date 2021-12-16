import { ICandidate, IUpdateCandidateParams } from "types/types";
import { candidatesTable } from "variables";
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
