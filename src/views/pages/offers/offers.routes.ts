import { OfferSearchPage, OfferWorkflowPage } from ".";
import { OFFER_WORKFLOW } from "variables";
import { IRoute } from "types/types";

export const offerMenu: IRoute[] = [
  {
    collapse: true,
    name: "Offer",
    state: "offerCollapse",
    icon: "ni ni-chart-pie-35 text-primary",
    views: [
      {
        name: "Search",
        miniName: "SC",
        path: "/offer-search",
        component: OfferSearchPage,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: false,
    global: true,
    path: OFFER_WORKFLOW,
    component: OfferWorkflowPage,
    layout: "/admin",
  },
];
