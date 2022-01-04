import { SelectFilter } from "components/Filters";
import { BoxHeader } from "components/Headers";
import { LabeledFormInput } from "components/Input";
import { useTags } from "hooks";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Rating } from "react-simple-star-rating";
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
import { ICandidate, ICandidateStatus } from "types/types";
import { getSelectStatus, mapTags, convertTag } from "utils";
import {
  getCandidateByIdQuery,
  updateCandidateMutation,
  createTagMutation,
} from "utils/axios";
import { candidatesWithAllStatuses } from "variables";

interface RouteParams {
  id: string;
}

const CandidateDetailsPage = () => {
  let { id } = useParams<RouteParams>();

  const { defaultTags, setDefaultTags } = useTags();
  const [candidate, setCandidate] = useState<ICandidate | null>(null);

  const history = useHistory();

  const handleTagChange = (newValue: OnChangeValue<any, true>) => {
    const newTags = newValue.map(tag => {
      return { name: tag.label, id: parseInt(tag.value) };
    });
    // @ts-ignore
    setCandidate({ ...candidate, tags: newTags });
  };

  const handleCreate = async (inputValue: string) => {
    const newTag = await createTagMutation({ name: inputValue });

    // @ts-ignore
    setCandidate({ ...candidate, tags: [...candidate?.tags, newTag] });
    setDefaultTags(oldTags => [...oldTags, convertTag(newTag)]);
  };

  useEffect(() => {
    const getCandidate = async () => {
      const { data } = await getCandidateByIdQuery(id);

      if (process.env.REACT_APP_BACKEND_ENV === "spring") {
        setCandidate(data);
      } else {
        setCandidate(data[0]);
      }
    };
    getCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!candidate) {
    return "Candidate Not Found";
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

  const handleRatingChange = (newRating: number) => {
    setCandidate({ ...candidate, rating: newRating });
  };

  const updateCandidate = () => {
    updateCandidateMutation({ reqId: id, body: candidate });
  };

  return (
    <>
      <BoxHeader />
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
                      color="primary"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      color="success"
                      onClick={updateCandidate}
                    >
                      Update
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
                    <Row
                      style={{
                        alignItems: "center",
                      }}
                    >
                      <Col lg="6">
                        <FormGroup>
                          <SelectFilter
                            id="status"
                            label="Status"
                            setValue={value =>
                              setCandidate({
                                ...candidate,
                                status: value as ICandidateStatus,
                              })
                            }
                            // @ts-ignore
                            defaultValue={{ label: status, value: status }}
                            options={getSelectStatus(
                              candidatesWithAllStatuses,
                            )}
                          />
                        </FormGroup>
                      </Col>
                      <Col
                        lg="6"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <FormGroup className="mb-0">
                          <Rating
                            onClick={newRating =>
                              handleRatingChange(newRating / 20)
                            }
                            ratingValue={rating}
                            size={30}
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
                            onChange={e => {
                              setCandidate({
                                ...candidate,
                                comment: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          {/* https://react-select.com/creatable */}
                          <CreatableSelect
                            isMulti
                            onChange={handleTagChange}
                            onCreateOption={handleCreate}
                            options={defaultTags}
                            value={mapTags(candidate.tags)}
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
