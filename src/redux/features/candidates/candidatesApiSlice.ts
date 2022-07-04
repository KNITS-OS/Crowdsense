import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/query/react";
import { ICandidate, ICandidateFilters, WorkflowLinesType } from "types/types";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

// import { baseQuery } from "utils/rtkQueryConfig";

export interface IUpdateCandidateArgs {
  reqId: string;
  body: Partial<ICandidate>;
}

// https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
export const candidatesApiSlice = createApi({
  reducerPath: "candidates",
  // baseQuery,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8998/" }),
  tagTypes: ["Candidates"],
  endpoints(builder) {
    return {
      getAllCandidates: builder.query<ICandidate[], WorkflowLinesType | void>({
        // @ts-ignore
        query: (filter) => {
          return {
            url: `candidates`,
            method: "GET",
            params: filter && `?workflow=${filter}`,
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(
                  ({ reqId }) => ({ type: "Candidates", reqId } as const)
                ),
                { type: "Candidates", id: "LIST" },
              ]
            : [{ type: "Candidates", id: "LIST" }],
      }),

      getCandidate: builder.query<ICandidate, string>({
        query: (reqId) => {
          return {
            url: `candidates/${reqId}`,
            method: "GET",
          };
        },
      }),
      getFilteredCandidates: builder.query<ICandidate[], ICandidateFilters>({
        query: (filters) => {
          return {
            url: `candidates`,
            params: {
              ...filters,
            },
            method: "GET",
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.map(
                  ({ reqId }) => ({ type: "Candidates", reqId } as const)
                ),
                { type: "Candidates", id: "LIST" },
              ]
            : [{ type: "Candidates", id: "LIST" }],
      }),

      createCandidate: builder.mutation<ICandidate[], ICandidate>({
        query: (args) => {
          return {
            url: `candidates`,
            method: "POST",
            body: args,
          };
        },
        invalidatesTags: [{ type: "Candidates" }],
      }),

      updateCandidate: builder.mutation<ICandidate, IUpdateCandidateArgs>({
        query(args) {
          const { reqId, body } = args;
          return {
            url: `candidates/${reqId}`,
            method: "PATCH",
            body: { ...body },
          };
        },
        // @todo update cache instead of fetching again
        invalidatesTags: (result, error, { reqId }) => [
          { type: "Candidates", reqId },
        ],
      }),
      deleteCandidate: builder.mutation<
        { success: boolean; reqId: string },
        string
      >({
        query(reqId) {
          return {
            url: `candidates/${reqId}`,
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
  useGetAllCandidatesQuery,
  useGetCandidateQuery,
  useLazyGetFilteredCandidatesQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useDeleteCandidateMutation,
} = candidatesApiSlice;

export type CandidatesMutationTriggerType<T> = MutationTrigger<
  MutationDefinition<
    IUpdateCandidateArgs,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    "Candidates",
    T,
    "candidates"
  >
>;
