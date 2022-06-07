import GradientEmptyHeader from "../../../../components/Headers/GradientEmptyHeader";
import { Col, Container, Row } from "reactstrap";
import { ICandidate, ICandidateFilters, OptionType } from "../../../../types/types";
import { MouseEvent } from "react";
import { useHistory } from "react-router";
import mockedCurriculums from "../../../../mockData/curriculums.json"
import { CV_DETAILS, CV_WORKFLOW } from "../../../../variables/routes";
import { getCurriculumSelectStatus } from "../../../../utils";
import { CandidateResultSetPanel, CandidateSearchFilterPanel } from "../../../../components/panels";
import { candidatesTableColumns } from "../../../../components/widgets/react-table/columns";

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
                        <CandidateSearchFilterPanel
                            title="Search Curriculums"
                            statusSelectOptions={getCurriculumSelectStatus}
                            callback={onSearchCurriculums}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CandidateResultSetPanel
                            title="Curriculums"
                            subTitle="Applicants curriculums"
                            tableType="curriculum"
                            data={mockedCurriculums as ICandidate[]}
                            columns={candidatesTableColumns({
                                onChangeRating: onChangeCurriculumRating,
                                onDetailsButtonClick: onViewCurriculumDetails,
                                onChangeComment: onChangeCurriculumComment,
                                onSelectTags: onSelectCurriculumTags
                            })}
                            onExport={onExportCurriculums}
                            onDelete={onDeleteCurriculums}
                            onWorkflow={onMoveCurriculumsToWorkflow}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
};
