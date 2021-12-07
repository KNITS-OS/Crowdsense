import { TrelloBoard } from "components/Trello";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITableColumn, IWorkflowCandidates } from "types/types";
import { checkStatusParam, offerWorkflow, setCandidateLane } from "utils";
import {
  offerWorkflowState,
  READY_TO_OFFER,
  OFFER_SENT,
  OFFER_ACCEPTED,
  OFFER_DECLINED,
} from "variables";

interface RouteParams {
  ReadyToOfferIds: string;
  OfferSentIds: string;
  OfferAcceptedIds: string;
  OfferDeclinedIds: string;
}

const OfferWorkflowPage = () => {
  const table: ITableColumn = "candidates2";
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
        table,
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
        table,
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
        table,
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
        table,
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
      <TrelloBoard
        workflow={offerWorkflow(candidateLanes)}
        table={table}
      />
    </>
  );
};
export default OfferWorkflowPage;
