import { Rating } from "react-simple-star-rating";
import { Col, Row } from "reactstrap";

interface Props {
    rating: number;
    reqId?: string;
    callback?: (newRating: number, reqId: string) => void;
}

const TableRatingCell = ({ rating, reqId, callback }: Props) => {
    if (!rating) rating = 0;

    return (
        <>
            <Row>
                <Col md="10">
                    <Rating
                        ratingValue={rating}
                        onClick={newRating => callback && reqId && callback(newRating, reqId)}
                    />
                </Col>
            </Row>
        </>
    );
};
export default TableRatingCell;
