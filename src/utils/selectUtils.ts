import {
  ICandidateRating,
  ICandidateStatus,
  OptionType,
} from "types/types";

export const selectStatusArray: ICandidateStatus[] = [
  "Closed",
  "In Review",
  "New",
];

export const getSelectStatus: OptionType[] = selectStatusArray.map(
  status => {
    return {
      value: status,
      label: status,
    };
  },
);

export const selectRatingArray: ICandidateRating[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
];

export const getSelectRating: OptionType[] = selectRatingArray.map(
  status => {
    return {
      value: status,
      label: status,
    };
  },
);
