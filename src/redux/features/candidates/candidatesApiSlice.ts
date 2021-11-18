import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICandidate,
  ICandidateFilters,
  ICreateCandidateFinalState,
} from "types/types";
import { baseQuery } from "utils/rtkQueryConfig";

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
// https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
export const candidatesApiSlice = createApi({
  reducerPath: "candidates",
  baseQuery,
  tagTypes: ["Candidates"],
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
      getCandidate: builder.query<ICandidate[], IGetCandidateArgs>({
        query: args => {
          const { id, select } = args;
          return {
            url: `${candidatesTable}`,
            params: {
              select,
              reqId: `eq.${id}`,
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
          const { select, limit = 30, filters } = args;
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
        providesTags: result =>
          result
            ? [
                ...result.map(
                  ({ reqId }) => ({ type: "Candidates", reqId } as const),
                ),
                { type: "Candidates", id: "LIST" },
              ]
            : [{ type: "Candidates", id: "LIST" }],
      }),
      createCandidate: builder.mutation<
        ICandidate,
        ICreateCandidateFinalState
      >({
        query: data => {
          return {
            url: `${candidatesTable}`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: [{ type: "Candidates" }],
      }),
      updateCandidate: builder.mutation<ICandidate, Partial<ICandidate>>({
        query(data) {
          const { reqId, ...body } = data;
          return {
            url: `${candidatesTable}/${reqId}`,
            method: "PUT",
            body,
          };
        },
        invalidatesTags: (result, error, { reqId }) => [
          { type: "Candidates", reqId },
        ],
      }),
      deleteCandidate: builder.mutation<
        { success: boolean; reqId: string },
        number
      >({
        query(reqId) {
          return {
            url: `${candidatesTable}/${reqId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, reqId) => [
          { type: "Candidates", reqId },
        ],
      }),
    };
  },
});

export const {
  useGetCandidateQuery,
  useLazyGetFilteredCandidatesQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} = candidatesApiSlice;
