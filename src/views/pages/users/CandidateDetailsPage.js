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
import { candidates as candidates } from "./CandidatesData";

// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader.js";

function CandidateDetailsPage(props) {

  let { id } = useParams();
  let candidate=candidates.find(cand => cand.id===parseInt(id));
 
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
                      <Col lg="4">
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
                      <Col lg="4">
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
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullname"
                          >
                            Full Name
                          </label>
                          <Input                           
                            id="input-fullname"
                            value={candidate.fullName}
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
                            htmlFor="input-submission-date"
                          >
                            Submission Date
                          </label>
                          <Input                           
                            id="input-submission-date"
                            value={candidate.submissionDate}
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
                    Evaluation
                  </h6>
                  <div className="pl-lg-4">                    
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-status"
                          >
                            Current Status
                          </label>
                          <Input                            
                            id="input-status"
                            value={candidate.status}
                            type="text"
                            disabled = {true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-rating"
                          >
                            Rating
                          </label>
                          <Input                           
                            id="input-rating"
                            value={candidate.rating}
                            disabled = {true}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-tags"
                          >
                            Tags
                          </label>
                          <Input                           
                            id="input-tags"
                            value={candidate.tags}
                            disabled = {true}
                            type="text"                         
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
                          <label
                            className="form-control-label"
                            htmlFor="input-comment"
                          >
                            Comment
                          </label>
                          <Input                            
                            id="input-comment"
                            value={candidate.comment}
                            type="text"
                            disabled = {true}
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
