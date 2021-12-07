import {
  ICandidateCVStatus,
  ICandidateInterviewStatus,
  ICandidateOfferStatus,
  ICandidateDeclinedStatus,
  ICandidateStatus,
  IWorkflowCandidates,
} from "types/types";

export const CV_REVIEW = "CV Review";
export const CV_REVIEWED = "CV Reviewed";

export const READY_FOR_INTERVIEW = "Ready For Interview";
export const INTERVIEW_OFFERED = "Interview Offered";
export const INTERVIEW_BOOKED = "Interview Booked";
export const INTERVIEW_PERFORMED = "Interview Performed";

export const READY_TO_OFFER = "Ready To Offer";
export const OFFER_SENT = "Offer Sent";
export const OFFER_ACCEPTED = "Offer Accepted";
export const OFFER_DECLINED = "Offer Declined";

export const DECLINED_BY_CANDIDATE = "Declined By Candidate";
export const DECLINED_BY_REVIEWER = "Declined By Reviewer";

export const candidatesWithCVStatus: ICandidateCVStatus[] = [
  CV_REVIEW,
  CV_REVIEWED,
];
export const candidatesWithInterviewStatus: ICandidateInterviewStatus[] = [
  READY_FOR_INTERVIEW,
  INTERVIEW_OFFERED,
  INTERVIEW_BOOKED,
  INTERVIEW_PERFORMED,
];

export const candidatesWithOfferStatus: ICandidateOfferStatus[] = [
  READY_TO_OFFER,
  OFFER_SENT,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
];

export const candidatesWithDeclinedStatus: ICandidateDeclinedStatus[] = [
  DECLINED_BY_CANDIDATE,
  DECLINED_BY_REVIEWER,
];

export const candidatesWithAllStatuses: ICandidateStatus[] = [
  ...candidatesWithCVStatus,
  ...candidatesWithInterviewStatus,
  ...candidatesWithOfferStatus,
  ...candidatesWithDeclinedStatus,
];

export const cvWorkflowState: IWorkflowCandidates[] = [
  { status: CV_REVIEW, candidates: [] },
  { status: CV_REVIEWED, candidates: [] },
];

export const interviewWorkflowState: IWorkflowCandidates[] = [
  { status: READY_FOR_INTERVIEW, candidates: [] },
  { status: INTERVIEW_OFFERED, candidates: [] },
  { status: INTERVIEW_BOOKED, candidates: [] },
  { status: INTERVIEW_PERFORMED, candidates: [] },
];

export const offerWorkflowState: IWorkflowCandidates[] = [
  { status: READY_TO_OFFER, candidates: [] },
  { status: OFFER_SENT, candidates: [] },
  { status: OFFER_ACCEPTED, candidates: [] },
  { status: OFFER_DECLINED, candidates: [] },
];
