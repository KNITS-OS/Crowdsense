import AdminFooter from "components/Footers/AdminFooter";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import routes from "routes";
import { Theme } from "types/types";
import { ScrollToTop } from ".";
import { Sidebar } from "components/Sidebar";
import { useAppDispatch, useAppSelector } from "redux/app/hooks";
import { toggleSidenav } from "redux/features/sidenav/sidenavSlice";

const Admin = () => {
  const location = useLocation();
  const mainContentRef = useRef(document.createElement("div"));
  const dispatch = useAppDispatch();
  const { isSidenavOpen } = useAppSelector((state) => state.sidenav);

  ScrollToTop(mainContentRef);

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
          imgSrc: require("assets/img/brand/CareLogoMin.png"),
          imgAlt: "...",
        }}
        rtlActive={false}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar theme={getNavbarTheme()} />
        <Outlet />
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

export default Admin;
