import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { FormInput } from "components/Input";
import { ICreateCandidate } from "types/types";
import { useCreateCandidateMutation } from "redux/features/candidates/candidatesApiSlice";

const CreateCandidatePage = () => {
  const history = useHistory();

  const initialState: ICreateCandidate = {
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
    // console.log(values);
    createCandidate(values);
    // history.push("/users/candidates");
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
                          <Label
                            className="form-control-label"
                            for="input-first-name"
                          >
                            First name
                          </Label>
                          <FormInput
                            id="input-first-name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            for="input-lastname"
                          >
                            Last Name
                          </Label>

                          <FormInput
                            id="input-lastname"
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
                          <Label
                            className="form-control-label"
                            for="input-submission-date"
                          >
                            Submission Date
                          </Label>
                          <FormInput
                            id="input-submission-date"
                            name="submissionDate"
                            value={values.submissionDate}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            for="input-email"
                          >
                            Email address
                          </Label>
                          <FormInput
                            id="input-email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            for="input-country"
                          >
                            Country
                          </Label>
                          <FormInput
                            id="input-country"
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
                          <Label
                            className="form-control-label"
                            for="input-status"
                          >
                            Current Status
                          </Label>
                          <FormInput
                            id="input-status"
                            name="status"
                            value={values.status}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            for="input-rating"
                          >
                            Rating
                          </Label>
                          <FormInput
                            id="input-rating"
                            name="rating"
                            value={values.rating}
                            onChange={handleInputChange}
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
                          <Label
                            className="form-control-label"
                            for="input-comment"
                          >
                            Comment
                          </Label>
                          <FormInput
                            id="input-comment"
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
