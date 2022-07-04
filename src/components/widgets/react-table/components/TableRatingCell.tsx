import { Rating } from "react-simple-star-rating";
import { Col, Row } from "reactstrap";
import { useAlert } from "context";
import { WarningSweetAlert } from "../../../alerts";
import { ICandidate } from "types/types";
import { CandidatesMutationTriggerType } from "redux/features/candidates/candidatesApiSlice";

interface IProps {
  candidate: ICandidate;
  updateCellMutation?: CandidatesMutationTriggerType<ICandidate>;
  localChange?: (newRating: number, reqId: string) => void;
}

export const TableRatingCell = ({
  candidate,
  updateCellMutation,
  localChange,
}: IProps) => {
  let { rating = 0, reqId, fullName } = candidate;

  const { setAlert } = useAlert();

  const onRatingChange = (newRating: number) => {
    if (newRating !== rating) {
      if (updateCellMutation) {
        setAlert(
          <WarningSweetAlert
            title={`Change ${fullName}'s rating?`}
            confirmBtnBsStyle="success"
            onConfirm={() => {
              updateCellMutation({ reqId: reqId, body: { rating: newRating } });
            }}
          />
        );
      }
      if (localChange) {
        localChange(newRating, reqId);
      }
    } else return;
  };

  return (
    <>
      <Row>
        <Col md="10">
          <Rating ratingValue={rating} onClick={onRatingChange} />
        </Col>
      </Row>
    </>
  );
};
