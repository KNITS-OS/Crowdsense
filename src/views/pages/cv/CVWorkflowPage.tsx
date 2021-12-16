import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IWorkflowCandidates } from "types/types";
import { checkStatusParam, cvWorkflow, setCandidateLane } from "utils";
import { cvWorkflowState, CV_REVIEW, CV_REVIEWED } from "variables";
import { CandidatesTrelloBoard } from "../../../components/Trello";

interface RouteParams {
  CVReviewIds: string;
  CVReviewedIds: string;
}

const CVWorkflowPage = () => {
  const { CVReviewIds, CVReviewedIds } = useParams<RouteParams>();

  const [candidateLanes, setCandidateLanes] =
    useState<IWorkflowCandidates[]>(cvWorkflowState);

  useEffect(() => {
    const getCVReviewData = async () => {
      const data = await checkStatusParam({
        status: CV_REVIEW,
        statusParam: CVReviewIds,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, CV_REVIEW, data),
      );
    };

    const getCVReviewedData = async () => {
      const data = await checkStatusParam({
        status: CV_REVIEWED,
        statusParam: CVReviewedIds,
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
      <CandidatesTrelloBoard workflow={cvWorkflow(candidateLanes)} />
    </>
  );
};
export default CVWorkflowPage;
