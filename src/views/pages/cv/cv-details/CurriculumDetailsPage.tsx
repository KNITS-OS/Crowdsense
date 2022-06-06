import React from "react";
import { useParams } from "react-router-dom";
import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { CV_SEARCH } from "../../../../variables/routes";
import { useHistory } from "react-router";

export const CurriculumDetailsPage = () => {
    const params = useParams() as { id: string }
    const history = useHistory()

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col
                                ms="12"
                                className="d-flex justify-content-between align-items-center"
                            >
                                <h3 className="mb-0">Curriculum Details</h3>
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
                        <h1>{params.id} - Details</h1>
                    </CardBody>
                </Card>
            </Container>
        </>
    );
};

