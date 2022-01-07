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

import { useRef } from "react";
import { Redirect, Switch, useLocation } from "react-router-dom";

import { AdminNavbar } from "../components/Navbars";
import { AdminFooter } from "../components/Footers";
import { Sidebar } from "../components/Sidebar";

import { useAppDispatch, useAppSelector } from "redux/app";
import { toggleSidenav } from "redux/features";

import { Theme } from "types/types";
import { routes } from "routes";
import sideBarImageSrc from "../assets/img/brand/CareLogoMin.png";
import { useGetRoutes, useScrollToTop } from "./hooks";

export const AdminLayout = () => {
  const location = useLocation();
  const mainContentRef = useRef(document.createElement("div"));
  const dispatch = useAppDispatch();
  const { isSidenavOpen } = useAppSelector(state => state.sidenav);

  useScrollToTop(mainContentRef);

  const getNavbarTheme = (): Theme => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: sideBarImageSrc,
          imgAlt: "...",
        }}
        rtlActive={false}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar theme={getNavbarTheme()} />
        <Switch>
          {useGetRoutes(routes, "/admin")}
          <Redirect from="*" to="/admin/home" />
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
