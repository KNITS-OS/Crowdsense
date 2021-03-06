import { Rating } from "react-simple-star-rating";
import { Row, Col } from "reactstrap";
import { ICandidate } from "../../../../types/types";

interface Props {
  row: ICandidate;
  updateCandidate: any;
}

const TableRatingCell = ({ row, updateCandidate }: Props) => {
  if (!row.rating) row.rating = 0;

  const handleRatingChange = (newRating: number) => {
    updateCandidate({
      reqId: row.reqId,
      body: { rating: newRating },
    });
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
