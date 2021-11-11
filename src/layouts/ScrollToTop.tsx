import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (
  mainContentRef: React.MutableRefObject<HTMLDivElement>,
) => {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};
export default ScrollToTop;
