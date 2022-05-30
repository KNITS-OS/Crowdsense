import React, { useState } from "react";
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
    Label,
    Row
} from "reactstrap";
import GradientEmptyHeader from "../../../components/Headers/GradientEmptyHeader";
import { LabeledFormInput, SelectInput } from "../../../components/Input";
import { getSelectRating, getSelectStatus } from "../../../utils";
import { ICreateCandidateFinalState, ICreateCvInitialState } from "../../../types/types";
import moment from "moment";
import { DATE_FILTER_FORMAT } from "../../../variables/general";


const AddNewCVPage = () => {

    const initialState: ICreateCvInitialState = {
        firstName: { value:'', state:'' },
        lastName: { value:'', state:'' },
        submissionDate: { value:moment(Date.now()).format(DATE_FILTER_FORMAT), state:'valid'},
        email:{ value:'', state:'' },
        country: { value:'', state:'' },
        status: { value:'', state:'' },
        rating: { value:'', state:'' },
        comment: { value:'', state:'' },
    };

    const [values, setValues] = useState(initialState);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: { value:value, state: value ? "valid" : "invalid" },
        });
    };

    const handleSubmit = () => {
        const isValid = Object.values(values).every(
            item => item.state === "valid"
        );

        if (!isValid) {
            const validatedValues = {...values}
            Object.keys(validatedValues).forEach(key => {
                if (validatedValues[key].state !== "valid")
                    validatedValues[key].state = 'invalid';
            });
            setValues(validatedValues)
        } else {
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
                reqId: `Req${Math.random()}`,
                firstName: firstName.value,
                fullName: firstName.value + " " + lastName.value,
                submissionDate: submissionDate.value,
                email: email.value,
                country: country.value,
                status: status.value,
                rating: rating.value,
                comment: comment.value
            };
            console.log(createValues)
        }
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
                                        <h3 className="mb-0">CV Details</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Applicant information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <LabeledFormInput
                                                        id="input-firstname"
                                                        label="First name"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        valid={values.firstName.state === "valid"}
                                                        invalid={values.firstName.state === "invalid"}
                                                        value={values.firstName.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Empty field.</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <LabeledFormInput
                                                        id="input-lastname"
                                                        label="Last Name"
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                        valid={values.lastName.state === "valid"}
                                                        invalid={values.lastName.state === "invalid"}
                                                        value={values.lastName.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Empty field.</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <LabeledFormInput
                                                        id="input-email"
                                                        label="Email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Email"
                                                        valid={values.email.state === "valid"}
                                                        invalid={values.email.state === "invalid"}
                                                        value={values.email.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Empty field.</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <Label
                                                        className="form-control-label"
                                                        htmlFor="input-submission-date"
                                                    >
                                                        Submission Date
                                                    </Label>
                                                        <Input
                                                            id="input-submission-date"
                                                            type="date"
                                                            name="submissionDate"
                                                            value={values.submissionDate.value}
                                                            valid={values.submissionDate.state === "valid"}
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
                                                        placeholder="Country"
                                                        valid={values.country.state === "valid"}
                                                        invalid={values.country.state === "invalid"}
                                                        value={values.country.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Empty field.</div>

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
                                                <SelectInput
                                                    id="rating"
                                                    name="rating"
                                                    label="Rating"
                                                    options={getSelectRating}
                                                    defaultOption={" -- select applicant rating -- "}
                                                    valid={values.rating.state === "valid"}
                                                    invalid={values.rating.state === "invalid"}
                                                    onChange={handleInputChange}
                                                />
                                                    <div className="invalid-feedback">Option not selected.</div>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">

                                                <FormGroup>
                                                    <SelectInput
                                                        id="status"
                                                        name="status"
                                                        label="Status"
                                                        options={getSelectStatus}
                                                        defaultOption={" -- select applicant status -- "}
                                                        valid={values.status.state === "valid"}
                                                        invalid={values.status.state === "invalid"}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Option not selected.</div>
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
                                                        valid={values.comment.state === "valid"}
                                                        invalid={values.comment.state === "invalid"}
                                                        value={values.comment.value}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Empty field.</div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button
                                        type="button"
                                        color="success"
                                        onClick={handleSubmit}
                                    >
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