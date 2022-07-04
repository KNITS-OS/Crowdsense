import { useNavigate } from "react-router-dom";
import { useAlert } from "context";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import {
  useDeleteCandidateMutation,
  useGetAllCandidatesQuery,
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { ICandidate, ICandidateFilters } from "types/types";
import { MouseEvent, useState } from "react";
import { CV_DETAILS, WORKFLOW_PAGE } from "variables/routes";
import { convertTableStateToXLSX } from "utils/XLSXutils";
import { defaultTableHeaders } from "variables/table";
import FileSaver from "file-saver";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { Col, Container, Row } from "reactstrap";
import {
  CandidateResultSetPanel,
  CandidateSearchFilterPanel,
} from "components/panels";
import { candidatesTableColumns } from "components/widgets/react-table/columns";
import { getInterviewSelectStatus } from "utils/selectUtils";

export const SearchInterviewsPage = () => {
  const { data = [] } = useGetAllCandidatesQuery("interview");
  const [updateCandidate] = useUpdateCandidateMutation();
  const [deleteCandidate, { isLoading }] = useDeleteCandidateMutation();
  const [getFilteredCandidates] = useLazyGetFilteredCandidatesQuery();

  const [filteredData, setFilteredData] = useState<ICandidate[] | null>(null);

  const navigate = useNavigate();

  const { alert: sweetAlert } = useAlert();
  const {
    alert,
    setIsSuccess,
    setSuccessMessage,
    setSaveSent,
    setErrorMessage,
  } = useLocalStateAlerts();

  const onSearchInterviews = async (filters: ICandidateFilters) => {
    setSaveSent(true);
    await getFilteredCandidates(filters)
      .unwrap()
      .then((response) => {
        setFilteredData(response);
      })
      .catch((error) => {
        setErrorMessage(error.error || "Some error has been occurred");
        setIsSuccess(false);
      });
  };

  const onViewInterviewDetails = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    navigate(`/admin${CV_DETAILS}/${id.toLowerCase()}`);
  };

  const onViewWorkflow = () => {
    navigate(`/admin${WORKFLOW_PAGE}`);
  };

  const onExportInterviews = (selectedCurriculums: ICandidate[]) => {
    const exportFile = convertTableStateToXLSX(
      selectedCurriculums,
      defaultTableHeaders
    );
    FileSaver.saveAs(exportFile, "Curriculums.xlsx");
  };

  const onDeleteInterviews = async (selectedCurriculums: ICandidate[]) => {
    // @todo Switch from single element delete to collection

    // const selectedIds = selectedCurriculums.map(cv => cv.reqId)
    setSaveSent(true);
    await deleteCandidate(selectedCurriculums[0].reqId)
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        setSuccessMessage("Candidate successfully deleted");
      })
      .catch((error) => {
        setErrorMessage(error.error || "Some error has been occurred");
        setIsSuccess(false);
      });
  };

  return (
    <>
      {sweetAlert}
      <GradientEmptyHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <CandidateSearchFilterPanel
              title="Search Candidates"
              statusSelectOptions={getInterviewSelectStatus}
              callback={onSearchInterviews}
              setFilteredData={setFilteredData}
            />
          </Col>
        </Row>
        {alert}
        <Row>
          <Col>
            <CandidateResultSetPanel
              title="Interviews"
              subTitle="Applicants to interview"
              data={filteredData ? filteredData : data}
              columns={candidatesTableColumns({
                updateCellMutation: updateCandidate,
                onDetailsButtonClick: onViewInterviewDetails,
              })}
              onExport={onExportInterviews}
              onDelete={onDeleteInterviews}
              onWorkflow={onViewWorkflow}
              deleteBtnIsFetching={isLoading}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
