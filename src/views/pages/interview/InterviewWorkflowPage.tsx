import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { CandidatesTrelloBoard } from "components/Trello";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { getWorkflowLaneData, interviewWorkflow } from "utils";
import {
  interviewWorkflowState,
  READY_FOR_INTERVIEW,
  INTERVIEW_OFFERED,
  INTERVIEW_BOOKED,
  INTERVIEW_PERFORMED,
  ADMIN_INTERVIEW_WORKFLOW,
} from "variables";

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
