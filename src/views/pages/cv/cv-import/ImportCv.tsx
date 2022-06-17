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
import { convertFileToJson, getFileExtension } from "utils/XLSXutils";
import { useCreateCandidateMutation } from "redux/features/candidates/candidatesApiSlice";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import { filterTwoArraysByReqId } from "utils";
import { useAlert } from "context";
import SweetAlert from "react-bootstrap-sweetalert";

export function ImportCv() {
    const [ importedData, setImportedData ] = useState<ICandidate[]>([])
    const navigate = useNavigate();

    const {alert:sweetAlert ,setAlert} = useAlert()
    const {alert,setIsSuccess,setSuccessMessage,setSaveSent,setErrorMessage} = useLocalStateAlerts()

    const [importCandidates,{isLoading}] = useCreateCandidateMutation()

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
                setAlert(
                    <SweetAlert
                        danger
                        onConfirm={() => setAlert(null)}
                        title={"Invalid file input, Select Excel, CSV file."}
                    />)
                setImportedData([])
            }
        } else {
            setImportedData([])
        }
    }

    const onImportCurriculums = async (selectedCurriculums: ICandidate[]) => {
        setSaveSent(true)
        await importCandidates(selectedCurriculums).unwrap().then(() => {
            const filteredData = filterTwoArraysByReqId(importedData, selectedCurriculums)
            setIsSuccess(true)
            setSuccessMessage("Candidates successfully imported")
            setImportedData(filteredData)
        }).catch((error) => {
            setErrorMessage(error.error)
            setIsSuccess(false)
        })
    }

    const onDeleteCurriculums = (selectedCurriculums: ICandidate[]) => {
        const filteredData = filterTwoArraysByReqId(importedData, selectedCurriculums)
        setImportedData(filteredData)
        setSaveSent(true)
        setIsSuccess(true)
        setSuccessMessage("Candidates successfully deleted")
    }

    const onChangeCurriculumComment = (newComment: string, reqId:string) => {
        const newState = importedData.map(candidate =>
            candidate.reqId === reqId ? { ...candidate, comment:newComment } : candidate
        );
        setImportedData(newState)
    }

    const onChangeCurriculumRating = (newRating: number, reqId: string) => {
        const newState = importedData.map(candidate =>
            candidate.reqId === reqId ? { ...candidate, rating:newRating } : candidate
        );
        setImportedData(newState)
    }

    const onSelectCurriculumTags = (tags: OptionType[], reqId: string) => {
        const newState = importedData.map(candidate =>
            candidate.reqId === reqId ? { ...candidate, tags:tags } : candidate
        );
        setImportedData(newState)
    }

    return (
        <>
            {sweetAlert}
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                {alert}
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
                            importBtnIsFetching={isLoading}
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
