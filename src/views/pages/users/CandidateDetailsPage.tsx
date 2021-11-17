import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { ICandidate } from "types/types";
import { candidates } from ".";

interface RouteParams {
  id: string;
}

const CandidateDetailsPage = () => {
  let { id } = useParams<RouteParams>();

  const history = useHistory();

  let fetchCandidate = () => {
    let candidatesData = candidates as ICandidate[];
    const candidate = candidatesData.find(
      (candidate: ICandidate) => candidate.reqId === id,
    );
    return candidate;
  };
  let candidate = fetchCandidate();
  if (!candidate) return <div>No candidate found</div>;

  const {
    comment,
    email,
    fullName,
    firstName,
    rating,
    status,
    submissionDate,
    country,
  } = candidate;

  return (
    <>
      <GradientEmptyHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Candidate Details</h3>
                  </Col>
                </Row>
                <Row className="align-items-center py-4">
                  <Col lg="12" xs="7" className="text-right">
                    <Button
                      type="button"
                      color="success"
                      onClick={e => e.preventDefault()}
                    >
                      Invite to Care
                    </Button>
                    <Button
                      type="button"
                      color="info"
                      onClick={e => history.push("/admin/candidates")}
                    >
                      Back to Search
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            id="input-first-name"
                            value={firstName}
                            type="text"
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullname"
                          >
                            Full Name
                          </label>
                          <Input
                            id="input-fullname"
                            value={fullName}
                            disabled={true}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-submission-date"
                          >
                            Submission Date
                          </label>
                          <Input
                            id="input-submission-date"
                            value={submissionDate}
                            disabled={true}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            id="input-email"
                            value={email}
                            disabled={true}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            id="input-country"
                            value={country}
                            disabled={true}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Evaluation
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-status"
                          >
                            Current Status
                          </label>
                          <Input
                            id="input-status"
                            value={status}
                            type="text"
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-rating"
                          >
                            Rating
                          </label>
                          <Input
                            id="input-rating"
                            value={rating}
                            disabled={true}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Additional information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-comment"
                          >
                            Comment
                          </label>
                          <Input
                            id="input-comment"
                            value={comment}
                            type="text"
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CandidateDetailsPage;
