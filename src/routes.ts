/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Buttons from "views/pages/examples/components/Buttons";
import Calendar from "views/pages/examples/components/Calendar";
import Cards from "views/pages/examples/components/Cards";
import Notifications from "views/pages/examples/components/Notifications";
import Timeline from "views/pages/examples/components/Timeline";
import Typography from "views/pages/examples/components/Typography";
import Components from "views/pages/examples/forms/Components";
import Elements from "views/pages/examples/forms/Elements";
import Validation from "views/pages/examples/forms/Validation";
import Pricing from "views/pages/examples/pages/Pricing";
import Profile from "views/pages/examples/pages/Profile";
import { IRoute } from "./types/types";
import {
  AddNewCVPage,
  DetailsPage,
  ExportPage,
  ImportCVPage,
} from "./views/pages/cv";
import { ChartsPage, WorldOverviewPage } from "./views/pages/dashboards";
import { DocxExamplePage } from "./views/pages/Docx";
import EditCareMemberPage from "./views/pages/examples/pages/users/EditCareMemberPage";
import { HomePage } from "./views/pages/home";
import { InternshipPage } from "./views/pages/internships";
import { CandidateDetailsPage, CandidatesPage } from "./views/pages/users";
import { WorkflowPage } from "./views/pages/workflow";

const routes: IRoute[] = [
  // Home
  {
    collapse: false,
    path: "/home",
    name: "Home",
    miniName: "HO",
    component: HomePage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info",
  },
  // Candidates
  {
    collapse: true,
    name: "Candidates",
    icon: "ni ni-chart-pie-35 text-info",
    state: "candidatesCollapse",
    views: [
      // @todo add dashboard route
      {
        path: "/candidates-search",
        name: "Search",
        miniName: "CS",
        component: CandidatesPage,
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

  // CV
  {
    collapse: true,
    name: "CV",
    icon: "ni ni-chart-pie-35 text-info",
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
        collapse: true,
        state: "cvSearchCollapse",
        name: "Search",
        miniName: "SC",
        views: [
          {
            path: "/cv-export",
            name: "Export",
            miniName: "CS",
            component: ExportPage,
            layout: "/admin",
          },
          {
            path: "/cv-details",
            name: "Details",
            miniName: "CS",
            component: DetailsPage,
            layout: "/admin",
          },
          {
            path: "/cv-workflow",
            name: "Workflow",
            miniName: "CS",
            component: WorkflowPage,
            layout: "/admin",
          },
        ],
      },
    ],
  },

  // Interview
  {
    collapse: true,
    name: "Interview",
    icon: "ni ni-chart-pie-35 text-info",
    state: "interviewCollapse",
    views: [
      // @todo add dashboard route
      {
        collapse: true,
        state: "interviewSearchCollapse",
        name: "Search",
        miniName: "SC",
        views: [
          {
            path: "/interview-export",
            name: "Export",
            miniName: "CS",
            component: ExportPage,
            layout: "/admin",
          },
          {
            path: "/interview-details",
            name: "Details",
            miniName: "CS",
            component: DetailsPage,
            layout: "/admin",
          },
          {
            path: "/interview-workflow",
            name: "Workflow",
            miniName: "CS",
            component: WorkflowPage,
            layout: "/admin",
          },
        ],
      },
    ],
  },

  // Offer
  {
    collapse: true,
    name: "Offer",
    state: "offerCollapse",
    icon: "ni ni-chart-pie-35 text-info",
    views: [
      // @todo add dashboard route
      {
        collapse: true,
        state: "offerSearchCollapse",
        name: "Search",
        miniName: "SC",
        views: [
          {
            path: "/offer-export",
            name: "Export",
            miniName: "CS",
            component: ExportPage,
            layout: "/admin",
          },
          {
            path: "/offer-details",
            name: "Details",
            miniName: "CS",
            component: DetailsPage,
            layout: "/admin",
          },
          {
            path: "/offer-workflow",
            name: "Workflow",
            miniName: "CS",
            component: WorkflowPage,
            layout: "/admin",
          },
        ],
      },
    ],
  },

  // Internship
  {
    collapse: true,
    name: "Internship",
    miniName: "IN",
    state: "internshipCollapse",
    icon: "ni ni-chart-pie-35 text-info",
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

  // Docx & Slate
  {
    collapse: true,
    name: "Docx & Slate",
    icon: "ni ni-chart-pie-35 text-info",
    state: "docxCollapse",
    views: [
      {
        path: "/docx",
        name: "Docx",
        miniName: "DO",
        component: DocxExamplePage,
        layout: "/admin",
      },
    ],
  },
  // Dashboard
  {
    collapse: true,
    name: "Dashboard",
    icon: "ni ni-chart-pie-35 text-info",
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
  // Details
  {
    collapse: false,
    global: true,
    path: "/users/candidate-details/:id",
    component: CandidateDetailsPage,
    layout: "/admin",
  },
  {
    collapse: false,
    global: true,
    path: "/users/care-member-details/:id",
    component: EditCareMemberPage,
    layout: "/admin",
  },
  // Examples
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-briefcase-24 text-info",
    state: "exampleCollapse",
    layout: "/admin",
    views: [
      {
        path: "/buttons",
        name: "Buttons demo",
        miniName: "NB",
        component: Buttons,
        layout: "/admin",
      },
      {
        path: "/calendars",
        name: "calendars",
        miniName: "WV",
        component: Calendar,
        layout: "/admin",
      },
      {
        path: "/cards",
        name: "cards",
        miniName: "WV",
        component: Cards,
        layout: "/admin",
      },
      {
        path: "/components",
        name: "components",
        miniName: "WV",
        component: Components,
        layout: "/admin",
      },
      {
        path: "/elements",
        name: "elements",
        miniName: "WV",
        component: Elements,
        layout: "/admin",
      },
      {
        path: "/validation",
        name: "validation",
        miniName: "WV",
        component: Validation,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "notifications",
        miniName: "WV",
        component: Notifications,
        layout: "/admin",
      },
      {
        path: "/timeline",
        name: "timeline",
        miniName: "WV",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "typography",
        miniName: "WV",
        component: Typography,
        layout: "/admin",
      },
      {
        path: "/comparePage",
        name: "compare page",
        miniName: "WV",
        component: Pricing,
        layout: "/admin",
      },
      {
        path: "/profilePage",
        name: "profile",
        miniName: "WV",
        component: Profile,
        layout: "/admin",
      },
    ],
  },
];

export default routes;
