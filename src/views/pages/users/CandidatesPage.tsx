// core components
import { InputFilter } from "components/Filters";
import SelectFilter from "components/Filters/SelectFilter";
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
  Spinner,
} from "reactstrap";
import { useAppDispatch } from "redux/app/hooks";
import {
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { addCandidatesToCVWorkflow } from "redux/features/workflow/workflowSlice";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateFilters } from "types/types";
import { getSelectRating, getSelectStatus, pagination } from "utils";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "./components";

const Candidates = () => {
  const [
    getFilteredCandidates,
    { data: candidates = [], isLoading, isFetching },
  ] = useLazyGetFilteredCandidatesQuery();
  const { alert } = useAlert();
  const [updateCandidate] = useUpdateCandidateMutation();

  const dispatch = useAppDispatch();

  const { ExportCSVButton } = CSVExport;

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRows, setSelectedRows] = useState<ICandidate[]>([]);

  const findByFilters = () => {
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
    getFilteredCandidates({ limit: 100, select: "*", filters });
    setSelectedRows([]);
  };

  const selectRow: SelectRowProps<ICandidate> = {
    mode: "checkbox",
    onSelect: (row, isSelect) => {
      if (isSelect) {
        setSelectedRows(oldRows => [...oldRows, row]);
      } else {
        setSelectedRows(oldRows =>
          oldRows.filter(oldRow => oldRow.reqId !== row.reqId),
        );
      }
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        setSelectedRows(rows);
      } else {
        setSelectedRows([]);
      }
    },
  };

  const moveCandidatesToCVWorkflow = () => {
    dispatch(addCandidatesToCVWorkflow(selectedRows));
  };

  return (
    <div>
      {alert}
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
                <Row>
                  <Col md="10">
                    <Row>
                      <Col md="3">
                        <InputFilter
                          id="name"
                          placeholder="Name"
                          value={name}
                          setValue={setName}
                        />
                      </Col>
                      <Col md="3">
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
                      <Col md="3">
                        <SelectFilter
                          id="rating"
                          label="Rating"
                          setValue={setRating}
                          options={getSelectRating}
                        />
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
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Button
                        style={{
                          marginTop: "32px",
                          marginLeft: "32px",
                          height: "40px",
                        }}
                        className="btn btn-info"
                        type="button"
                        onClick={findByFilters}
                      >
                        Search
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
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
              {isLoading || isFetching ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Spinner />
                </div>
              ) : (
                <ToolkitProvider
                  data={candidates}
                  keyField="id"
                  bootstrap4
                  exportCSV
                  columns={[
                    {
                      dataField: "firstName",
                      text: "First Name",
                      editable: false,
                      headerStyle: () => {
                        return { width: "8rem" };
                      },
                    },
                    {
                      dataField: "fullName",
                      text: "Full Name",
                      sort: true,
                      editable: false,
                    },
                    {
                      dataField: "email",
                      text: "email",
                      editable: false,
                      headerStyle: () => {
                        return { width: "14rem" };
                      },
                    },
                    {
                      dataField: "submissionDate",
                      text: "Submission Date",
                      sort: true,
                      editable: false,
                    },
                    {
                      dataField: "status",
                      text: "Current Status",
                      sort: true,
                      editable: false,
                    },
                    {
                      dataField: "rating",
                      text: "Rating",
                      sort: true,
                      formatter: (_, row) =>
                        TableRatingCell({ row, updateCandidate }),
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
                      // style: { width: "50px", margin: "0 auto" },
                    },
                  ]}
                >
                  {props => {
                    return (
                      <div className="py-4 table-responsive">
                        {/* make a flex div and all the items should be aligned to right */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              marginRight: "10px",
                            }}
                          >
                            <Button
                              className="btn btn-success"
                              onClick={moveCandidatesToCVWorkflow}
                            >
                              Workflow
                            </Button>
                          </div>
                          <div>
                            <ExportCSVButton
                              {...props.csvProps}
                              style={{
                                backgroundColor: "#00a8ff",
                                borderColor: "#00a8ff",
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
                          // cellEdit={cellEditFactory({
                          //   mode: "dbclick",
                          //   blurToSave: true,
                          // })}
                        />
                      </div>
                    );
                  }}
                </ToolkitProvider>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Candidates;
