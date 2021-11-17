import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "utils/rtkQueryConfig";
import {
  ICandidate,
  ICandidateFilters,
  ICreateCandidate,
} from "types/types";

const candidatesTable = "candidates";

interface IGetEmployeesArgs {
  select: string;
  limit?: number;
}

interface IGetCandidateArgs {
  id: string | number;
  select: string;
}

interface IGetCandidatesByFiltersArgs {
  select: string;
  filters: ICandidateFilters;
  limit?: number;
}

export const candidatesApiSlice = createApi({
  reducerPath: "candidates",
  baseQuery,
  endpoints(builder) {
    return {
      getAllCandidates: builder.query<ICandidate[], IGetEmployeesArgs>({
        query: args => {
          const { select, limit = 30 } = args;
          return {
            url: `${candidatesTable}`,
            params: {
              select,
              limit,
            },
            method: "GET",
          };
        },
      }),
      getCandidate: builder.query<ICandidate, IGetCandidateArgs>({
        query: args => {
          const { id, select } = args;
          return {
            url: `${candidatesTable}`,
            params: {
              select,
              id,
              limit: 1,
            },
            method: "GET",
          };
        },
      }),
      getFilteredCandidates: builder.query<
        ICandidate[],
        IGetCandidatesByFiltersArgs
      >({
        query: args => {
          const { select, filters, limit = 30 } = args;
          return {
            url: `${candidatesTable}`,
            params: {
              select,
              ...filters,
              limit,
            },
            method: "GET",
          };
        },
      }),
      createCandidate: builder.mutation<ICandidate, ICreateCandidate>({
        query: data => {
          console.log("daaata", data);

          return {
            url: `${candidatesTable}`,
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const {
  useGetCandidateQuery,
  useLazyGetFilteredCandidatesQuery,
  useCreateCandidateMutation,
} = candidatesApiSlice;
