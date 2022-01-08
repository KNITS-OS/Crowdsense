import { Card, CardBody, Col, Row } from "reactstrap";

import { Rating } from "react-simple-star-rating";

import { ICandidate } from "types/types";

interface Props {
  candidate: ICandidate;
}

export const WorkflowCard = ({ candidate }: Props) => {
  const { fullName, status, rating, submissionDate } = candidate;
  return (
    <Col md="6">
      <Card>
        <CardBody>
          <Row
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h4 className="text-uppercase text-muted mb-0">{fullName}</h4>
            <Rating
              ratingValue={(rating as number) * 20}
              readonly={true}
              size={25}
              onClick={() => {}}
            />
          </Row>
          <Row className="mt-3" style={{ justifyContent: "space-around" }}>
            <p className="text-sm mb-0">
              <span>{status}</span>
            </p>
            <p className="text-md mb-0">
              <span>{submissionDate}</span>
            </p>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};
