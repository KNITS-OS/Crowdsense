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
import EditCareMemberPage from "./views/pages/examples/pages/users/EditCareMemberPage";
import { IRoute } from "./types/types";
import { ApplicationsPage } from "./views/pages/applications";
import { ChartsPage, WorldOverviewPage } from "./views/pages/dashboards";
import { EmailPage } from "./views/pages/emails";
import { InternshipPage } from "./views/pages/internships";
import { OfferPage } from "./views/pages/offers";
import {
  CandidateDetailsPage,
  CandidatesPage,
  CreateCandidatePage,
} from "./views/pages/users";
import { HomePage } from "./views/pages/home";

const routes: IRoute[] = [
  //Home
  {
    collapse: false,
    path: "/home",
    name: "Home",
    miniName: "HO",
    component: HomePage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info",
  },
  // Curriculum
  {
    collapse: true,
    name: "Curriculum",
    icon: "ni ni-chart-pie-35 text-info",
    state: "curriculumCollapse",
    views: [
      {
        path: "/add-cv",
        name: "Add CV",
        miniName: "AC",
        component: ChartsPage,
        layout: "/admin",
      },
      {
        path: "/search-cv",
        name: "Search CV",
        miniName: "SC",
        component: CandidatesPage,
        layout: "/admin",
      },
    ],
  },
  // Candidates
  {
    collapse: true,
    name: "Candidates",
    icon: "ni ni-chart-pie-35 text-info",
    state: "candidatesCollapse",
    views: [
      {
        path: "/candidates",
        name: "Candidates",
        miniName: "CA",
        component: CandidatesPage,
        layout: "/admin",
      },
      {
        path: "/create-candidate",
        name: "Create",
        miniName: "CR",
        component: CreateCandidatePage,
        layout: "/admin",
      },
    ],
  },
  // Offers
  {
    collapse: true,
    name: "Offers",
    state: "offerCollapse",
    icon: "ni ni-chart-pie-35 text-info",
    views: [
      {
        path: "/offers",
        name: "Offers",
        miniName: "O",
        component: OfferPage,
        layout: "/admin",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "SC",
        component: WorldOverviewPage,
        layout: "/admin",
      },
    ],
  },
  // Applications
  {
    collapse: false,
    path: "/applications",
    name: "Applications",
    miniName: "AP",
    component: ApplicationsPage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info",
  },
  // Internship
  {
    collapse: true,
    name: "Internship",
    miniName: "IN",
    state: "internshipCollapse",
    icon: "ni ni-chart-pie-35 text-info",
    views: [
      {
        path: "/internship",
        name: "Internship",
        miniName: "I",
        component: InternshipPage,
        layout: "/admin",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "I",
        component: WorldOverviewPage,
        layout: "/admin",
      },
    ],
  },
  // Email
  {
    collapse: false,
    path: "/email",
    name: "Email",
    miniName: "EM",
    component: EmailPage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info",
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
