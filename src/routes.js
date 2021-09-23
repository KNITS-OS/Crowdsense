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


import Buttons from "views/pages/examples/components/Buttons.js";
import Calendar from "views/pages/examples/components/Calendar.js";
import Cards from "views/pages/examples/components/Cards.js";
import Components from "views/pages/examples/forms/Components.js";
import Elements from "views/pages/examples/forms/Elements.js";
import Validation from "views/pages/examples/forms/Validation.js";
import Notifications from "views/pages/examples/components/Notifications.js";
import Timeline from "views/pages/examples/components/Timeline.js";
import Typography from "views/pages/examples/components/Typography.js";

import Pricing from "views/pages/examples/pages/Pricing.js";
import Profile from "views/pages/examples/pages/Profile.js";



import CareMembersPage from "views/pages/users/CareMembersPage.js";
import EditCareMemberPage from "views/pages/users/EditCareMemberPage.js";
import EmployeesPage from "views/pages/users/EmployeesPage.js"
import EmployeeDetailsPage from "views/pages/users/EmployeeDetailsPage.js";
import CreateGroupPage from "views/pages/groups/CreateGroupPage.js"
import GroupsPage from "views/pages/groups/GroupsPage.js"
import CandidatesPage from "views/pages/users/CandidatesPage";
import CandidateDetailsPage from "views/pages/users/CandidateDetailsPage";

import CreateBestPracticePage from "views/pages/best-practices/CreateBestPracticePage.js"
import SearchBestPracticesPage from "views/pages/best-practices/SearchBestPracticesPage.js"

import CreateEmailPage from "views/pages/communications/CreateEmailPage.js"
import SendNotificationPage from "views/pages/communications/SendNotificationPage.js"
import CreateEmailTemplatePage from "views/pages/communications/CreateEmailTemplatePage.js"
import SearchTemplatePage from "views/pages/communications/SearchTemplatePage.js"
import EmailHistoryPage from "views/pages/communications/EmailHistoryPage.js"
import ArchivePage from "views/pages/communications/ArchivePage.js"

import ChartsPage from "views/pages/dashboards/ChartsPage.js"
import WorldOverviewPage from "views/pages/dashboards/WorldOverviewPage.js"


const routes = [
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
  {
    path: "/candidates",
    name: "Candidates",
    miniName: "AP",
    component: CandidatesPage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info"
  },
  {
    collapse: true,
    name: "Offer",
    // TODO change to OfferPage
    state: "offerCollapse",
    icon: "ni ni-chart-pie-35 text-info",
    views: [
      {
        path: "/search-candidates",
        name: "Search Candidates",
        miniName: "SC",
        component: CandidatesPage,
        layout: "/admin",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "SC",
        component: WorldOverviewPage,
        layout: "/admin",
      }
    ]
  },
  {
    path: "/applications",
    name: "Applications",
    miniName: "AP",
    // TODO change to ApplicationsPage
    component: CandidatesPage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info"
  },
  {
    collapse: true,
    name: "Internship",
    miniName: "IN",
    // TODO change to InternshipPage
    state: "internshipCollapse",
    icon: "ni ni-chart-pie-35 text-info",
    views: [
      {
        path: "/search-candidates",
        name: "Search Candidates",
        miniName: "SC",
        component: CandidatesPage,
        layout: "/admin",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "SC",
        component: WorldOverviewPage,
        layout: "/admin",
      }
    ]
  },
  {
    path: "/email",
    name: "Email",
    miniName: "EM",
    // TODO change to EmailPage
    component: CandidatesPage,
    layout: "/admin",
    icon: "ni ni-chart-pie-35 text-info"
  },
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
  {
    collapse: false,  
    global:true, 
    path: "/users/candidate-details/:id",
    component: CandidateDetailsPage,
    layout: "/admin"
  },
  {
    collapse: false,  
    global:true, 
    path: "/users/care-member-details/:id",
    component: EditCareMemberPage,
    layout: "/admin"
  },
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
  }

];

export default routes;
