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
  "Interview Booked",
  "Interview performed",
  "Interview Offered",
  "Ready for interview",
];

export const candidatesWithOfferStatus: ICandidateOfferStatus[] = [
  "Offer sent",
  "Offer Accepted",
  "Offer Declined",
  "Ready to Offer",
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
