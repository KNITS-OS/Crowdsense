import { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "reactstrap";
import { useGetCandidateQuery } from "redux/features/candidates/candidatesApiSlice";
import { BoxHeader } from "../../../components/Headers";
import { LabeledFormInput } from "../../../components/Input";
import { defaultTags } from "../../../mockData";
import { ITag } from "../../../types/types";

interface RouteParams {
  id: string;
}

const CandidateDetailsPage = () => {
  let { id } = useParams<RouteParams>();
  const [tags, setTags] = useState<ITag[]>([]);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useGetCandidateQuery({ id, select: "*" });
  const history = useHistory();

  let candidate = data[0];
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

  const handleTagChange = (newValue: any) => {
    setTags(newValue);
  };

  if (!candidate) {
    return <div>No candidate found</div>;
  }

  const {
    comment,
    email,
    fullName,
    firstName,
    rating = 0,
    status,
    submissionDate,
    country,
  } = candidate;

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        {isError && <div>Couldn't fetch data</div>}
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
                      color="primary"
                      onClick={() =>
                        history.push("/admin/candidates-search")
                      }
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
                          <LabeledFormInput
                            id="input-firstname"
                            label="First name"
                            name="firstName"
                            value={firstName}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-fullname"
                            label="Full name"
                            name="fullName"
                            value={fullName}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-submission-date"
                            label="Submission Date"
                            name="submissionDate"
                            value={submissionDate}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-email"
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-country"
                            label="Country"
                            name="country"
                            value={country}
                            disabled
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
                          <LabeledFormInput
                            id="input-status"
                            label="Status"
                            name="status"
                            value={status}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-rating"
                            label="Rating"
                            name="rating"
                            value={rating}
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
                          <LabeledFormInput
                            id="input-comment"
                            label="Comment"
                            name="comment"
                            value={comment}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          {/* https://react-select.com/creatable */}
                          <CreatableSelect
                            isMulti
                            onChange={handleTagChange}
                            options={defaultTags}
                            value={tags.map(tag => ({
                              value: tag.value,
                              label: tag.label,
                            }))}
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
