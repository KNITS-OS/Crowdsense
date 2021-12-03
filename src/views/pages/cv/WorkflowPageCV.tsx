import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addFilter } from "redux/filters";
import { ICandidate } from "types/types";
import { axiosInstance, fetchOrderedCandidatesByStatus } from "utils";
import { TrelloBoard } from "components/Trello";

interface RouteParams {
  candidateIds: string;
}

const WorkflowPageCV = () => {
  const { candidateIds } = useParams<RouteParams>();
  console.log(candidateIds);

  const table = "candidates2";

  const [cvReviewCandidates, setCVReviewCandidates] = useState<
    ICandidate[]
  >([]);
  const [cvReviewedCandidates, setCVReviewedCandidates] = useState<
    ICandidate[]
  >([]);

  useEffect(() => {
    const fetchCVReviewCandidatesByIds = async (candidateIds: string) => {
      const statusFilter = addFilter({
        param: "CV Review",
        filter: "eq",
      });
      const reqIdFilter = addFilter({
        param: [candidateIds],
        filter: "in",
      });

      const filters = {
        status: statusFilter,
        reqId: reqIdFilter,
      };

      let { data } = await axiosInstance.get(table, {
        params: {
          select: "*",
          ...filters,
        },
      });
      setCVReviewCandidates(data);
    };

    const fetchAllCVReviewCandidates = async () => {
      const { data } = await fetchOrderedCandidatesByStatus({
        table,
        order: "firstName",
        status: "CV Review",
      });

      setCVReviewCandidates(data);
    };

    const fetchCVReviewedCandidates = async () => {
      const { data } = await fetchOrderedCandidatesByStatus({
        table,
        order: "firstName",
        status: "CV Reviewed",
      });

      setCVReviewedCandidates(data);
    };

    fetchCVReviewedCandidates();

    if (candidateIds === "null" || candidateIds === ":candidateIds") {
      fetchAllCVReviewCandidates();
    } else {
      fetchCVReviewCandidatesByIds(candidateIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cvWorkflow: ReactTrello.BoardData = {
    lanes: [
      {
        id: "CV Review",
        title: "CV Review",
        disallowAddingCard: true,
        cards: cvReviewCandidates.map(candidate => ({
          laneId: "CV Review",
          id: candidate.reqId,
          title: candidate.firstName,
          description: candidate.email,
          label: candidate.country,
        })),
      },
      {
        id: "CV Reviewed",
        title: "CV Reviewed",
        disallowAddingCard: true,
        cards: cvReviewedCandidates.map(candidate => ({
          laneId: "CV Reviewed",
          id: candidate.reqId,
          title: candidate.firstName,
          description: candidate.email,
          label: candidate.country,
        })),
      },
      {
        id: "Ready for interview",
        title: "Ready for interview",
        disallowAddingCard: true,
        cards: [],
      },
    ],
  };

  return (
    <>
      <TrelloBoard workflow={cvWorkflow} table={table} />
    </>
  );
};
export default WorkflowPageCV;
