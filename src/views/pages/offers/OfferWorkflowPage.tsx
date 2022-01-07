import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { CandidatesTrelloBoard } from "components/Trello";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { getWorkflowLaneData, offerWorkflow } from "utils";
import {
  offerWorkflowState,
  READY_TO_OFFER,
  OFFER_SENT,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
  ADMIN_OFFER_WORKFLOW,
} from "variables";

export const OfferWorkflowPage = () => {
  const { state }: { state: ICandidate[] } = useLocation();
  const history = useHistory();

  const [candidateLanes, setCandidateLanes] =
    useState<IWorkflowCandidates[]>(offerWorkflowState);

  useEffect(() => {
    getWorkflowLaneData(state, READY_TO_OFFER, setCandidateLanes);
    getWorkflowLaneData(state, OFFER_SENT, setCandidateLanes);
    getWorkflowLaneData(state, OFFER_ACCEPTED, setCandidateLanes);
    getWorkflowLaneData(state, OFFER_DECLINED, setCandidateLanes);

    // when user refreshes page the state is lost
    history.replace(ADMIN_OFFER_WORKFLOW, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CandidatesTrelloBoard workflow={offerWorkflow(candidateLanes)} />
    </>
  );
};
