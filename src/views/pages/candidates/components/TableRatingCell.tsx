import { Rating } from "react-simple-star-rating";
import { Col, Row } from "reactstrap";
import { ICandidate, IUpdateCandidateUIParams } from "types/types";

interface Props {
  row: ICandidate;
  updateCandidateUI: ({ reqId, body }: IUpdateCandidateUIParams) => void;
}

export const TableRatingCell = ({ row, updateCandidateUI }: Props) => {
  if (!row.rating) row.rating = 0;

  const handleRatingChange = (newRating: number) => {
    updateCandidateUI({ reqId: row.reqId, body: { rating: newRating } });
  };

  return (
    <>
      <Row>
        <Col md="10">
          <Rating
            onClick={newRating => handleRatingChange(newRating / 20)}
            ratingValue={row.rating}
            size={25}
          />
        </Col>
      </Row>
    </>
  );
};
