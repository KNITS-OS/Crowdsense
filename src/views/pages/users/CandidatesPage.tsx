// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useAlert } from "context";
import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// react component for creating dynamic tables
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import Select, { MultiValue } from "react-select";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import {
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { addFilter } from "redux/filters";
import {
  ICandidate,
  ICandidateFilters,
  StringOrUndefined,
} from "types/types";
import { getSelectRating, getSelectStatus, pagination } from "utils";

const Candidates = () => {
  const history = useHistory();

  const candidateDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    var { id } = e.target as HTMLButtonElement;
    history.push(`/admin/users/candidate-details/${id}`);
  };

  const [
    getFilteredCandidates,
    { data: candidates = [], isLoading, isFetching },
  ] = useLazyGetFilteredCandidatesQuery();
  const [updateCandidate] = useUpdateCandidateMutation();

  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState<StringOrUndefined>("");
  const [tags, setTags] = useState<
    MultiValue<{
      value: string;
      label: string;
    }>
  >([]);

  const { alert } = useAlert();

  const findByTagParameters = () => {
    const fullNameFilter = addFilter({
      param: searchName,
      filter: "like",
    });
    const statusFilter = addFilter({ param: status, filter: "eq" });
    const ratingFilter = addFilter({ param: rating, filter: "eq" });
    const emailFilter = addFilter({ param: email, filter: "like" });

    const filters: ICandidateFilters = {
      fullName: fullNameFilter,
      status: statusFilter,
      rating: ratingFilter,
      email: emailFilter,
    };
    getFilteredCandidates({ limit: 30, select: "*", filters });
  };

  const formatActionButtonCell = (_: undefined, row: ICandidate) => {
    const { reqId } = row;
    let candidateId = reqId.toString();

    return (
      <div>
        <Button
          id={candidateId}
          className="btn-icon btn-2"
          type="button"
          color="info"
          onClick={candidateDetails}
        >
          <span id={candidateId} className="btn-inner--icon">
            <i id={candidateId} className="ni ni-badge" />
          </span>
        </Button>
      </div>
    );
  };

  const options = [
    { value: "tag1", label: "Tag1" },
    { value: "tag2", label: "Tag2" },
    { value: "tag3", label: "Tag3" },
    { value: "tag4", label: "Tag4" },
    { value: "tag5", label: "Tag5" },
    { value: "tag6", label: "Tag6" },
  ];

  const onSave = (reqId: string) => {
    console.log("tags", tags);
    console.log("comment", comment);
    const body = {
      comment,
    };
    updateCandidate({ reqId, body });
  };

  const expandRow = {
    renderer: (row: ICandidate) => {
      return (
        <>
          <Row>
            <Col md="10">
              <Select
                isMulti
                options={options}
                onChange={item => setTags(item)}
              />
            </Col>

            <Button
              color="success"
              size="md"
              onClick={() => onSave(row.reqId)}
            >
              Save
            </Button>
          </Row>
          <Row>
            <Col md="10">
              <Input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </Col>
          </Row>
        </>
      );
    },
    onExpand: (row: ICandidate) => {
      setTimeout(() => {
        setComment(row.comment);
      }, 100);
    },
    animate: false,
    onlyOneExpanding: true,
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
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            style={{ height: "36px" }}
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            style={{ height: "36px" }}
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="status"
                          >
                            Status
                          </label>
                          <Select
                            id="status"
                            options={getSelectStatus}
                            onChange={item =>
                              item && setStatus(item.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="rating"
                          >
                            Rating
                          </label>
                          <Select
                            id="rating"
                            options={getSelectRating}
                            onChange={item =>
                              item && setRating(item.value)
                            }
                          />
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
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <button
                        style={{
                          marginTop: "32px",
                          marginLeft: "32px",
                          height: "40px",
                        }}
                        className="btn btn-info"
                        type="button"
                        onClick={findByTagParameters}
                      >
                        Search
                      </button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <div className="col">
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
                  columns={[
                    {
                      dataField: "firstName",
                      text: "First Name",
                    },
                    {
                      dataField: "fullName",
                      text: "Full Name",
                      sort: true,
                    },
                    {
                      dataField: "email",
                      text: "email",
                    },
                    {
                      dataField: "submissionDate",
                      text: "Submission Date",
                      sort: true,
                    },
                    {
                      dataField: "status",
                      text: "Current Status",
                      sort: true,
                    },
                    {
                      dataField: "rating",
                      text: "Rating",
                      sort: true,
                    },
                    {
                      dataField: "action",
                      text: "",
                      formatter: formatActionButtonCell,
                    },
                  ]}
                >
                  {props => {
                    return (
                      <div className="py-4 table-responsive">
                        <BootstrapTable
                          {...props.baseProps}
                          keyField="reqId"
                          bootstrap4={true}
                          pagination={pagination}
                          bordered={false}
                          expandRow={expandRow}
                        />
                      </div>
                    );
                  }}
                </ToolkitProvider>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Candidates;
