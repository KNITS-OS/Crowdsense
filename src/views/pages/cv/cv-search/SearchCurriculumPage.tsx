import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { Button, Col, Container, Row } from "reactstrap";
import { ICandidate, ICandidateFilters } from "types/types";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CV_DETAILS, CV_IMPORT, CV_NEW, WORKFLOW_PAGE } from "variables/routes";
import { getCurriculumSelectStatus } from "utils";
import {
  CandidateResultSetPanel,
  CandidateSearchFilterPanel,
} from "components/panels";
import { candidatesTableColumns } from "components/widgets/react-table/columns";
import { convertTableStateToXLSX } from "utils/XLSXutils";
import FileSaver from "file-saver";
import { defaultTableHeaders } from "variables/table";
import { useLocalStateAlerts } from "hooks/useLocalStateAlerts";
import { useAlert } from "context";
import {
  useDeleteCandidateMutation,
  useGetAllCandidatesQuery,
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { ErrorAlert, SuccessAlert } from "../../../../components/alerts";
import { errorText, successUpdateText } from "../../../../variables/alerts";

export const SearchCurriculumPage = () => {
  const { data = [] } = useGetAllCandidatesQuery("null");
  const [deleteCandidate, { isLoading }] = useDeleteCandidateMutation();
  const [getFilteredCandidates] = useLazyGetFilteredCandidatesQuery();
  const [updateCandidate, { isSuccess, isError }] =
    useUpdateCandidateMutation();

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

  const onSearchCurriculums = async (filters: ICandidateFilters) => {
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

  const onViewCurriculumDetails = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    navigate(`/admin${CV_DETAILS}/${id.toLowerCase()}`);
  };

  const onExportCurriculums = (selectedCurriculums: ICandidate[]) => {
    const exportFile = convertTableStateToXLSX(
      selectedCurriculums,
      defaultTableHeaders
    );
    FileSaver.saveAs(exportFile, "Curriculums.xlsx");
  };

  const onDeleteCurriculums = async (selectedCurriculums: ICandidate[]) => {
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

  const onAddCurriculumsToWorkflow = async (
    selectedCurriculums: ICandidate[]
  ) => {
    // @todo Switch from single element post to collection

    // const selectedIds = selectedCurriculums.map(cv => cv.reqId)
    if (selectedCurriculums.length) {
      await updateCandidate({
        reqId: selectedCurriculums[0].reqId,
        body: { workflow: "cv" },
      })
        .unwrap()
        .then(() => {
          setIsSuccess(true);
          setSuccessMessage("Candidate successfully moved to workflow");
        })
        .catch((error) => {
          setErrorMessage(error.error || "Some error has been occurred");
          setIsSuccess(false);
        });
    }
    navigate(`/admin${WORKFLOW_PAGE}`);
  };

  return (
    <>
      {sweetAlert}
      <GradientEmptyHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <CandidateSearchFilterPanel
              title="Search Curriculums"
              statusSelectOptions={getCurriculumSelectStatus}
              callback={onSearchCurriculums}
              setFilteredData={setFilteredData}
            />
          </Col>
        </Row>
        {alert}
        {isSuccess && <SuccessAlert>{successUpdateText}</SuccessAlert>}
        {isError && <ErrorAlert>{errorText}</ErrorAlert>}
        <Row>
          <Col>
            <CandidateResultSetPanel
              title="Curriculums"
              subTitle="Applicants curriculums"
              data={filteredData ? filteredData : data}
              columns={candidatesTableColumns({
                updateCellMutation: updateCandidate,
                onDetailsButtonClick: onViewCurriculumDetails,
              })}
              onExport={onExportCurriculums}
              onDelete={onDeleteCurriculums}
              onAddToWorkflow={onAddCurriculumsToWorkflow}
              deleteBtnIsFetching={isLoading}
            >
              <Button
                color="success"
                onClick={() => navigate(`/admin${CV_IMPORT}`)}
              >
                Import
              </Button>

              <Button
                color="success"
                className="mr-2"
                onClick={() => navigate(`/admin${CV_NEW}`)}
              >
                New
              </Button>
            </CandidateResultSetPanel>
          </Col>
        </Row>
      </Container>
    </>
  );
};
