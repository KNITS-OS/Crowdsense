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

import { useRef, useEffect } from "react";
import { Switch, Redirect } from "react-router";

import { AdminFooter } from "components/Footers";
import { AdminNavbar } from "components/Navbars";
import { Sidebar } from "components/Sidebar";

import { routes } from "routes";
import sideBarImageSrc from "../assets/img/brand/CareLogoMin.png";

import { useAppDispatch, useAppSelector } from "redux/app";
import { toggleSidenav } from "redux/features";

import { useScrollToTop, useGetRoutes } from "./hooks";

export const RTL = () => {
  const dispatch = useAppDispatch();
  const { isSidenavOpen } = useAppSelector(state => state.sidenav);

  const mainContentRef = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.classList.add("rtl");
    document.documentElement.classList.add("rtl");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove("rtl");
      document.documentElement.classList.remove("rtl");
    };
  });

  useScrollToTop(mainContentRef);

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: sideBarImageSrc,
          imgAlt: "...",
        }}
        rtlActive
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar theme="dark" />
        <Switch>
          {useGetRoutes(routes, "/rtl")}
          <Redirect from="*" to="/rtl/rtl-support" />
        </Switch>
        <AdminFooter />
      </div>
      {isSidenavOpen ? (
        <div
          className="backdrop d-xl-none"
          onClick={() => dispatch(toggleSidenav())}
        />
      ) : null}
    </>
  );
};
