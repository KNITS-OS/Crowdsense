import Board from "react-trello";
import { Container } from "reactstrap";
import { fullBoardExample } from "mockData";

const WorkflowPage = () => {
  return (
    <>
      {/* https://github.com/rcdexta/react-trello#properties */}
      <Container fluid>
        <Board
          data={fullBoardExample}
          draggable
          editable
          canAddLanes
          editLaneTitle
          style={{
            fontSize: 18,
            padding: "60px",
            height: "90vh",
            backgroundColor: "white",
          }}
        />
      </Container>
    </>
  );
};
export default WorkflowPage;
