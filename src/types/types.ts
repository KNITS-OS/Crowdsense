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
