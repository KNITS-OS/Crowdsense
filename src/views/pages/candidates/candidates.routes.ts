import { AllCandidatesSearchPage, CandidateDetailsPage } from ".";
import { IRoute } from "types/types";

export const candidatesMenu: IRoute[] = [
  {
    collapse: true,
    name: "Candidates",
    icon: "ni ni-chart-pie-35 text-primary",
    state: "candidatesCollapse",
    views: [
      // @todo add dashboard route
      {
        path: "/candidates-search",
        name: "Search",
        miniName: "CS",
        component: AllCandidatesSearchPage,
        layout: "/admin",
      },
      // {
      //   path: "/create-candidate",
      //   name: "Create",
      //   miniName: "CR",
      //   component: CreateCandidatePage,
      //   layout: "/admin",
      // },
    ],
  },
  {
    collapse: false,
    global: true,
    path: "/candidate-details/:id",
    component: CandidateDetailsPage,
    layout: "/admin",
  },
];
