import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { Col, Container, Row } from "reactstrap";
import { ICandidate, ICandidateFilters } from "types/types";
import { MouseEvent, useState } from "react";
import { getCandidatesSelectStatus } from "utils";
import {
  useDeleteCandidateMutation,
  useGetAllCandidatesQuery,
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { CV_DETAILS } from "variables/routes";
import {
  CandidateResultSetPanel,
  CandidateSearchFilterPanel,
  candidatesTableColumns
} from "views/panels"
import { useNavigate } from "react-router-dom";
import { convertTableStateToXLSX } from "utils/XLSXutils";
import { defaultTableHeaders } from "variables/table";
import FileSaver from "file-saver";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import { useAlert } from "../../../../context";

export const SearchCandidatesPage = () => {
  const { data = [] } = useGetAllCandidatesQuery();
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

  const onSearchCandidates = async (filters: ICandidateFilters) => {
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

  const onSaveComment = (event: React.MouseEvent<HTMLElement>) => {};
  const onChangeComment= (newComment: string, id: string) => {};
  
  const onViewCandidateDetails = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    navigate(`/admin${CV_DETAILS}/${id.toLowerCase()}`);
  };

  const onExportCandidates = (selectedCurriculums: ICandidate[]) => {
    const exportFile = convertTableStateToXLSX(
      selectedCurriculums,
      defaultTableHeaders
    );
    FileSaver.saveAs(exportFile, "Curriculums.xlsx");
  };

  const onDeleteCandidates = async (selectedCurriculums: ICandidate[]) => {
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
              setFilteredData={setFilteredData}
              title="Search Candidates"
              statusSelectOptions={getCandidatesSelectStatus}
              callback={onSearchCandidates}
            />
          </Col>
        </Row>
        {alert}
        <Row>
          <Col>
            <CandidateResultSetPanel
              title="Candidates"
              subTitle="Applicants"
              data={filteredData ? filteredData : data}
              columns={candidatesTableColumns({
                updateCellMutation: updateCandidate,
                onDetailsButtonClick: onViewCandidateDetails,
                onSaveComment:onSaveComment,
                onChangeComment:onChangeComment 
              })}
              onDelete={onDeleteCandidates}
              onExport={onExportCandidates}
              deleteBtnIsFetching={isLoading}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
