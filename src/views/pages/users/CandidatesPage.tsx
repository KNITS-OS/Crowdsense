// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useAlert } from "context";
import React, { useState } from "react";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import Select from "react-select";
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
} from "reactstrap";
import { getSelectRating, getSelectStatus, pagination } from "utils";
import { candidates } from ".";
import { ICandidate } from "../../../types/types";

const Candidates = () => {
  const history = useHistory();
  const candidateDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    var { id } = e.target as HTMLButtonElement;
    history.push("/admin/users/candidate-details/" + id);
  };

  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");

  const { alert } = useAlert();

  const findByAllParameters = async () => {
    // const lastNameFilter = addLastnameFilter(searchLastName);
    // const countryFilter = await addCountryFilter(searchCountry);
    // const businessUnitFilter = await addBusinessUnitFilter(
    //   searchBusinessUnit,
    // );
    const filters = {
      fullName: searchName,
      status,
      rating,
    };
    // fetchEmployeesByFilters({ select: "*", filters });
    console.log(filters);
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
                        onClick={findByAllParameters}
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
                    sort: true, //TODO fix the sorting
                  },
                  {
                    dataField: "status",
                    text: "Current Status",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "rating",
                    text: "Rating",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "action",
                    text: "",
                    formatter: formatActionButtonCell,
                  },
                ]}
                search
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
                      />
                    </div>
                  );
                }}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Candidates;
