import { HomePage } from ".";
import { IRoute } from "types/types";

export const homeMenu: IRoute[] = [
  {
    collapse: false,
    path: "/home",
    name: "Home",
    miniName: "HO",
    component: HomePage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-primary",
  },
];
