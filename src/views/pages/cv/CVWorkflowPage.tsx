import { TrelloBoard } from "components/Trello";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITableColumn, IWorkflowCandidates } from "types/types";
import {
  checkStatusParam,
  createDefaultLanes,
  createLane,
  declineLanes,
  updateCandidateLane,
} from "utils";
import {
  CV_REVIEW,
  CV_REVIEWED,
  READY_FOR_INTERVIEW,
} from "../../../variables";

interface RouteParams {
  CVReviewIds: string;
  CVReviewedIds: string;
}

const CVWorkflowPage = () => {
  const table: ITableColumn = "candidates2";
  const { CVReviewIds, CVReviewedIds } = useParams<RouteParams>();

  const [candidateLanes, setCandidateLanes] = useState<
    IWorkflowCandidates[]
  >([
    { status: CV_REVIEW, candidates: [] },
    { status: CV_REVIEWED, candidates: [] },
  ]);

  useEffect(() => {
    const getCVReviewData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: CV_REVIEW,
        statusParam: CVReviewIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        updateCandidateLane(oldLanes, CV_REVIEWED, data),
      );
    };

    const getCVReviewedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: CV_REVIEWED,
        statusParam: CVReviewedIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        updateCandidateLane(oldLanes, CV_REVIEWED, data),
      );
    };

    getCVReviewData();
    getCVReviewedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const workflow: ReactTrello.BoardData = {
    lanes: [
      ...createDefaultLanes(candidateLanes),
      createLane([], READY_FOR_INTERVIEW),
      ...declineLanes(),
    ],
  };

  return (
    <>
      <TrelloBoard workflow={workflow} table={table} />
    </>
  );
};
export default CVWorkflowPage;
