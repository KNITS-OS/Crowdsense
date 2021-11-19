import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICandidate,
  ICandidateFilters,
  ICreateCandidateFinalState,
  ITag,
} from "types/types";
import { baseQuery } from "utils/rtkQueryConfig";

const candidatesTable = "candidates";
const tagsTable = "tags";

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

interface IUpdateCandidateArgs {
  reqId: string;
  body: Partial<ICandidate>;
}

interface IGetCandidateTagsArgs {
  reqId: string;
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
        query: args => {
          return {
            url: `${candidatesTable}`,
            method: "POST",
            body: args,
          };
        },
        invalidatesTags: [{ type: "Candidates" }],
      }),
      updateCandidate: builder.mutation<ICandidate, IUpdateCandidateArgs>({
        query(args) {
          const { reqId, ...body } = args;
          return {
            url: `${candidatesTable}`,
            method: "PUT",
            params: {
              reqId,
            },
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
      getCandidateTags: builder.query<ITag[], IGetCandidateTagsArgs>({
        query(args) {
          const { reqId } = args;
          return {
            url: `${tagsTable}`,
            method: "GET",
            params: {
              candidate_id: `eq.${reqId}`,
            },
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
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
  useLazyGetCandidateTagsQuery,
} = candidatesApiSlice;
