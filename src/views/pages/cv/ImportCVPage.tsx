import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Row } from "reactstrap";
import GradientEmptyHeader from "../../../components/Headers/GradientEmptyHeader";
import { useForm } from "react-hook-form";
import { ICurriculumFileRequest } from "../../../types/api";

const ImportCVPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm<ICurriculumFileRequest>({ mode: "onChange" });

    const { ref, ...importField } = register('importFile', {
        required: { value: true, message: 'File required' },
    })

    const onFormSubmit = handleSubmit((data) => {
        console.log(data)
    });

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card>
                            <CardHeader>
                                <h3 className="mb-0">Import Data</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onFormSubmit}>
                                    {
                                        errors.importFile &&
                                        <p className={"text-warning font-weight-500"}>
                                            {errors.importFile.message}
                                        </p>
                                    }
                                    <div className="custom-file mb-3">
                                        <Input
                                            className="custom-file-input"
                                            id="import-input"
                                            lang="en"
                                            type="file"
                                            accept={".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"}
                                            innerRef={ref}
                                            valid={dirtyFields.importFile && !errors.importFile}
                                            {...importField}
                                        />
                                        <label
                                            className="custom-file-label"
                                            htmlFor="import-input"
                                        >
                                            Select file
                                        </label>
                                    </div>

                                    <Button type="submit" color="success">
                                        Import
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

export default ImportCVPage;
