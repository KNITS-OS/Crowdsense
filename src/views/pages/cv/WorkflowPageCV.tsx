import Board from "react-trello";
import { Container } from "reactstrap";
import { ICandidate, ITrello } from "types/types";
import { useEffect, useState } from "react";
import { axiosInstance } from "utils";
import { addFilter } from "redux/filters";
import { trelloDefaults } from "variables";

const WorkflowPageCV = () => {
  const [cvCandidates, setCVCandidates] = useState<ICandidate[]>([]);
  useEffect(() => {
    fetchCVWorkflowCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCVWorkflowCandidates = async () => {
    const statusFilter = addFilter({
      param: "CV Review, CV Reviewed, Ready for interview",
      filter: "in",
    });

    const filters = {
      status: statusFilter,
    };
    let { data } = await axiosInstance.get("/candidates2", {
      params: {
        select: "*",
        ...filters,
      },
    });
    setCVCandidates(data);
  };
  const cvReviewCards = cvCandidates.filter(
    candidate => candidate.status === "CV Review",
  );

  const cvWorkflowExample: ITrello = {
    lanes: [
      {
        id: "CV Review",
        title: "CV Review",
        cards: cvReviewCards.map(candidate => ({
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
        cards: [],
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
