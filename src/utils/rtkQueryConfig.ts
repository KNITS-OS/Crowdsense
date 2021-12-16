import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,

  prepareHeaders(headers) {
    if (process.env.REACT_APP_BACKEND_ENV === "supabase") {
      headers.set("apikey", process.env.REACT_APP_API_KEY);
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    } else if (process.env.REACT_APP_BACKEND_ENV === "spring") {
      headers.set("Access-Control-Allow-Origin", "*");
      // @todo return Java backend headers
      // headers.set("apikey", process.env.REACT_APP_API_KEY);
      return headers;
    } else {
      console.log("wrong ENV");
      return headers;
    }
  },
});
