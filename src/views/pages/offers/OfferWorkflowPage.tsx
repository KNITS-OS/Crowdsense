import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IWorkflowCandidates } from "types/types";
import { checkStatusParam, offerWorkflow, setCandidateLane } from "utils";
import {
  offerWorkflowState,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
  OFFER_SENT,
  READY_TO_OFFER,
} from "variables";
import CandidatesTrelloBoard from "../../../components/Trello/CandidatesTrelloBoard";

interface RouteParams {
  ReadyToOfferIds: string;
  OfferSentIds: string;
  OfferAcceptedIds: string;
  OfferDeclinedIds: string;
}

const OfferWorkflowPage = () => {
  const {
    ReadyToOfferIds,
    OfferSentIds,
    OfferAcceptedIds,
    OfferDeclinedIds,
  } = useParams<RouteParams>();

  const [candidateLanes, setCandidateLanes] =
    useState<IWorkflowCandidates[]>(offerWorkflowState);

  useEffect(() => {
    const getReadyForOfferData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: READY_TO_OFFER,
        statusParam: ReadyToOfferIds,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, READY_TO_OFFER, data),
      );
    };

    const getOfferOfferedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: OFFER_SENT,
        statusParam: OfferSentIds,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, OFFER_SENT, data),
      );
    };

    const getOfferBookedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: OFFER_ACCEPTED,
        statusParam: OfferAcceptedIds,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, OFFER_ACCEPTED, data),
      );
    };

    const getOfferPerformedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: OFFER_DECLINED,
        statusParam: OfferDeclinedIds,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, OFFER_DECLINED, data),
      );
    };

    getReadyForOfferData();
    getOfferOfferedData();
    getOfferBookedData();
    getOfferPerformedData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CandidatesTrelloBoard workflow={offerWorkflow(candidateLanes)} />
    </>
  );
};
export default OfferWorkflowPage;
