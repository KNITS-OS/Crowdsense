import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Row } from "reactstrap";
import { FormInputField, FormSelectField } from "../../../../components/Input";
import { useForm } from "react-hook-form";
import moment from "moment";
import { ICreateCurriculumRequest } from "../../../../types/api";
import { DATE_FILTER_FORMAT } from "../../../../variables/general";
import { getCurriculumSelectStatus, getSelectRating } from "../../../../utils";
import { findSelectValue } from "../../../../utils/selectUtils";
import { useHistory } from "react-router";
import { CV_SEARCH } from "../../../../variables/routes";

export const AddNewCVPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        reset
    } = useForm<ICreateCurriculumRequest>({ mode: 'onChange' });
    const history = useHistory()

    const onFormSubmit = handleSubmit((data) => {
        console.log(data)
        reset()
    });

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="12"
                                         className="d-flex justify-content-between align-items-center">
                                        <h3 className="mb-0">New Curriculum</h3>
                                        <Button
                                            className="btn btn-primary"
                                            color="primary"
                                            onClick={() => history.push(`/admin${CV_SEARCH}`)}
                                        >
                                            Back to Search
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onFormSubmit}>
                                    <h6 className="heading-small text-muted mb-4">
                                        Applicant information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormInputField
                                                    id="input-firstname"
                                                    label="First name"
                                                    placeholder="First Name"
                                                    errorText="Empty field"
                                                    valid={dirtyFields.firstName && !errors.firstName}
                                                    invalid={!!errors.firstName}
                                                    {...register("firstName",
                                                        { required: true })}
                                                />
                                            </Col>
                                            <Col lg="4">

                                                <FormInputField
                                                    id="input-lastname"
                                                    label="Last Name"
                                                    placeholder="Last Name"
                                                    errorText="Empty field"
                                                    valid={dirtyFields.lastName && !errors.lastName}
                                                    invalid={!!errors.lastName}
                                                    {...register("lastName",
                                                        { required: true, })}
                                                />
                                            </Col>
                                            <Col lg="4">
                                                <FormInputField
                                                    id="input-email"
                                                    label="Email"
                                                    type="email"
                                                    placeholder="Email"
                                                    errorText="Empty field"
                                                    valid={dirtyFields.email && !errors.email}
                                                    invalid={!!errors.email}
                                                    {...register("email",
                                                        { required: true })}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormInputField
                                                    id="input-submission-date"
                                                    label="Submission Date"
                                                    type="date"
                                                    defaultValue={moment(Date.now()).format(DATE_FILTER_FORMAT)}
                                                    valid={!errors.submissionDate}
                                                    invalid={!!errors.submissionDate}
                                                    {...register("submissionDate",
                                                        { required: true })}
                                                />
                                            </Col>
                                            <Col lg="4">
                                                <FormInputField
                                                    id="input-country"
                                                    label="Country"
                                                    placeholder="Country"
                                                    errorText="Empty field"
                                                    valid={dirtyFields.country && !errors.country}
                                                    invalid={!!errors.country}
                                                    {...register("country",
                                                        { required: true })}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    <h6 className="heading-small text-muted mb-4">
                                        Evaluation
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormSelectField
                                                    id="rating"
                                                    label="Rating"
                                                    defaultOption="select applicant rating"
                                                    errorText="Rating not selected"
                                                    options={getSelectRating}
                                                    valid={dirtyFields.rating && !errors.rating}
                                                    invalid={!!errors.rating}
                                                    {...register("rating",
                                                        {
                                                            validate: {
                                                                value: v => findSelectValue(getSelectRating, v.toString())
                                                            }
                                                        })}
                                                />
                                            </Col>
                                            <Col lg="6">
                                                <FormSelectField
                                                    id="status"
                                                    label="Status"
                                                    defaultOption={"select applicant status"}
                                                    errorText="Status not selected"
                                                    options={getCurriculumSelectStatus}
                                                    valid={dirtyFields.status && !errors.status}
                                                    invalid={!!errors.status}
                                                    {...register("status",
                                                        {
                                                            validate: {
                                                                value: (v) => findSelectValue(getCurriculumSelectStatus, v)
                                                            }
                                                        })}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>

                                    <h6 className="heading-small text-muted mb-4">
                                        Additional information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormInputField
                                                    id="input-comment"
                                                    label="Comment"
                                                    errorText="Empty field"
                                                    valid={dirtyFields.comment && !errors.comment}
                                                    invalid={!!errors.comment}
                                                    {...register("comment",
                                                        { required: true })}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button type="submit" color="success">
                                        Add
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

