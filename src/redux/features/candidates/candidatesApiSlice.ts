import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICandidate,
  ICandidateFilters,
  ICreateCandidateFinalState,
  SelectTag,
} from "types/types";
import { baseQuery } from "utils/rtkQueryConfig";
import { candidatesTable, tagsTable } from "variables/tableVariables";

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
  filters: ICandidateFilters | null;
  limit?: number;
}

interface IUpdateCandidateArgs {
  reqId: string;
  body: Partial<ICandidate>;
}
interface IUpdateCandidatesArgs {
  body: Partial<ICandidate>[];
}

interface IGetCandidateTagsArgs {
  reqId: string;
}

// https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
export const candidatesApiSlice = createApi({
  reducerPath: "candidates",
  baseQuery,
  tagTypes: ["Candidates"],
  // refetchOnMountOrArgChange: true,
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
              order: "firstName.asc.nullslast",
            },
            method: "GET",
          };
        },
        // provides a list of "Candidates" by "id"
        // if any mutation is executed that "invalidate"'s any of these tags, this query will re-run to be always up to date
        // this 'LIST' id is a "virtual id" we just made up to be able to invalidate this query specifically
        providesTags: (result = []) => [
          "Candidates",
          ...result.map(
            ({ reqId }) => ({ type: "Candidates", id: reqId } as const),
          ),
        ],
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
        // invalidates all Candidate type queries providing id LIST
        // so that the new candidate would be shown in the table
        invalidatesTags: [{ type: "Candidates", id: "LIST" }],
      }),

      updateCandidate: builder.mutation<ICandidate, IUpdateCandidateArgs>({
        query(args) {
          const { reqId, body } = args;
          return {
            url: `${candidatesTable}`,
            method: "PATCH",
            params: {
              reqId: `eq.${reqId}`,
            },
            body: { ...body },
          };
        },
        // invalidatesTags: (result, error, { reqId }) => [
        //   { type: "Candidates", id: reqId },
        // ],
        onQueryStarted({ reqId, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            candidatesApiSlice.util.updateQueryData(
              "getFilteredCandidates",
              { select: "*", filters: null },
              draft => {
                Object.assign(draft, patch);
              },
            ),
          );
          queryFulfilled.catch(patchResult.undo);
        },
      }),
      updateCandidates: builder.mutation<
        ICandidate[],
        IUpdateCandidatesArgs
      >({
        query(args) {
          const { body } = args;
          return {
            url: `${candidatesTable}`,
            method: "PATCH",
            body: { ...body },
          };
        },
        invalidatesTags: () => [{ type: "Candidates", id: "LIST" }],
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
          { type: "Candidates", id: reqId },
        ],
      }),
      getCandidateTags: builder.query<SelectTag[], IGetCandidateTagsArgs>({
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
  useGetCandidateTagsQuery,
} = candidatesApiSlice;
