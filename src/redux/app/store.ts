import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  // add special capabilites to the store
  // like tracking cache lifetimes
  // if no other part of the codebase needs this data
  // it will be removed from the cache after it expires
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat();
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDisptatch = typeof store.dispatch;
