import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Button, Card, CardHeader, Col, Container, Row } from "reactstrap";
import { ICandidate, ICandidateFilters } from "../../../../types/types";
import { curriculumsTableColumns } from "./SearchCurriculumTable";
import { MouseEvent } from "react";
import { useHistory } from "react-router";
import { ReactTable, TableSelectButton } from "../../../../components/widgets/react-table";
import mockedCurriculums from "../../../../mockData/curriculums.json"
import { CV_DETAILS, CV_IMPORT, CV_NEW, CV_WORKFLOW } from "../../../../variables/routes";
import { getCurriculumSelectStatus } from "../../../../utils";
import { SearchFilterPanel } from "../../../../components/widgets/search-panel";

export const SearchCurriculumPage = () => {
    const history = useHistory();

    const onSearchCurriculums = (filters: ICandidateFilters) => {
        console.log("Search filters", filters)
    }

    const onViewCurriculumDetails = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        history.push(`/admin${CV_DETAILS}/${id.toLowerCase()}`);
    };

    const onExportCurriculums = (selectedCurriculums: ICandidate[]) => {
        console.log("export", selectedCurriculums)
    }

    const onDeleteCurriculums = (selectedCurriculums: ICandidate[]) => {
        console.log("delete", selectedCurriculums)
    }

    const onMoveCurriculumsToWorkflow = (selectedCurriculums: ICandidate[]) => {
        console.log("workflow", selectedCurriculums)
        history.push(`/admin${CV_WORKFLOW}`);
    }
    const onCurriculumCommentChange = (newComment: string) => {
        console.log("update comment", newComment)
    }

    const onCurriculumRatingChange = (newRating: number, reqId: string) => {
        console.log("update rating", newRating, reqId)
    }

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <SearchFilterPanel
                            title="Search Curriculums"
                            statusSelectOptions={getCurriculumSelectStatus}
                            callback={onSearchCurriculums}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className="d-flex justify-content-between">
                                <Row>
                                    <Col md="12">
                                        <h3 className="mb-0">Curriculums</h3>
                                        <p className="text-sm mb-0">
                                            Applicants curriculums
                                        </p>
                                    </Col>
                                </Row>
                                <div>
                                    <Button
                                        onClick={() => history.push(`/admin${CV_IMPORT}`)}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="success"
                                        className="mr-2"
                                        onClick={() => history.push(`/admin${CV_NEW}`)}
                                    >
                                        New
                                    </Button>
                                </div>
                            </CardHeader>

                            <ReactTable
                                data={mockedCurriculums}
                                selectElements={[
                                    <TableSelectButton
                                        title="Export"
                                        callback={onExportCurriculums}
                                    />,
                                    <TableSelectButton
                                        title="Workflow"
                                        color="info"
                                        callback={onMoveCurriculumsToWorkflow}
                                    />,
                                    <TableSelectButton
                                        title="Delete"
                                        color="danger"
                                        callback={onDeleteCurriculums}
                                    />,
                                ]}
                                columns={curriculumsTableColumns({
                                    updateRatingHandler: onCurriculumRatingChange,
                                    onDetailsButtonClick: onViewCurriculumDetails,
                                    onColumnChange: onCurriculumCommentChange
                                })}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
