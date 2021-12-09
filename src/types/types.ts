import { ChartData, ChartOptions } from "chart.js";
import { ReactNode } from "react";

export type LayoutType = "/admin" | "/auth" | "/rtl";
export type StringOrUndefined = string | undefined;
export interface IView {
  path: string;
  name: string;
  miniName: string;
  component: ReactNode;
  layout: LayoutType;
}

export interface IRoute {
  collapse?: boolean;
  name?: string;
  icon?: string;
  state?: string;
  views?: IRoute[];
  miniName?: string;
  global?: boolean;
  path?: string;
  component?: ReactNode;
  layout?: LayoutType;
}

export type Theme = "light" | "dark";

/**
 * @description CV Page has candidates with these statuses
 */
export type ICandidateCVStatus = "CV Review" | "CV Reviewed";

/**
 * @description Interview Page has candidates with these statuses
 */
export type ICandidateInterviewStatus =
  | "Ready For Interview"
  | "Interview Booked"
  | "Interview Performed"
  | "Interview Offered";

/**
 * @description Offer Page has candidates with these statuses
 */
export type ICandidateOfferStatus =
  | "Ready To Offer"
  | "Offer Sent"
  | "Offer Accepted"
  | "Offer Declined";

/**
 * @description All Pages have candidates with these statuses
 */
export type ICandidateDeclinedStatus =
  | "Declined By Candidate"
  | "Declined By Reviewer";

/**
 * @description All Statuses
 */
export type ICandidateStatus =
  | ICandidateCVStatus
  | ICandidateInterviewStatus
  | ICandidateOfferStatus
  | ICandidateDeclinedStatus;

export interface IWorkflowCandidates {
  status: ICandidateStatus;
  candidates: ICandidate[];
}

export interface ITag {
  id: number;
  candidateId: string;
  value: string;
  label: string;
  createdAt: Date;
}

export type IKNCareerStatus = "New" | "Closed" | "In Review";

export type ICandidateRating = 0 | 1 | 2 | 3 | 4 | 5 | number;

export interface ICandidate {
  reqId: string;
  firstName: string;
  fullName: string;
  email: string;
  submissionDate: string;
  status: ICandidateStatus;
  country: string;
  rating?: ICandidateRating;
  comment?: string;
}

export interface IEvent {
  id: number;
  title: string;
  className: string;
  start: Date;
  allDay: boolean;
  description: string;
}

export interface IWidgetEvent {
  title: string;
  className: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
}

export interface IDataTable {
  name: string;
  position: string;
  office: string;
  age: string;
  start_date: string;
  salary: string;
}

export interface ILineChart {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
}
export interface IBarChart {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
}
export interface IDoughnutChart {
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
}
export interface IPieChart {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface ICandidateFilters {
  fullName: StringOrUndefined;
  rating: StringOrUndefined;
  status: StringOrUndefined;
  email: StringOrUndefined;
}

export type ISimpleFilter =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "is";

export type IArrayFilter = "in" | "cs" | "cd";

export type ILikeFilter = "like" | "ilike";

export interface ICreateCandidateInitialState {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  status: ICandidateStatus | "";
  rating: ICandidateRating | "";
  comment: string;
  submissionDate: string;
}

export interface ICreateCandidateFinalState {
  reqId?: string;
  firstName: string;
  fullName: string;
  email: string;
  country: string;
  status: ICandidateStatus | "";
  rating: ICandidateRating | "";
  comment: string;
  submissionDate: string;
}

export type ITableColumn = "candidates" | "tags";

export type IWorkflowRoutes =
  | "/admin/cv-workflow"
  | "/cv-workflow"
  | "/admin/interview-workflow"
  | "/interview-workflow"
  | "/admin/offer-workflow"
  | "/offer-workflow";

export type IRoutePaths =
  | "/candidate-details/:id"
  | "/home"
  | "/candidates-search"
  | "/add-new-cv"
  | "/import-cv"
  | "/cv-search"
  | "/interview-search"
  | "/offer-search"
  | "/internship"
  | "/docx"
  | "/statistics"
  | "/world-view"
  | "/care-member-details/:id";

export type ISelectRowConfig = {
  status: ICandidateStatus;
};

export interface IUpdateCandidateStatusParams {
  reqId: string;
  status: ICandidateStatus;
}
export interface IUpdateCandidateParams {
  reqId: string;
  body: Partial<ICandidate>;
}

export interface IUpdateCandidateUIParams {
  reqId: string;
  body: Partial<ICandidate>;
}

export type IUseSetCandidate = React.Dispatch<
  React.SetStateAction<ICandidate[]>
>;

export interface IRemoveCandidateOnLastLaneParams {
  workflow: ReactTrello.BoardData;
  laneId: ICandidateStatus;
  cardId: string;
  eventBus: ReactTrello.EventBus;
}

export type ICandidateOrder =
  | "firstName"
  | "lastName"
  | "country"
  | "rating";

export interface IGetCandidatesByStatusParams {
  status: ICandidateStatus;
  order: ICandidateOrder;
  asc?: boolean;
}
export interface IGetCandidatesByStatusAndIdsParams {
  candidateIds: string;
  status: ICandidateStatus;
  order: ICandidateOrder;
  asc?: boolean;
}

export interface ICheckStatusParams {
  statusParam: string;
  status: ICandidateStatus;
  order: ICandidateOrder;
}
