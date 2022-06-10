import AuthFooter from "components/Footers/AuthFooter";
import AuthNavbar from "components/Navbars/AuthNavbar";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from ".";

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
        <Outlet/>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
