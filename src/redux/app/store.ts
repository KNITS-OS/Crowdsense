import { configureStore } from "@reduxjs/toolkit";
import sidenavReducer from "redux/features/sidenav/sidenavSlice";
import { candidatesApiSlice } from "../features/candidates/candidatesApiSlice";
export const store = configureStore({
  reducer: {
    sidenav: sidenavReducer,
    [candidatesApiSlice.reducerPath]: candidatesApiSlice.reducer,
  },
  // add special capabilites to the store
  // like tracking cache lifetimes
  // if no other part of the codebase needs this data
  // it will be removed from the cache after it expires
  // gdm = get default middleware
  middleware: gdm => {
    return gdm().concat(candidatesApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDisptatch = typeof store.dispatch;
