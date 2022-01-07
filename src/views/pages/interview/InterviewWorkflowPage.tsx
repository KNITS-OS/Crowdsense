import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { interviewWorkflow } from "utils";
import { getWorkflowLaneData } from "utils/workflowUtils";
import {
  interviewWorkflowState,
  INTERVIEW_BOOKED,
  INTERVIEW_OFFERED,
  INTERVIEW_PERFORMED,
  READY_FOR_INTERVIEW,
  ADMIN_INTERVIEW_WORKFLOW,
} from "variables";
import CandidatesTrelloBoard from "components/Trello/CandidatesTrelloBoard";

export const InterviewWorkflowPage = () => {
  const { state }: { state: ICandidate[] } = useLocation();
  const history = useHistory();

  const [candidateLanes, setCandidateLanes] = useState<
    IWorkflowCandidates[]
  >(interviewWorkflowState);

  useEffect(() => {
    getWorkflowLaneData(state, READY_FOR_INTERVIEW, setCandidateLanes);
    getWorkflowLaneData(state, INTERVIEW_OFFERED, setCandidateLanes);
    getWorkflowLaneData(state, INTERVIEW_BOOKED, setCandidateLanes);
    getWorkflowLaneData(state, INTERVIEW_PERFORMED, setCandidateLanes);

    // when user refreshes page the state is lost
    history.replace(ADMIN_INTERVIEW_WORKFLOW, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CandidatesTrelloBoard
        workflow={interviewWorkflow(candidateLanes)}
      />
    </>
  );
};
