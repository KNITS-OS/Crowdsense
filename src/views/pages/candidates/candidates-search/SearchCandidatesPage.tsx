import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Card, CardHeader, Col, Container, Row } from "reactstrap";
import { ReactTable, TableSelectButton } from "../../../../components/widgets/react-table";
import { useHistory } from "react-router";
import { ICandidate, ICandidateFilters } from "../../../../types/types";
import { MouseEvent } from "react";
import mockedCandidates from "../../../../mockData/candidates.json"
import { getCandidatesSelectStatus } from "../../../../utils";
import { SearchFilterPanel } from "../../../../components/widgets/search-panel";
import { candidatesTableColumns } from "./SearchCandidatesTable";
import {
    useUpdateCandidateMutation
} from "../../../../redux/features/candidates/candidatesApiSlice";
import { CANDIDATE_DETAILS } from "../../../../variables/routes";

export const SearchCandidatesPage = () => {
    const [ updateCandidate ] = useUpdateCandidateMutation();

    const history = useHistory()

    const onViewCandidateDetails = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        history.push(`/admin${CANDIDATE_DETAILS}/${id.toLowerCase()}`);
    };

    const onExportCandidate = (selectedCandidates: ICandidate[]) => {
        console.log("export", selectedCandidates)
    }

    const onDeleteCandidates = (selectedCandidates: ICandidate[]) => {
        console.log("delete", selectedCandidates)
    }

    const onCandidateRatingChange = (newRating: number, reqId: string) => {
        updateCandidate({
            reqId: reqId,
            body: { rating: newRating },
        });
        console.log("update rating", newRating, reqId)
    }

    const onSearchCandidates = (filters: ICandidateFilters) => {
        console.log("Search filters", filters)
    }

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <SearchFilterPanel
                            title="Search Candidates"
                            statusSelectOptions={getCandidatesSelectStatus}
                            callback={onSearchCandidates}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className="d-flex justify-content-between">
                                <Row>
                                    <Col md="12">
                                        <h3 className="mb-0">Candidates</h3>
                                        <p className="text-sm mb-0">
                                            Applicants
                                        </p>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <ReactTable
                                data={mockedCandidates}
                                selectElements={[
                                    <TableSelectButton
                                        title="Export"
                                        callback={onExportCandidate}
                                    />,
                                    <TableSelectButton
                                        title="Delete"
                                        color="danger"
                                        callback={onDeleteCandidates}
                                    />,
                                ]}
                                columns={candidatesTableColumns({
                                    updateRatingHandler: onCandidateRatingChange,
                                    onDetailsButtonClick: onViewCandidateDetails,
                                })}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

