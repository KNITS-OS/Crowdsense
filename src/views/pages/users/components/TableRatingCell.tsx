import { Rating } from "react-simple-star-rating";
import { Row, Col } from "reactstrap";
import { ICandidate } from "../../../../types/types";

interface Props {
  row: ICandidate;
  updateCandidateUI: (reqId: string, body: Partial<ICandidate>) => void;
}

const TableRatingCell = ({ row, updateCandidateUI }: Props) => {
  if (!row.rating) row.rating = 0;

  const handleRatingChange = (newRating: number) => {
    updateCandidateUI(row.reqId, { rating: newRating });
  };

  return (
    <>
      <Row>
        <Col md="10">
          <Rating
            onClick={newRating => handleRatingChange(newRating)}
            ratingValue={row.rating}
          />
        </Col>
      </Row>
    </>
  );
};
export default TableRatingCell;
