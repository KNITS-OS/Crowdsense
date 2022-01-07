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

import { IRoute } from "./types/types";
import { candidatesMenu } from "./views/pages/candidates";
import { cvMenu } from "./views/pages/cv";
import { dashboardsMenu } from "./views/pages/dashboards";
import { docxMenu } from "./views/pages/Docx";
import { homeMenu } from "./views/pages/home";
import { internshipMenu } from "./views/pages/internships";
import { interviewMenu } from "./views/pages/interview";
import { offerMenu } from "./views/pages/offers";

export const routes: IRoute[] = [
  ...homeMenu,
  ...candidatesMenu,
  ...cvMenu,
  ...interviewMenu,
  ...offerMenu,
  ...internshipMenu,
  ...docxMenu,
  ...dashboardsMenu,
];
