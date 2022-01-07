import { ApplicationsPage } from ".";

export const applicationsMenu = [
  {
    collapse: true,
    name: "Applications",
    icon: "ni ni-chart-pie-35 text-info",
    state: "applicationCollapse",
    views: [
      {
        path: "/applications",
        name: "Applications",
        miniName: "A",
        component: ApplicationsPage,
        layout: "/admin",
      },
    ],
  },
];
