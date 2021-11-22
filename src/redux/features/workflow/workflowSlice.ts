import { createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "types/types";

interface WorkflowState {
  CVCandidates: ICandidate[];
  InterviewCandidates: ICandidate[];
  OfferCandidates: ICandidate[];
  // workflow: "CV" | "Interview" | "Offer";
}

const initialState: WorkflowState = {
  CVCandidates: [],
  InterviewCandidates: [],
  OfferCandidates: [],
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addCandidatesToCVWorkflow: (state, action) => {
      state.CVCandidates = action.payload;
    },
    addCandidatesToInterviewWorkflow: (state, action) => {
      state.InterviewCandidates = action.payload;
    },
    addCandidatesToOfferWorkflow: (state, action) => {
      state.OfferCandidates = action.payload;
    },
  },
});

export const {
  addCandidatesToCVWorkflow,
  addCandidatesToInterviewWorkflow,
  addCandidatesToOfferWorkflow,
} = workflowSlice.actions;
