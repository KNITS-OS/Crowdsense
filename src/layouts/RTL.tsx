import AdminFooter from "components/Footers/AdminFooter";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { Sidebar } from "components/Sidebar";
import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "routes";
import { getRoutes, ScrollToTop } from ".";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { toggleSidenav } from "../redux/features/sidenav/sidenavSlice";

const RTL = () => {
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

  ScrollToTop(mainContentRef);

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/CareLogoMin.png").default,
          imgAlt: "...",
        }}
        rtlActive
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar theme="dark" />
        <Routes>
          {getRoutes(routes, "/rtl")}
            <Route path="*" element={<Navigate to="/rtl/rtl-support" replace/>}/>
        </Routes>
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

export default RTL;
