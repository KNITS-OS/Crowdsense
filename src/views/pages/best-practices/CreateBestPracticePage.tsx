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
// core components
// reactstrap components
import { Col, Container, FormGroup, Input, Row } from "reactstrap";
import { BoxHeader } from "../../../components/Headers";

export const CreateBestPracticePage = () => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <FormGroup>
              <label className="form-control-label">Best Practice</label>
              <Input id="input-postal-code" type="textarea" rows="20" />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};
