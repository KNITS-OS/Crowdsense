import { useSidenav } from "../context/SidenavContext";

/**
 * @description This function is used to toggle the sidenav
 */
const useToggleSidenav = () => {
  const { sidenavOpen, setSidenavOpen } = useSidenav();

  return {
    toggleSidenav: () => {
      if (document.body.classList.contains("g-sidenav-pinned")) {
        document.body.classList.remove("g-sidenav-pinned");
        document.body.classList.add("g-sidenav-hidden");
      } else {
        document.body.classList.add("g-sidenav-pinned");
        document.body.classList.remove("g-sidenav-hidden");
      }

      setSidenavOpen(() => !sidenavOpen);
      // setSidenavOpen(oldState => !oldState);
    },
  };
};

export default useToggleSidenav;
