import { useState } from "react";
import BootstrapTable, {
  SelectRowProps,
} from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import DefaultExportCSVButton from "components/Buttons/DefaultExportCSVButton";
import { CandidateFilters } from "components/Filters";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { ICandidate, ISelectRowConfig, ITableColumn } from "types/types";
import {
  axiosInstance,
  defaultColumns,
  getRowsByStatus,
  moveCandidatesToWorkflow,
  pagination,
} from "utils";
import { candidatesWithCVStatus } from "utils/selectUtils";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "../users/components";

const CVSearchPage = () => {
  const table: ITableColumn = "candidates2";
  const history = useHistory();

  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [selectedRows, setSelectedRows] = useState<ICandidate[]>([]);

  /**
   * @description - see which candidates need to be updated
   */
  const [updatedCandidates, setUpdatedCandidates] = useState<ICandidate[]>(
    [],
  );

  const updateCandidateUI = (reqId: string, body: Partial<ICandidate>) => {
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
    await axiosInstance.post(table, [...updatedCandidates], {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    });
    setUpdatedCandidates([]);
  };

  const candidateSelectRowConfig: ISelectRowConfig = {
    status: "CV Reviewed",
  };

  const candidateSelectRow = () => {
    return {
      mode: "checkbox",
      onSelect: (row, isSelect) => {
        // if select is true
        if (isSelect) {
          // adds this selected row to the selectedRows array
          setSelectedRows(oldRows => [...oldRows, row]);
          // select
          return true;
        } else {
          // removes this selected row from the selectedRows array
          setSelectedRows(oldRows =>
            oldRows.filter(oldRow => oldRow.reqId !== row.reqId),
          );
          // unselect
          return true;
        }
      },

      onSelectAll: (isSelect, rows) => {
        if (isSelect) {
          setSelectedRows(
            getRowsByStatus([candidateSelectRowConfig.status], rows),
          );
          return;
        } else {
          setSelectedRows([]);
          return;
        }
      },
    } as SelectRowProps<ICandidate>;
  };

  return (
    <div>
      <GradientEmptyHeader />
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
                  defaultStatuses={candidatesWithCVStatus}
                  setCandidates={setCandidates}
                  setSelectedRows={setSelectedRows}
                  setUpdatedCandidates={setUpdatedCandidates}
                  table="candidates2"
                />
                {/* <Col md="2">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example3cols2Input"
                      >
                        Hire Date From
                      </label>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Hire date",
                        }}
                        onChange={
                          (dateAsMoment: any) =>
                            console.log(dateAsMoment.format("D-MM-YYYY"))

                          // setSearchHiringDate(
                          //   dateAsMoment.format("D-MM-YYYY"),
                          // )
                        }
                        timeFormat={false}
                      />
                    </FormGroup>
                  </Col> */}
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
                    formatter: TableTagsCell,
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
                          <Button
                            className="btn btn-success"
                            onClick={() =>
                              moveCandidatesToWorkflow(
                                "/admin/cv-workflow",
                                selectedRows,
                                history,
                              )
                            }
                          >
                            Workflow
                          </Button>
                        </div>
                        <div>
                          <DefaultExportCSVButton props={props} />
                        </div>
                      </div>

                      <BootstrapTable
                        {...props.baseProps}
                        keyField="reqId"
                        pagination={pagination}
                        bordered={false}
                        selectRow={candidateSelectRow()}
                        // selectRow={() => selectRow()}
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
export default CVSearchPage;
