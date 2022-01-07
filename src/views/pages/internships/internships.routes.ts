import { InternshipPage } from ".";
import { IRoute } from "types/types";

export const internshipMenu: IRoute[] = [
  {
    collapse: true,
    name: "Internship",
    miniName: "IN",
    state: "internshipCollapse",
    icon: "ni ni-chart-pie-35 text-primary",
    views: [
      // @todo add dashboard route
      {
        path: "/internship",
        name: "Search",
        miniName: "Search",
        component: InternshipPage,
        layout: "/admin",
      },
    ],
  },
];
