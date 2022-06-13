import { ChangeEvent, useState } from 'react';
import * as XLSX from "xlsx";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { Button, Col, Container, Row } from "reactstrap";
import { ICandidate, OptionType } from "types/types";
import { CandidateResultSetPanel } from "components/panels";
import { candidatesTableColumns } from "components/widgets/react-table/columns";
import { FileButton } from "components/Buttons";
import { CV_SEARCH } from "variables/routes";
import { useNavigate } from "react-router-dom";
import { importCurriculumsTableColumns } from "./ImportCVTable";
import { convertFileToJson, getFileExtension } from "../../../../utils/XLSXutils";

export function ImportCv() {
    const [ importedData, setImportedData ] = useState<ICandidate[]>([])
    const navigate = useNavigate();

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

    const onImportCurriculums = (selectedCurriculums: ICandidate[]) => {
        console.log(selectedCurriculums)
    }

    const onDeleteCurriculums = (selectedCurriculums: ICandidate[]) => {
        const results = importedData.filter(({ reqId: id1 }) => (
            !selectedCurriculums.some(({ reqId: id2 }) => id2 === id1))
        );
        setImportedData(results)
    }

    const onChangeCurriculumComment = (newComment: string) => {
        console.log("update comment", newComment)
    }

    const onChangeCurriculumRating = (newRating: number, reqId: string) => {
        console.log("update rating", newRating, reqId)
    }

    const onSelectCurriculumTags = (id: string, tags: OptionType[]) => {
        console.log("Tags", id, tags)
    }

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <CandidateResultSetPanel
                            title="Import data from excel file"
                            subTitle="Import applicants"
                            data={importedData}
                            columns={candidatesTableColumns({
                                onChangeRating: onChangeCurriculumRating,
                                onChangeComment: onChangeCurriculumComment,
                                onSelectTags: onSelectCurriculumTags
                            })}
                            onImport={onImportCurriculums}
                            onDelete={onDeleteCurriculums}
                        >
                                <FileButton
                                    label="Upload file"
                                    onImport={onImportExcel}
                                    color="success"
                                />
                                <Button
                                    className="btn btn-primary"
                                    color="primary"
                                    onClick={() => navigate(`/admin${CV_SEARCH}`)}
                                >
                                    Back to Search
                                </Button>
                        </CandidateResultSetPanel>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
