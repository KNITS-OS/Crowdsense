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
  collapse: boolean;
  name?: string;
  icon?: string;
  state?: string;
  views?: IView[];
  miniName?: string;
  global?: boolean;
  path?: string;
  component?: ReactNode;
  layout?: LayoutType;
}

export type Theme = "light" | "dark";

export type ICandidateStatus = "Closed" | "In Review" | "New";
export type ICandidateRating = "1" | "2" | "3" | "4" | "5";

export interface ICandidate {
  reqId: string;
  firstName: string;
  fullName: string;
  rating: ICandidateRating;
  comment: string;
  email: string;
  submissionDate: string;
  status: ICandidateStatus;
  country: string;
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
}

export type IFilter =
  | "eq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "neq"
  | "like"
  | "ilike"
  | "in"
  | "is"
  | "cs"
  | "cd";
