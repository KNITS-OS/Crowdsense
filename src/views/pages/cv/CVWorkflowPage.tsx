import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { cvWorkflow } from "utils";
import { getWorkflowLaneData } from "utils/workflowUtils";
import {
  cvWorkflowState,
  CV_REVIEW,
  CV_REVIEWED,
  ADMIN_CV_WORKFLOW,
} from "variables";
import { CandidatesTrelloBoard } from "components/Trello";

export const CVWorkflowPage = () => {
  const { state }: { state: ICandidate[] } = useLocation();
  const history = useHistory();

  const [candidateLanes, setCandidateLanes] =
    useState<IWorkflowCandidates[]>(cvWorkflowState);

  useEffect(() => {
    getWorkflowLaneData(state, CV_REVIEW, setCandidateLanes);
    getWorkflowLaneData(state, CV_REVIEWED, setCandidateLanes);

    // when user refreshes page the state is lost
    history.replace(ADMIN_CV_WORKFLOW, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CandidatesTrelloBoard workflow={cvWorkflow(candidateLanes)} />
    </>
  );
};
