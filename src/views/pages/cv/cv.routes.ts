import {
  AddNewCVPage,
  ImportCVPage,
  CVSearchPage,
  CVWorkflowPage,
} from ".";
import { CV_WORKFLOW } from "variables/routeVariables";
import { IRoute } from "types/types";

export const cvMenu: IRoute[] = [
  {
    collapse: true,
    name: "CV",
    icon: "ni ni-chart-pie-35 text-primary",
    state: "cvCollapse",
    views: [
      // @todo add dashboard route
      {
        path: "/add-new-cv",
        name: "Add New",
        miniName: "AD",
        component: AddNewCVPage,
        layout: "/admin",
      },
      {
        path: "/import-cv",
        name: "Import",
        miniName: "I",
        component: ImportCVPage,
        layout: "/admin",
      },

      {
        name: "Search",
        miniName: "SC",
        path: "/cv-search",
        component: CVSearchPage,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: CV_WORKFLOW,
    // path: workflowRoute("/cv-workflow", candidatesWithCVStatus),
    component: CVWorkflowPage,
    layout: "/admin",
  },
];
