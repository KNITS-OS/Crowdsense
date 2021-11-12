import { ReactNode } from "react";

export type LayoutType = "/admin" | "/auth" | "/rtl";

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

export interface ICanditate {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  submissionDate: string;
  status: string;
  rating: string;
  tags: string;
  comment: string;
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
