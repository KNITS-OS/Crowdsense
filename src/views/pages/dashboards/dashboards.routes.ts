import { ChartsPage, WorldOverviewPage } from ".";
import { IRoute } from "types/types";

export const dashboardsMenu: IRoute[] = [
  {
    collapse: true,
    name: "Dashboard",
    icon: "ni ni-chart-pie-35 text-primary",
    state: "dashboardCollapse",
    views: [
      {
        path: "/statistics",
        name: "Charts",
        miniName: "NB",
        component: ChartsPage,
        layout: "/admin",
      },
      {
        path: "/world-view",
        name: "World Overview",
        miniName: "WV",
        component: WorldOverviewPage,
        layout: "/admin",
      },
    ],
  },
];
