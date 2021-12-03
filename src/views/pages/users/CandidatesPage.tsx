// core components
import { InputFilter, SelectFilter } from "components/Filters";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useAlert } from "context";
import { useState } from "react";
import BootstrapTable, {
  SelectRowProps,
} from "react-bootstrap-table-next";
// react component for creating dynamic tables
import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateFilters } from "types/types";
import {
  axiosInstance,
  defaultColumns,
  getRowsByStatus,
  getSelectRating,
  getSelectStatus,
  moveCandidatesToWorkflow,
  pagination,
} from "utils";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "./components";

const Candidates = () => {
  const table = "candidates2";
  const { alert: alertHook } = useAlert();
  const history = useHistory();
  const { ExportCSVButton } = CSVExport;

  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");

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

  const findByFilters = async () => {
    const nameFilter = addFilter({ param: name, filter: "like" });
    const statusFilter = addFilter({ param: status, filter: "eq" });
    const ratingFilter = addFilter({ param: rating, filter: "eq" });
    const emailFilter = addFilter({ param: email, filter: "like" });

    const filters: ICandidateFilters = {
      fullName: nameFilter,
      status: statusFilter,
      rating: ratingFilter,
      email: emailFilter,
    };

    let { data } = await axiosInstance.get(table, {
      params: {
        select: "*",
        ...filters,
        limit: 100,
      },
    });
    setCandidates(data);
    // getFilteredCandidates({ limit: 100, select: "*", filters });
    setUpdatedCandidates([]);
    setSelectedRows([]);
  };

  const selectRow: SelectRowProps<ICandidate> = {
    mode: "checkbox",
    onSelect: (row, isSelect) => {
      if (isSelect && row.status !== "CV Review") {
        alert(
          "Oops, You can not select a candidate that doesn't have CV Review status",
        );
        return false;
      } else if (isSelect) {
        setSelectedRows(oldRows => [...oldRows, row]);
        return true;
      } else {
        setSelectedRows(oldRows =>
          oldRows.filter(oldRow => oldRow.reqId !== row.reqId),
        );
        return true;
      }
    },
    // @ts-ignore
    // because i return a string array, but this likes to receive a number array
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        setSelectedRows(getRowsByStatus("CV Review", rows));

        // selects only rows with "CV Review" status
        return rows
          .filter(row => row.status === "CV Review")
          .map(row => row.reqId);
      } else {
        setSelectedRows([]);
        return;
      }
    },
  };

  const updateTable = async () => {
    await updateCandidates();
  };

  return (
    <div>
      {alertHook}
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
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Col md="3">
                    <InputFilter
                      id="name"
                      placeholder="Name"
                      value={name}
                      setValue={setName}
                    />
                  </Col>
                  <Col md="2.5">
                    <InputFilter
                      id="email"
                      placeholder="Email"
                      value={email}
                      setValue={setEmail}
                    />
                  </Col>
                  <Col md="3">
                    <SelectFilter
                      id="status"
                      label="Status"
                      setValue={setStatus}
                      options={getSelectStatus}
                    />
                  </Col>
                  <Col md="2">
                    <SelectFilter
                      id="rating"
                      label="Rating"
                      setValue={setRating}
                      options={getSelectRating}
                    />
                  </Col>
                  <Col md="1.5">
                    <FormGroup style={{ marginBottom: 0 }}>
                      <Button
                        className="btn btn-primary"
                        color="primary"
                        onClick={findByFilters}
                      >
                        Search
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
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
                            onClick={updateTable}
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
                          <ExportCSVButton
                            {...props.csvProps}
                            style={{
                              backgroundColor: "#003369",
                              borderColor: "#003369",
                            }}
                          >
                            Export
                          </ExportCSVButton>
                        </div>
                      </div>

                      <BootstrapTable
                        {...props.baseProps}
                        keyField="reqId"
                        pagination={pagination}
                        bordered={false}
                        selectRow={selectRow}
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

export default Candidates;
