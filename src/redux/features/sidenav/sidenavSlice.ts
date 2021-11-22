import { createSlice } from "@reduxjs/toolkit";

interface SidenavState {
  isSidenavOpen: boolean;
}

const initialState: SidenavState = {
  isSidenavOpen: true,
};

export const sidenavSlice = createSlice({
  name: "sidenav",
  initialState,
  reducers: {
    toggleSidenav: state => {
      if (document.body.classList.contains("g-sidenav-pinned")) {
        document.body.classList.remove("g-sidenav-pinned");
        document.body.classList.add("g-sidenav-hidden");
      } else {
        document.body.classList.add("g-sidenav-pinned");
        document.body.classList.remove("g-sidenav-hidden");
      }

      state.isSidenavOpen = !state.isSidenavOpen;
    },
  },
});

export const { toggleSidenav } = sidenavSlice.actions;
