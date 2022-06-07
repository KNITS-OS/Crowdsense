import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICandidate, } from "types/types";

// https://redux-toolkit.js.org/rtk-query/usage/mutations#revalidation-example
export const curriculumsApiSlice = createApi({
    reducerPath: "candidates",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8999/" }),
    tagTypes: [ "Curriculums" ],
    endpoints(builder) {
        return {
            getAllCurriculums: builder.query<ICandidate[], void>({
                query: () => {
                    return {
                        url: `curriculums`,
                        method: "GET",
                    };
                },
            }),

            getCurriculum: builder.query<ICandidate[], string>({
                query: id => {
                    return {
                        url: `curriculums?reqId=${id}`,
                        // params: {
                        //     reqId: `eq.${id}`,
                        //     limit: 1,
                        // },
                        method: "GET",
                    };
                },
            }),
            // getFilteredCandidates: builder.query<ICandidate[],
            //     IGetCandidatesByFiltersArgs>({
            //     query: args => {
            //         const { select, limit = 30, filters } = args;
            //         return {
            //             url: `${candidatesTable}`,
            //             params: {
            //                 select,
            //                 ...filters,
            //                 limit,
            //                 order: "firstName.asc.nullslast",
            //             },
            //             method: "GET",
            //         };
            //     },
            //     providesTags: result =>
            //         result
            //             ? [
            //                 ...result.map(
            //                     ({ reqId }) => ({ type: "Candidates", reqId } as const),
            //                 ),
            //                 { type: "Candidates", id: "LIST" },
            //             ]
            //             : [ { type: "Candidates", id: "LIST" } ],
            // }),
            // createCurriculum: builder.mutation<ICandidate,
            //     ICreateCandidateFinalState>({
            //     query: args => {
            //         return {
            //             url: `${candidatesTable}`,
            //             method: "POST",
            //             body: args,
            //         };
            //     },
            //     invalidatesTags: [ { type: "Candidates" } ],
            // }),
            //
            // updateCandidate: builder.mutation<ICandidate, IUpdateCandidateArgs>({
            //     query(args) {
            //         const { reqId, body } = args;
            //         return {
            //             url: `${candidatesTable}`,
            //             method: "PATCH",
            //             params: {
            //                 reqId: `eq.${reqId}`,
            //             },
            //             body: { ...body },
            //         };
            //     },
            //     // @todo update cache instead of fetching again
            //     invalidatesTags: (result, error, { reqId }) => [
            //         { type: "Candidates", reqId },
            //     ],
            // }),
            // deleteCandidate: builder.mutation<{ success: boolean; reqId: string },
            //     number>({
            //     query(reqId) {
            //         return {
            //             url: `${candidatesTable}/${reqId}`,
            //             method: "DELETE",
            //         };
            //     },
            //     invalidatesTags: (result, error, reqId) => [
            //         { type: "Candidates", reqId },
            //     ],
            // }),
            // getCandidateTags: builder.query<ITag[], IGetCandidateTagsArgs>({
            //     query(args) {
            //         const { reqId } = args;
            //         return {
            //             url: `${tagsTable}`,
            //             method: "GET",
            //             params: {
            //                 candidate_id: `eq.${reqId}`,
            //             },
            //         };
            //     },
            // }),
        };
    },
});

export const { useGetAllCurriculumsQuery, useGetCurriculumQuery } = curriculumsApiSlice;
