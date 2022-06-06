import React, { ChangeEvent, useState } from 'react';
import * as XLSX from "xlsx";
import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Button, Card, CardHeader, Col, Container, Input, Row } from "reactstrap";
import { CV_SEARCH } from "../../../../variables/routes";
import { useHistory } from "react-router";
import { ReactTable, TableSelectButton } from "../../../../components/widgets/react-table";
import { importCurriculumsTableColumns } from "./ImportCVTable";
import { convertFileToJson, getFileExtension } from "../../../../utils/utils";
import { ICandidate } from "../../../../types/types";


export function ImportCv() {
    const [ importedData, setImportedData ] = useState<Array<any>>([])
    const history = useHistory()

    const onImportExcel = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        const reader = new FileReader()
        reader.onload = (event) => {

            //parse data
            const bstr = event.target?.result
            const workBook = XLSX.read(bstr, { type: "binary" })

            //get first sheet
            const workSheetName = workBook.SheetNames[0]
            const workSheet = workBook.Sheets[workSheetName]
            //convert to array
            const fileData: Array<object> = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

            const dataKeys = importCurriculumsTableColumns().map((item) => item.accessor) as string[]

            //removing header
            fileData.splice(0, 1)

            setImportedData(convertFileToJson(dataKeys, fileData))
        }

        if (file) {
            if (getFileExtension(file)) {
                reader.readAsBinaryString(file)
            } else {
                alert("Invalid file input, Select Excel, CSV file")
                setImportedData([])
            }
        } else {
            setImportedData([])
        }
    }

    const onCurriculumsImport = (selectedCurriculums: ICandidate[]) => {
        console.log(selectedCurriculums)
    }

    const onCurriculumsDelete = (selectedCurriculums: ICandidate[]) => {
        const results = importedData.filter(({ reqId: id1 }) => (
            !selectedCurriculums.some(({ reqId: id2 }) => id2 === id1))
        );
        setImportedData(results)
    }

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
                                <h3 className="mb-0">Import data from excel file</h3>
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
                    <Row className="ml-4">
                        <Col xl="4">
                            <div className="custom-file mb-3 ">
                                <Input
                                    className="custom-file-input"
                                    type="file"
                                    onChange={onImportExcel}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="import-input"
                                >
                                    Select file
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <ReactTable
                        data={importedData}
                        selectElements={[
                            <TableSelectButton
                                title="Import"
                                color="success"
                                callback={onCurriculumsImport}
                            />,
                            <TableSelectButton
                                title="Delete"
                                color="danger"
                                callback={onCurriculumsDelete}
                            />,
                        ]}
                        columns={importCurriculumsTableColumns()}
                    />
                </Card>
            </Container>
        </>
    );
}
