import { configureStore } from "@reduxjs/toolkit";
import { candidatesApiSlice } from "../features/candidates/candidatesApiSlice";
import { sidenavSlice } from "../features/sidenav/sidenavSlice";
import { workflowSlice } from "../features/workflow/workflowSlice";
export const store = configureStore({
  reducer: {
    [sidenavSlice.name]: sidenavSlice.reducer,
    [candidatesApiSlice.reducerPath]: candidatesApiSlice.reducer,
    [workflowSlice.name]: workflowSlice.reducer,
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
