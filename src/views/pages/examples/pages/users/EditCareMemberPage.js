/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";

import {useParams} from "react-router-dom";
import {employees} from "./EmployeesData";

// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";

function EditCareMemberPage(props) {
    let {id} = useParams(); //see in routes path: "/candidates/employee-details/:id",
    let employee = employees[0]; //.filter(emp => emp.id===id)[0];

    return (
        <>
            <GradientEmptyHeader name="Employees"/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card>
                            <CardHeader>
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Care Member Details</h3>
                                    </Col>
                                </Row>
                                <Row className="align-items-center py-4">
                                    <Col lg="12" xs="7" className="text-right">
                                        <Button
                                            type="button"
                                            color="danger"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Offboard from Care
                                        </Button>
                                        <Button
                                            type="button"
                                            color="info"
                                            href="#pablo"
                                            onClick={e =>
                                                props.history.push("/admin/care-members")
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
                                        Care Member information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        Onboard Date
                                                    </label>
                                                    <Input
                                                        id="input-first-name"
                                                        value="12/12/2020"
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Auto Offboard Date
                                                    </label>
                                                    <Input
                                                        id="input-last-name"
                                                        value="12/12/2021"
                                                        onChange={e => e.preventDefault}
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
                                                        htmlFor="input-username"
                                                    >
                                                        Care Role
                                                    </label>
                                                    <Input
                                                        id="input-last-name"
                                                        value="Care Advocate"
                                                        onChange={e => e.preventDefault}
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
                                                        Country
                                                    </label>
                                                    <Input
                                                        id="input-email"
                                                        value={employee.country}
                                                        onChange={e => e.preventDefault}
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>

                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                                                    </label>
                                                    <Input
                                                        id="input-first-name"
                                                        value={employee.firstName}
                                                        type="text"
                                                        disabled={true}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last name
                                                    </label>
                                                    <Input
                                                        id="input-last-name"
                                                        value={employee.lastName}
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
                                                        htmlFor="input-username"
                                                    >
                                                        International Name
                                                    </label>
                                                    <Input
                                                        id="input-username"
                                                        value={employee.internationalName}
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
                                                        value={employee.email}
                                                        disabled={true}
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>

                                    <h6 className="heading-small text-muted mb-4">
                                        Contact information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        Address
                                                    </label>
                                                    <Input
                                                        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                        id="input-address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        City
                                                    </label>
                                                    <Input
                                                        defaultValue="New York"
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
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
                                                        defaultValue="United States"
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Postal code
                                                    </label>
                                                    <Input
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>

                                    <h6 className="heading-small text-muted mb-4">
                                        Company Data
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Title
                                                    </label>
                                                    <Input
                                                        id="title"
                                                        value={employee.title}
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Company Phone
                                                    </label>
                                                    <Input
                                                        id="companyPhone"
                                                        value="+372 77645322"
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Company Code
                                                    </label>
                                                    <Input
                                                        id="input-postal-code"
                                                        value={employee.companyCode}
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Business Unit
                                                    </label>
                                                    <Input
                                                        id="input-postal-code"
                                                        value={employee.businessUnit}
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Cost Center
                                                    </label>
                                                    <Input
                                                        id="input-postal-code"
                                                        value={employee.costCenter}
                                                        disabled={true}
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label className="form-control-label">
                                                        Management Group
                                                    </label>
                                                    <Input
                                                        id="input-postal-code"
                                                        value={employee.managementGroup}
                                                        disabled={true}
                                                        type="text"
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
}

export default EditCareMemberPage;
