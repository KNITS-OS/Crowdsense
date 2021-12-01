import {
  ICandidateRating,
  ICandidateStatus,
  OptionType,
} from "types/types";

export const selectStatusArray: ICandidateStatus[] = [
  // CV Page has candidates with these statuses
  "CV Review",
  "CV Reviewed",
  // Interview Page has candidates with these statuses
  "Ready for interview",
  "Interview Booked",
  "Interview performed",
  "Interview Offered",
  // Offer Page has candidates with these statuses
  "Ready to Offer",
  "Offer sent",
  "Offer Accepted",
  "Offer Declined",
  // All Pages have candidates with these statuses
  "Declined By Candidate",
  "Declined By Reviewer",
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

export const getSelectRating: any = selectRatingArray.map(status => {
  return {
    value: status.toString(),
    label: status.toString(),
  };
});
