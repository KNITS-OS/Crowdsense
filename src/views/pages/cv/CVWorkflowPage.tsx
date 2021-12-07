import { TrelloBoard } from "components/Trello";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITableColumn, IWorkflowCandidates } from "types/types";
import { checkStatusParam, cvWorkflow, setCandidateLane } from "utils";
import { cvWorkflowState, CV_REVIEW, CV_REVIEWED } from "variables";

interface RouteParams {
  CVReviewIds: string;
  CVReviewedIds: string;
}

const CVWorkflowPage = () => {
  const table: ITableColumn = "candidates2";
  const { CVReviewIds, CVReviewedIds } = useParams<RouteParams>();

  const [candidateLanes, setCandidateLanes] =
    useState<IWorkflowCandidates[]>(cvWorkflowState);

  useEffect(() => {
    const getCVReviewData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: CV_REVIEW,
        statusParam: CVReviewIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, CV_REVIEW, data),
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
        setCandidateLane(oldLanes, CV_REVIEWED, data),
      );
    };

    getCVReviewData();
    getCVReviewedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TrelloBoard workflow={cvWorkflow(candidateLanes)} table={table} />
    </>
  );
};
export default CVWorkflowPage;
