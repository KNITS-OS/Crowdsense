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
import { employees as candidates } from "./EmployeesData.js";

// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader.js";

function CandidateDetailsPage(props) {

  let { id } = useParams();
  let candidate=candidates.find(emp => emp.id===parseInt(id));
 
  return (
    <>
      <GradientEmptyHeader name="Candidates"  />
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
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}                  
                        >
                          Invite to Care
                        </Button> 
                        <Button
                          type="button"
                          color="info"
                          href="#"
                          onClick={(e) => props.history.push('/admin/candidates')}                  
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
                            value={candidate.firstName}
                            type="text"
                            disabled = {true}
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
                            value={candidate.lastName}
                            disabled = {true}
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
                            value={candidate.internationalName}
                            disabled = {true}
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
                            value={candidate.email}
                            disabled = {true}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                   

                  </div>
                  <hr className="my-4" />

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
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">Company Data</h6>
                  <div className="pl-lg-4">
                  <Row>
                      <Col lg="4">
                          <FormGroup>
                          <label className="form-control-label">Title</label>
                          <Input
                                id="title"
                                value={candidate.title}
                                disabled = {true}
                                type="text"
                              />
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">Company Phone</label>
                          <Input
                                id="companyPhone"
                                value="+372 77645322"
                                disabled = {true}
                                type="text"
                              />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label">Company Code</label>
                          <Input
                                id="input-postal-code"
                                value={candidate.companyCode}
                                disabled = {true}
                                type="text"
                              />
                          </FormGroup>
                        </Col>
                        </Row>
                   
                        <Row>
                        <Col lg="4">
                            <FormGroup>
                            <label className="form-control-label">Business Unit</label>
                            <Input
                                  id="input-postal-code"
                                  value={candidate.businessUnit}
                                  disabled = {true}
                                  type="text"
                                />
                            </FormGroup>
                          </Col>

                          <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">Cost Center</label>
                            <Input
                                  id="input-postal-code"
                                  value={candidate.costCenter}
                                  disabled = {true}
                                  type="text"
                                />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">Management Group</label>
                            <Input
                                  id="input-postal-code"
                                  value={candidate.managementGroup}
                                  disabled = {true}
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

export default CandidateDetailsPage;
