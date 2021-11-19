// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useAlert } from "context";
import { defaultTags } from "mockData";
import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// react component for creating dynamic tables
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Rating } from "react-simple-star-rating";
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
import {
  useLazyGetFilteredCandidatesQuery,
  useUpdateCandidateMutation,
} from "redux/features/candidates/candidatesApiSlice";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateFilters } from "types/types";
import { getSelectRating, getSelectStatus, pagination } from "utils";
import { InputFilter } from "../../../components/Filters";
import SelectFilter from "../../../components/Filters/SelectFilter";

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

  // const [getCandidateTags, { data: candidateTags = [] }] =
  //   useLazyGetCandidateTagsQuery();
  const [updateCandidate] = useUpdateCandidateMutation();

  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRows, setSelectedRows] = useState<ICandidate[]>([]);
  // const [tags, setTags] = useState<any>();

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
    getFilteredCandidates({ limit: 150, select: "*", filters });
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

  const handleChange = (newValue: OnChangeValue<any, true>) => {
    console.log(newValue);
    // setTags(newValue);
  };

  const tagsSelectCell = (_: undefined, row: ICandidate) => {
    return (
      <>
        <Row>
          <Col md="10">
            {/* https://react-select.com/creatable */}
            <CreatableSelect
              isMulti
              onChange={handleChange}
              // onChange={item => setTags(item)}
              options={defaultTags}
              // value={candidateTags.map(tag => ({
              //   value: tag.value,
              //   label: tag.label,
              // }))}
            />
          </Col>
        </Row>
      </>
    );
  };

  const ratingCell = (_: undefined, row: ICandidate) => {
    if (!row.rating) row.rating = 0;

    const handleRatingChange = (newRating: number) => {
      updateCandidate({
        reqId: row.reqId,
        body: { rating: newRating },
      });
    };
    return (
      <>
        <Row>
          <Col md="10">
            <Rating
              onClick={newRating => handleRatingChange(newRating)}
              ratingValue={row.rating}
            />
          </Col>
        </Row>
      </>
    );
  };
  // const handleRatingUpdate

  const selectRow: any = {
    mode: "checkbox",
    onSelect: (row: ICandidate, isSelect: boolean) => {
      if (isSelect) {
        setSelectedRows(oldRows => [...oldRows, row]);
      } else {
        setSelectedRows(oldRows =>
          oldRows.filter(oldRow => oldRow.reqId !== row.reqId),
        );
      }
    },
  };

  const handleMove = () => {
    console.log(selectedRows);
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
                          value={searchName}
                          setValue={setSearchName}
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
                        onClick={findByTagParameters}
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
                <Row
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Col md="10">
                    <h3 className="mb-0">Candidates</h3>
                    <p className="text-sm mb-0">
                      Candidates for internship
                    </p>
                  </Col>
                  <Col md="2">
                    <Button onClick={handleMove}>Move</Button>
                  </Col>
                </Row>
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
                      editable: false,
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
                    // {
                    //   dataField: "rating",
                    //   text: "Rating",
                    //   sort: true,
                    //   editable: true,
                    //   editor: {
                    //     type: "select",
                    //     options: getSelectRating,
                    //   },
                    // },
                    {
                      dataField: "rating",
                      text: "Rating",
                      sort: true,
                      formatter: ratingCell,
                    },
                    {
                      dataField: "tags",
                      text: "Tags",
                      formatter: tagsSelectCell,
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
                          selectRow={selectRow}
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
