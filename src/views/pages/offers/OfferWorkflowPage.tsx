import CandidatesTrelloBoard from "components/Trello/CandidatesTrelloBoard";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ICandidate, IWorkflowCandidates } from "types/types";
import { offerWorkflow } from "utils";
import { getWorkflowLaneData } from "utils/workflowUtils";
import {
  offerWorkflowState,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
  OFFER_SENT,
  READY_TO_OFFER,
  ADMIN_OFFER_WORKFLOW,
} from "variables";

const OfferWorkflowPage = () => {
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
export default OfferWorkflowPage;
