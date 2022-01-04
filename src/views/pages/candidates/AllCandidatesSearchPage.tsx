// core components
import DefaultExportCSVButton from "components/Buttons/DefaultExportCSVButton";
import { CandidateFilters } from "components/Filters";
import { BoxHeader } from "components/Headers";
import { WorkflowModal } from "components/Modals";
import { useAlert } from "context";
import { useTags } from "hooks";
import { useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// react component for creating dynamic tables
import ToolkitProvider from "react-bootstrap-table2-toolkit";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { ICandidate, IUpdateCandidateUIParams } from "types/types";
import { defaultColumns, pagination, selectCandidateRow } from "utils";
import { updateCandidatesMutation } from "utils/axios";
import { candidatesWithAllStatuses } from "variables";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "./components";

const AllCandidatesSearchPage = () => {
  const { alert: alertHook } = useAlert();
  const tableRef = useRef();
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const { defaultTags } = useTags();
  const [selectedCandidates, setSelectedCandidates] = useState<
    ICandidate[]
  >([]);

  /**
   * @description - see which candidates need to be updated
   */
  const [updatedCandidates, setUpdatedCandidates] = useState<ICandidate[]>(
    [],
  );

  const updateCandidateUI = ({
    reqId,
    body,
  }: IUpdateCandidateUIParams) => {
    const candidateIndex = candidates.findIndex(
      candidate => candidate.reqId === reqId,
    );

    let oldCandidate = candidates[candidateIndex];

    const updatedCandidate: ICandidate = {
      ...oldCandidate,
      ...body,
    };

    setUpdatedCandidates(oldUpdatedCandidates => [
      ...oldUpdatedCandidates,
      updatedCandidate,
    ]);

    setCandidates(oldCandidates => {
      // replace the old candidate with the new one
      oldCandidates.splice(candidateIndex, 1, updatedCandidate);

      return [...oldCandidates];
    });
  };

  const updateCandidates = async () => {
    await updateCandidatesMutation(updatedCandidates);
    setUpdatedCandidates([]);
  };

  return (
    <div>
      {alertHook}
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Search Candidates</h3>
                <p className="text-sm mb-0">Filters</p>
              </CardHeader>
              <CardBody>
                <CandidateFilters
                  defaultStatuses={candidatesWithAllStatuses}
                  setCandidates={setCandidates}
                  setSelectedCandidates={setSelectedCandidates}
                  setUpdatedCandidates={setUpdatedCandidates}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h3 className="mb-0">Candidates</h3>
                <p className="text-sm mb-0">Candidates for internship</p>
              </CardHeader>
              <ToolkitProvider
                data={candidates}
                keyField="reqId"
                bootstrap4
                exportCSV
                columns={[
                  ...defaultColumns,
                  {
                    dataField: "rating",
                    text: "Rating",
                    sort: true,
                    formatter: (_, row) =>
                      TableRatingCell({
                        row,
                        updateCandidateUI,
                      }),
                  },
                  {
                    dataField: "tags",
                    text: "Tags",
                    formatter: (_, row) =>
                      TableTagsCell({
                        row,
                        defaultTags,
                        updateCandidateUI,
                      }),
                    headerStyle: () => {
                      return { width: "19rem" };
                    },
                  },
                  {
                    dataField: "action",
                    text: "",
                    formatter: (_, row) => TableActionButtons({ row }),
                  },
                ]}
              >
                {props => {
                  return (
                    <div className="py-4 table-responsive">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: "20px",
                          marginRight: "20px",
                        }}
                      >
                        <div
                          style={{
                            marginRight: "10px",
                          }}
                        >
                          <Button
                            className="btn btn-success"
                            onClick={updateCandidates}
                          >
                            Update
                          </Button>
                        </div>
                        <div
                          style={{
                            marginRight: "10px",
                          }}
                        >
                          <WorkflowModal
                            candidates={candidates}
                            setCandidates={setCandidates}
                            selectedCandidates={selectedCandidates}
                            setSelectedCandidates={setSelectedCandidates}
                            tableRef={tableRef}
                          />
                        </div>
                        <div>
                          <DefaultExportCSVButton props={props} />
                        </div>
                      </div>

                      <BootstrapTable
                        // @ts-ignore
                        ref={tableRef}
                        {...props.baseProps}
                        keyField="reqId"
                        pagination={pagination}
                        bordered={false}
                        selectRow={selectCandidateRow(
                          setSelectedCandidates,
                        )}
                        bootstrap4
                      />
                    </div>
                  );
                }}
              </ToolkitProvider>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AllCandidatesSearchPage;
