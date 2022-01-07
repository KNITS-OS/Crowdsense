import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { cvWorkflow } from "utils";
import { getWorkflowLaneData } from "utils/workflowUtils";

import { CandidatesTrelloBoard } from "components/Trello";
import { ADMIN_CV_WORKFLOW } from "variables/routeVariables";
import {
  cvWorkflowState,
  CV_REVIEW,
  CV_REVIEWED,
} from "variables/statusVariables";

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
