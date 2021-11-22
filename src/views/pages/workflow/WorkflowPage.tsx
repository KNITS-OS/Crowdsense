import Board from "react-trello";
import { Container } from "reactstrap";
import { fullBoardExample } from "mockData";
import {
  trelloBoardDefaults,
  trelloCardDefaults,
  trelloLaneDefaults,
  trelloTagDefaults,
} from ".";

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
          style={trelloBoardDefaults}
          laneStyle={trelloLaneDefaults.style}
          cardStyle={trelloCardDefaults.style}
          tagStyle={trelloTagDefaults}
        />
      </Container>
    </>
  );
};
export default WorkflowPage;
