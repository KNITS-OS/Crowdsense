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
import AuthFooter from "components/Footers/AuthFooter";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar";
import { useEffect, useRef } from "react";
// react library for routing
import { Redirect, Switch } from "react-router-dom";
import routes from "routes";
import { getRoutes, ScrollToTop } from ".";

const Auth = () => {
  const mainContentRef = useRef(document.createElement("div"));
  useEffect(() => {
    document.body.classList.add("bg-default");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("bg-default");
    };
  });

  ScrollToTop(mainContentRef);

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <AuthNavbar />
        <Switch>
          {getRoutes(routes, "/auth")}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
