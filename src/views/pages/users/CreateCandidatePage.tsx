import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { LabeledFormInput } from "components/Input";
import { useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
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
} from "reactstrap";
import { useCreateCandidateMutation } from "redux/features/candidates/candidatesApiSlice";
import {
  ICandidateRating,
  ICreateCandidateFinalState,
  ICreateCandidateInitialState,
} from "types/types";
import { FormLabel } from "../../../components/Labels";
import { getSelectRating } from "../../../utils";

const CreateCandidatePage = () => {
  const history = useHistory();

  const initialState: ICreateCandidateInitialState = {
    firstName: "",
    lastName: "",
    submissionDate: "",
    email: "",
    country: "",
    status: "",
    rating: "",
    comment: "",
  };

  const [values, setValues] = useState(initialState);
  const [createCandidate] = useCreateCandidateMutation();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      comment,
      country,
      submissionDate,
      email,
      rating,
      status,
    } = values;
    const createValues: ICreateCandidateFinalState = {
      // @todo remove this
      reqId: `Req${Math.random()}`,
      firstName,
      fullName: firstName + " " + lastName,
      submissionDate,
      email,
      country,
      status,
      rating,
      comment,
    };
    createCandidate(createValues);
    history.push("/admin/candidates");
  };

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
                      color="info"
                      onClick={() => history.push("/admin/candidates")}
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
                            value={values.firstName}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-lastname"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
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
                            value={values.submissionDate}
                            onChange={handleInputChange}
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
                            value={values.email}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <LabeledFormInput
                            id="input-country"
                            label="Country"
                            name="country"
                            value={values.country}
                            onChange={handleInputChange}
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
                          <FormLabel label="Rating" id="rating" />
                          <Select
                            id="rating"
                            name="rating"
                            options={getSelectRating}
                            onChange={(item: any) =>
                              item &&
                              setValues({
                                ...values,
                                rating: item.value as ICandidateRating,
                              })
                            }
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
                            value={values.comment}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Button
                    type="button"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default CreateCandidatePage;
