import Board from "react-trello";
import { Container } from "reactstrap";
import { ICandidate, ITrello } from "types/types";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils";
import { addFilter } from "redux/filters";
import { trelloDefaults } from "variables";
import { useParams } from "react-router";

interface RouteParams {
  candidateIds: string | undefined;
}

const WorkflowPageCV = () => {
  const { candidateIds } = useParams<RouteParams>();
  const table = "/candidates2";
  console.log("candidateIds", candidateIds);

  const [cvReviewCandidates, setCVReviewCandidates] = useState<
    ICandidate[]
  >([]);
  const [cvReviewedCandidates, setCVReviewedCandidates] = useState<
    ICandidate[]
  >([]);

  useEffect(() => {
    const fetchCVWorkflowCandidates = async () => {
      const statusFilter = addFilter({
        param: ["CV Review", "CV Reviewed"],
        filter: "in",
      });

      const filters = {
        status: statusFilter,
      };

      let { data } = await axiosInstance.get<ICandidate[]>(table, {
        params: {
          select: "*",
          ...filters,
        },
      });

      // cards that contain the word "CV Review" in status
      const cvReviewCards = data.filter(
        candidate => candidate.status === "CV Review",
      );

      // cards that contain the word "CV Reviewed" in status
      const cvReviewedCards = data.filter(
        candidate => candidate.status === "CV Reviewed",
      );

      console.log("data", data);

      console.log("cvReviewCards", cvReviewCards);
      console.log("cvReviewedCards", cvReviewedCards);

      setCVReviewCandidates(cvReviewCards);
      setCVReviewedCandidates(cvReviewedCards);
    };

    const fetchCVWorkflowCandidatesByIds = async () => {
      const statusFilter = addFilter({
        param: ["CV Review", "CV Reviewed"],
        filter: "in",
      });

      const filters = {
        status: statusFilter,
      };
      let { data } = await axiosInstance.get(table, {
        params: {
          select: "*",
          ...filters,
        },
      });
      setCVReviewCandidates(data);
    };

    if (candidateIds === "null" || candidateIds === ":candidateIds") {
      fetchCVWorkflowCandidates();
    } else {
      fetchCVWorkflowCandidatesByIds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cvWorkflowExample: ITrello = {
    lanes: [
      {
        id: "CV Review",
        title: "CV Review",
        cards: cvReviewCandidates.map(candidate => ({
          laneId: "CV Review",
          id: candidate.reqId,
          title: candidate.firstName,
          label: "CV Review",
          description: candidate.email,
        })),
      },
      {
        id: "CV Reviewed",
        title: "CV Reviewed",
        cards: cvReviewedCandidates.map(candidate => ({
          laneId: "CV Reviewed",
          id: candidate.reqId,
          title: candidate.firstName,
          label: "CV Reviewed",
          description: candidate.email,
        })),
      },
      {
        id: "Ready for interview",
        title: "Ready for interview",
        cards: [],
      },
    ],
  };

  return (
    <>
      <Container fluid>
        {/* https://github.com/rcdexta/react-trello#properties */}
        <Board
          data={cvWorkflowExample}
          draggable
          editable
          laneDraggable={false}
          style={trelloDefaults.trelloBoardDefaults}
          laneStyle={trelloDefaults.trelloLaneDefaults.style}
          cardStyle={trelloDefaults.trelloCardDefaults.style}
          tagStyle={trelloDefaults.trelloTagDefaults}
        />
      </Container>
    </>
  );
};
export default WorkflowPageCV;
