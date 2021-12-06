/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// core components
import { useAlert } from "context";
import React from "react";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// reactstrap components
import { Button, Card, CardHeader, Container, Row } from "reactstrap";
import { pagination } from "utils";
import { BoxHeader } from "../../../../../components/Headers";
import { employees } from "./EmployeesData";

const { SearchBar } = Search;

function CareMembersPage(props) {
  const { alert } = useAlert();

  const rowDataDetails = e => {
    //console.log(e.target);
    var { id } = e.target;
    console.log("See Details for Id: " + id);
    //props.history.push('/admin/users/care-member-details/'+id);
    props.history.push("/admin/users/care-member-details/1");
  };

  const formatActionButtonCell = (cell, row) => {
    return (
      <>
        <Button
          className="btn-icon btn-2"
          type="button"
          color="info"
          onClick={rowDataDetails}
        >
          <span className="btn-inner--icon">
            <i className="ni ni-badge" />
          </span>
        </Button>
        <Button
          className="btn-icon btn-2"
          color="danger"
          type="button"
          onClick={rowDataDetails}
        >
          <span className="btn-inner--icon">
            <i className="ni ni-fat-remove" />
          </span>
        </Button>
      </>
    );
  };

  return (
    <>
      {alert}
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Care Members</h3>
                <p className="text-sm mb-0">
                  Care Members visible according to current user's role
                </p>
              </CardHeader>
              <ToolkitProvider
                data={employees}
                keyField="firstName"
                columns={[
                  {
                    dataField: "firstName",
                    text: "First Name",
                    hidden: true,
                  },
                  {
                    dataField: "lastName",
                    text: "lastName",
                    hidden: true,
                  },
                  {
                    dataField: "internationalName",
                    text: "int Name",
                    sort: true,
                  },
                  {
                    dataField: "title",
                    text: "title",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "businessUnit",
                    text: "bUnit",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "managementGroup",
                    text: "Man Group",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "companyCode",
                    text: "companyCode",
                    sort: true,
                    style: { width: "50px" },
                  },
                  {
                    dataField: "costCenter",
                    text: "costCenter",
                    sort: true,
                  },
                  {
                    dataField: "country",
                    text: "country",
                    sort: true,
                  },
                  {
                    dataField: "action",
                    text: "",
                    formatter: formatActionButtonCell,
                  },
                ]}
                search
              >
                {props => (
                  <div className="py-4 table-responsive">
                    <div
                      id="datatable-basic_filter"
                      className="dataTables_filter px-4 pb-1"
                    >
                      <label>
                        Search:
                        <SearchBar
                          className="form-control-sm"
                          placeholder=""
                          {...props.searchProps}
                        />
                      </label>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CareMembersPage;
