import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  useGetCandidateQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import {
  FormInputField,
  FormSelectField,
  LabeledFormInput,
} from "components/Input";
import { useForm } from "react-hook-form";
import { getCurriculumSelectStatus, getSelectRating } from "utils";
import { defaultTags } from "mockData";
import { CV_SEARCH } from "variables/routes";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import { ICandidate } from "types/types";
import { useEffect } from "react";
import FormMultiSelectField from "components/Input/FormMultiSelectField";

export const CandidateDetailsPage = () => {
  let { id = "" } = useParams();
  const candidateId = id[0]?.toUpperCase() + id.substring(1);

  const [updateCandidate] = useUpdateCandidateMutation();
  const { data, isError, isLoading, isSuccess, isFetching } =
    useGetCandidateQuery(candidateId);

  const {
    alert,
    setIsSuccess,
    setSuccessMessage,
    setSaveSent,
    setErrorMessage,
  } = useLocalStateAlerts();

  const { register, handleSubmit, control, setValue } = useForm<ICandidate>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setValue("status", status);
      setValue("rating", rating);
      setValue("tags", tags);
    }
  }, [isSuccess]);

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

  if (!data) {
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
    tags = [],
  } = data;

  const onFormSubmit = handleSubmit(async (data) => {
    setSaveSent(true);
    await updateCandidate({ reqId: candidateId, body: data })
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        setSuccessMessage(`${candidateId} has been updated`);
      })
      .catch((error) => {
        setErrorMessage(error.error || "Some error has been occurred");
        setIsSuccess(false);
      });
  });

  return (
    <>
      <GradientEmptyHeader />
      <Container className="mt--6" fluid>
        {alert}
        {isError && <div>Couldn't fetch data</div>}
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <Row className="d-flex justify-content-between align-items-center">
                  <Col md="12">
                    <h3 className="mb-0">Candidate Details</h3>
                  </Col>
                </Row>
                <div className="d-flex align-items-center">
                  <Button
                    color="primary"
                    onClick={() => {
                      // @todo fix navigation to right paths
                      navigate(`/admin${CV_SEARCH}}`);
                    }}
                  >
                    Back to Search
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onFormSubmit}>
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

                  <h6 className="heading-small text-muted mb-4">Evaluation</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormSelectField
                          name="status"
                          label="Status"
                          defaultValue={{ value: status, label: status }}
                          options={getCurriculumSelectStatus}
                          control={control}
                        />
                      </Col>
                      <Col lg="6">
                        <FormSelectField
                          name="rating"
                          label="Rating"
                          defaultValue={{ value: rating, label: rating }}
                          options={getSelectRating}
                          control={control}
                        />
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
                        <FormInputField
                          id="input-comment"
                          label="Comment"
                          defaultValue={comment}
                          {...register("comment")}
                        />
                      </Col>
                      <Col lg="12">
                        <FormMultiSelectField
                          name="tags"
                          label="Tags"
                          defaultValue={tags}
                          options={defaultTags}
                          control={control}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Button color="success" type="submit">
                    Save
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
