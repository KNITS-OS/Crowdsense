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
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "quill/dist/quill.core.css";
import ReactDOM from "react-dom";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// react library for routing
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
// core styles
import "./assets/scss/argon-dashboard-pro-react.scss?v1.2.0";
// plugins styles downloaded
import "./assets/vendor/nucleo/css/nucleo.css";
import { AlertProvider, SidenavProvider } from "./context";
import { AdminLayout, AuthLayout } from "./layouts";

ReactDOM.render(
  <BrowserRouter>
    <SidenavProvider>
      <AlertProvider>
        <Switch>
          <Route path="/admin" render={() => <AdminLayout />} />
          <Route path="/auth" render={() => <AuthLayout />} />
          <Route path="/" render={() => <AdminLayout />} />
          <Redirect from="*" to="/" />
        </Switch>
      </AlertProvider>
    </SidenavProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);
