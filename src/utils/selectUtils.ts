import {
  ICandidateCVStatus,
  ICandidateDeclinedStatus,
  ICandidateInterviewStatus,
  ICandidateOfferStatus,
  ICandidateRating,
  ICandidateStatus,
  OptionType,
} from "types/types";

export const candidatesWithCVStatus: ICandidateCVStatus[] = [
  "CV Review",
  "CV Reviewed",
];
export const candidatesWithInterviewStatus: ICandidateInterviewStatus[] = [
  "Ready For Interview",
  "Interview Offered",
  "Interview Booked",
  "Interview Performed",
];

export const candidatesWithOfferStatus: ICandidateOfferStatus[] = [
  "Ready To Offer",
  "Offer Sent",
  "Offer Accepted",
  "Offer Declined",
];

export const candidatesWithDeclinedStatus: ICandidateDeclinedStatus[] = [
  "Declined By Candidate",
  "Declined By Reviewer",
];

export const candidatesWithAllStatuses: ICandidateStatus[] = [
  ...candidatesWithCVStatus,
  ...candidatesWithInterviewStatus,
  ...candidatesWithOfferStatus,
  ...candidatesWithDeclinedStatus,
];

export const getSelectStatus = (statuses: ICandidateStatus[]) =>
  statuses.map(status => {
    return {
      value: status,
      label: status,
    };
  }) as OptionType[];

export const selectRatingArray: ICandidateRating[] = [1, 2, 3, 4, 5];

export const getSelectRating: any = selectRatingArray.map(status => {
  return {
    value: status.toString(),
    label: status.toString(),
  };
});
