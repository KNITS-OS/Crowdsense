import {
  ICandidateRating,
  ICandidateStatus,
  OptionType,
} from "types/types";

export const getSelectStatus = (statuses: ICandidateStatus[]) =>
  statuses.map(status => {
    return {
      value: status,
      label: status,
    };
  }) as OptionType[];

const selectRatingArray: ICandidateRating[] = [1, 2, 3, 4, 5];

export const getSelectRating: any = selectRatingArray.map(status => {
  return {
    value: status.toString(),
    label: status.toString(),
  };
});
