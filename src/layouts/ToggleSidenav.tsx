import { useToggleSidenav } from "context";

/**
 * @description This function is used to toggle the sidenav
 */
const ToggleSidenav = () => {
  const { setSidenavOpen, sidenavOpen } = useToggleSidenav();

  if (document.body.classList.contains("g-sidenav-pinned")) {
    document.body.classList.remove("g-sidenav-pinned");
    document.body.classList.add("g-sidenav-hidden");
  } else {
    document.body.classList.add("g-sidenav-pinned");
    document.body.classList.remove("g-sidenav-hidden");
  }
  setSidenavOpen(!sidenavOpen);
};

export default ToggleSidenav;
