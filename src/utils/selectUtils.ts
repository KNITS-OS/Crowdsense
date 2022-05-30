import {
  ICandidateRating,
  ICandidateStatus,
  IKNCareerStatus,
  OptionType,
} from "types/types";

export const selectStatusArray: ICandidateStatus[] | IKNCareerStatus[] = [
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

export const selectRatingArray: ICandidateRating[] = [1, 2, 3, 4, 5];

export const getSelectRating: OptionType[] = selectRatingArray.map(status => {
  return {
    value: status.toString(),
    label: status.toString(),
  };
});

export const findSelectValue = (selectArr:OptionType[], inputValue:string) => {
  return  selectArr.some(val => val.value.includes(inputValue))
}
