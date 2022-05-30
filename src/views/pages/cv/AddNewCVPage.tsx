import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Row } from "reactstrap";
import GradientEmptyHeader from "../../../components/Headers/GradientEmptyHeader";
import { FormInputField, FormSelectField } from "../../../components/Input";
import { getSelectRating, getSelectStatus } from "../../../utils";
import moment from "moment";
import { DATE_FILTER_FORMAT } from "../../../variables/general";
import { useForm } from "react-hook-form";
import { ICreateCurriculumRequest } from "../../../types/api";
import { v4 as uuidv4 } from 'uuid';
import { findSelectValue } from "../../../utils/selectUtils";


const AddNewCVPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        reset
    } = useForm<ICreateCurriculumRequest>({ mode: 'onChange' });

    const onFormSubmit = handleSubmit((data) => {
        const createValues = {
            reqId: `Req${uuidv4()}`,
            ...data
        }
        console.log(createValues)
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
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">CV Details</h3>
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
                                                    options={getSelectStatus}
                                                    valid={dirtyFields.status && !errors.status}
                                                    invalid={!!errors.status}
                                                    {...register("status",
                                                        {
                                                            validate: {
                                                                value: (v) => findSelectValue(getSelectStatus, v)
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
};
export default AddNewCVPage;