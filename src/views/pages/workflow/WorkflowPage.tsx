import Board from "react-trello";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import {
  useGetAllCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { CV_SEARCH } from "variables/routes";
import { useNavigate } from "react-router-dom";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import { ICard, workflowTrelloBoard } from "./workflowTrelloBoard";
import { WorkflowLinesType } from "types/types";
import { useAlert } from "context";
import { WarningSweetAlert } from "components/alerts";

export const WorkflowPage = () => {
  const { data = [], isLoading, isFetching } = useGetAllCandidatesQuery();
  const [updateCandidate] = useUpdateCandidateMutation();

  const { alert: sweetAlert, setAlert } = useAlert();
  const {
    alert,
    setIsSuccess,
    setSuccessMessage,
    setSaveSent,
    setErrorMessage,
  } = useLocalStateAlerts();

  const navigate = useNavigate();

  const onCardMove = async (
    cardId: string,
    sourceLaneId: WorkflowLinesType,
    targetLaneId: WorkflowLinesType,
    cardDetails: ICard
  ) => {
    setSaveSent(true);
    await updateCandidate({ reqId: cardId, body: { workflow: targetLaneId } })
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        setSuccessMessage(
          `${cardDetails.title} has been moved from ${sourceLaneId} to ${targetLaneId}`
        );
      })
      .catch((error) => {
        setErrorMessage(error.error || "Some error has been occurred");
        setIsSuccess(false);
      });
  };

  if (isLoading || isFetching) {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {sweetAlert}
      <GradientEmptyHeader />
      <Container className="mt--6" fluid>
        {alert}
        <Card>
          <CardHeader className="d-flex justify-content-between">
            <Row className="d-flex justify-content-between align-items-center">
              <Col md="12">
                <h3 className="mb-0">Candidates Workflow</h3>
              </Col>
            </Row>
            <Button
              className="btn btn-primary"
              color="primary"
              onClick={() => {
                // @todo fix navigation to right paths
                navigate(`/admin${CV_SEARCH}`);
              }}
            >
              Back to Search
            </Button>
          </CardHeader>
          <Board
            data={workflowTrelloBoard(data)}
            laneDraggable={false}
            hideCardDeleteIcon
            handleDragEnd={(
              cardId: string,
              sourceLaneId: WorkflowLinesType,
              targetLaneId: WorkflowLinesType,
              position: string,
              cardDetails: ICard
            ) => {
              if (sourceLaneId !== targetLaneId) {
                setAlert(
                  <WarningSweetAlert
                    title={`Move ${cardDetails.title} from ${sourceLaneId} to ${targetLaneId}?`}
                    confirmBtnBsStyle="success"
                    confirmBtnText="Confirm"
                    onConfirm={() => {
                      onCardMove(
                        cardId,
                        sourceLaneId,
                        targetLaneId,
                        cardDetails
                      );
                    }}
                  />
                );
              } else return;
            }}
            draggable
            style={{
              fontSize: 18,
              padding: "60px",
              height: "90vh",
              backgroundColor: "white",
            }}
          />
        </Card>
      </Container>
    </>
  );
};
