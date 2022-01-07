import { InterviewSearchPage, InterviewWorkflowPage } from ".";

import { IRoute } from "types/types";
import { INTERVIEW_WORKFLOW } from "variables/routeVariables";

export const interviewMenu: IRoute[] = [
  {
    collapse: true,
    name: "Interview",
    icon: "ni ni-chart-pie-35 text-primary",
    state: "interviewCollapse",
    views: [
      {
        name: "Search",
        miniName: "SC",
        path: "/interview-search",
        component: InterviewSearchPage,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: INTERVIEW_WORKFLOW,
    component: InterviewWorkflowPage,
    layout: "/admin",
  },
];
