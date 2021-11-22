import { ChartData, ChartOptions } from "chart.js";
import { CSSProperties, ReactNode } from "react";

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

export type ICandidateStatus =
  // CV Page has candidates with these statuses
  | "CV Review"
  | "CV Reviewed"
  | "Ready for interview"
  // Interview Page has candidates with these statuses
  | "Interview Booked"
  | "Interview performed"
  | "Interview Offered"
  | "Ready to Offer"
  // Offer Page has candidates with these statuses
  | "Offer sent"
  | "Offer Accepted"
  | "Offer Declined"
  // All Pages have candidates with these statuses
  | "Declined By Candidate"
  | "Declined By Reviewer";

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

export interface ITrelloTags {
  bgcolor: string;
  color: string;
  title: string;
}

export interface ITrelloCard {
  id: string;
  laneId: string;
  label: string;
  title: string;
  description?: string;
  cardColor?: string;
  body?: string;
  style?: CSSProperties;
  cardStyle?: CSSProperties;
  dueOn?: string;
  escalationText?: string;
  metadata?: {
    id?: string;
    completedAt?: string;
    shortCode?: string;
  };
  name?: string;
  subTitle?: string;
  tags?: ITrelloTags[];
}

export interface ITrelloLane {
  id: string;
  cards: ITrelloCard[];
  title: string;
  label?: string;
  style?: CSSProperties;
  currentPage?: number;
  disallowAddingCard?: boolean;
  titleStyle?: CSSProperties;
  lableStyle?: CSSProperties;
  target?: string;
  current?: string;
}
export interface ITrello {
  lanes: ITrelloLane[];
}
