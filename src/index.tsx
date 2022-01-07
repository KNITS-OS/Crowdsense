import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";

import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./assets/scss/argon-dashboard-pro-react.scss?v1.2.0";
import "./assets/vendor/nucleo/css/nucleo.css";

import "./variables/chartDefaults";
import "./assets/css/custom.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AdminLayout, AuthLayout } from "./layouts";
import { AlertProvider } from "./context";

import { store } from "./redux/app";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <AlertProvider>
          <Switch>
            <Route path="/admin" render={() => <AdminLayout />} />
            <Route path="/auth" render={() => <AuthLayout />} />
            <Route path="/" render={() => <AdminLayout />} />
            <Redirect from="*" to="/" />
          </Switch>
        </AlertProvider>
      </StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
