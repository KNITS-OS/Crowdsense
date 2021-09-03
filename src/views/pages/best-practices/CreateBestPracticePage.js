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
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader.js";

function CreateBestPracticePage() {
  return (
    <>
       <GradientEmptyHeader name="Best Practices"  />
       <Container className="mt--6" fluid>    
        <Row>     
          <Col className="order-xl-1" xl="12">
          <FormGroup>
            <label className="form-control-label">Best Practice</label>
            <Input
                  id="input-postal-code" 
                  type="textarea"
                  rows="20"
                />
            </FormGroup>
          </Col>         
        </Row>
        </Container>
    </>
  );
}

export default CreateBestPracticePage;
