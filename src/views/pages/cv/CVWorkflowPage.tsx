import { TrelloBoard } from "components/Trello";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ICandidate } from "types/types";
import { checkStatusParam, createLane, defaultLanes } from "utils";

interface RouteParams {
  CVReview: string;
  CVReviewed: string;
}

const CVWorkflowPage = () => {
  const { CVReview, CVReviewed } = useParams<RouteParams>();

  const table = "candidates2";

  const [cvReviewCandidates, setCVReviewCandidates] = useState<
    ICandidate[]
  >([]);
  const [cvReviewedCandidates, setCVReviewedCandidates] = useState<
    ICandidate[]
  >([]);

  useEffect(() => {
    const getCVReviewData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: "CV Review",
        statusParam: CVReview,
        table,
      });
      setCVReviewCandidates(data);
    };

    const getCVReviewedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: "CV Reviewed",
        statusParam: CVReviewed,
        table,
      });
      setCVReviewedCandidates(data);
    };

    getCVReviewData();
    getCVReviewedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cvWorkflow: ReactTrello.BoardData = {
    lanes: [
      createLane(cvReviewCandidates, "CV Review"),
      createLane(cvReviewedCandidates, "CV Reviewed"),
      createLane([], "Ready for interview"),
      ...defaultLanes(),
    ],
  };

  return (
    <>
      <TrelloBoard workflow={cvWorkflow} table={table} />
    </>
  );
};
export default CVWorkflowPage;
