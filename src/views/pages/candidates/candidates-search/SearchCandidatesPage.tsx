import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { Col, Container, Row } from "reactstrap";
import { ICandidate, ICandidateFilters, OptionType } from "types/types";
import { MouseEvent } from "react";
import { getCandidatesSelectStatus } from "utils";
import { useUpdateCandidateMutation } from "redux/features/candidates/candidatesApiSlice";
import { CANDIDATE_DETAILS } from "variables/routes";
import { CandidateResultSetPanel, CandidateSearchFilterPanel } from "components/panels";
import { candidatesTableColumns } from "components/widgets/react-table/columns";
import mockedCurriculums from "mockData/curriculums.json";
import { useNavigate } from "react-router-dom";
import { convertTableStateToXLSX } from "../../../../utils/XLSXutils";
import { defaultTableHeaders } from "../../../../variables/table";
import FileSaver from "file-saver";

export const SearchCandidatesPage = () => {
    const [ updateCandidate ] = useUpdateCandidateMutation();
    const navigate = useNavigate();

    const onViewCandidateDetails = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        navigate(`/admin${CANDIDATE_DETAILS}/${id.toLowerCase()}`);
    };

    const onExportCandidates = (selectedCandidates: ICandidate[]) => {
        if (selectedCandidates.length) {
            const exportFile = convertTableStateToXLSX(selectedCandidates, defaultTableHeaders)
            FileSaver.saveAs(exportFile, "Candidates.xlsx");
        } else alert('No Candidates Selected!')
    }

    const onDeleteCandidates = (selectedCandidates: ICandidate[]) => {
        console.log("delete", selectedCandidates)
    }

    const onChangeCandidateRating = (newRating: number, reqId: string) => {
        updateCandidate({
            reqId: reqId,
            body: { rating: newRating },
        });
        console.log("update rating", newRating, reqId)
    }

    const onSearchCandidates = (filters: ICandidateFilters) => {
        console.log("Search filters", filters)
    }
    const onChangeCandidateComment = (newComment: string) => {
        console.log("update comment", newComment)
    }

    const onSelectCandidateTags = (id: string, tags: OptionType[]) => {
        console.log("Tags", id, tags)
    }

    return (
        <>
            <GradientEmptyHeader/>
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <CandidateSearchFilterPanel
                            title="Search Candidates"
                            statusSelectOptions={getCandidatesSelectStatus}
                            callback={onSearchCandidates}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CandidateResultSetPanel
                            title="Candidates"
                            subTitle="Applicants"
                            data={mockedCurriculums as ICandidate[]}
                            columns={candidatesTableColumns({
                                onChangeRating: onChangeCandidateRating,
                                onDetailsButtonClick: onViewCandidateDetails,
                                onChangeComment: onChangeCandidateComment,
                                onSelectTags: onSelectCandidateTags
                            })}
                            onDelete={onDeleteCandidates}
                            onExport={onExportCandidates}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
};

