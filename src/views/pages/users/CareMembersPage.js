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
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// reactstrap components
import { Button, Card, CardHeader, Container, Row } from "reactstrap";
import { pagination } from "utils";
import { employees } from "./EmployeesData";

const { SearchBar } = Search;

function CareMembersPage(props) {
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

  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = el => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>,
    );
  };

  return (
    <>
      {alert}
      <GradientEmptyHeader name="Employees" />
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
