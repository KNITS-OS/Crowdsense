import { InterviewSearchPage, InterviewWorkflowPage } from ".";
import { INTERVIEW_WORKFLOW } from "variables";
import { IRoute } from "types/types";

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
