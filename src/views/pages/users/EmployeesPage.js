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
import React from "react";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader.js";

import { employees } from "./EmployeesData.js";




const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function Employees(props) {

  

  const employeeDetails = (e)=> {  
      var { id} = e.target;
      props.history.push('/admin/users/employee-details/'+id);     
  }

  const employeeRemove = (e)=> {       
    var { id} = e.target;   
    let empIndex=employees.findIndex(emp => emp.id!==parseInt(id));
    console.log(employees[empIndex]);
    console.log(employees.length);
    employees= employees.splice(id,  1);
    console.log(employees.length);

    //props.history.push('/admin/users/employee-details/'+id);   
  }
  
  const formatActionButtonCell =(cell, row)=>{  
      
    return (    <>
                    <Button id={row.id} className="btn-icon btn-2" type="button" color="info" onClick={employeeDetails}>
                        <span id={row.id} className="btn-inner--icon">
                          <i id={row.id} className="ni ni-badge" />
                        </span>                        
                      </Button>
                      <Button id={row.id} className="btn-icon btn-2" color="danger" type="button" onClick={employeeRemove}>
                        <span id={row.id} className="btn-inner--icon">
                          <i id={row.id} className="ni ni-fat-remove" />
                        </span>
                      </Button>
                      </>);
        
  
  }

  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const copyToClipboardAsTable = (el) => {
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
      </ReactBSAlert>
    );
  };

  return (
    <>
      {alert}
      <GradientEmptyHeader name="Employees"  />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Employees</h3>
                <p className="text-sm mb-0">
                  Kn Employees from PDM
                </p>
              </CardHeader>
              <ToolkitProvider
                data={employees}
                keyField="firstName"
                columns={[
                  {
                    dataField: "firstName",
                    text: "First Name",
                    hidden : true,
                  },
                  {
                    dataField: "lastName",
                    text: "lastName",
                    hidden : true,
                  },
                  {
                    dataField: "internationalName",
                    text: "int Name",
                    sort: true                    
                  },
                  {
                    dataField: "title",
                    text: "title",
                    sort: true ,
                    style: { width:'50px' }                   
                  },
                  {
                    dataField: "businessUnit",
                    text: "bUnit",
                    sort: true,
                    style: { width:'50px' }
                  },
                  {
                    dataField: "managementGroup",
                    text: "Man Group",
                    sort: true,
                    style: { width:'50px' }
                  },
                  {
                    dataField: "companyCode",
                    text: "companyCode",
                    sort: true,
                    style: { width:'50px' }
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
                  },{  
                    dataField: 'action',    
                    text:'',
                    formatter: formatActionButtonCell
                }
                ]}
                search
              >
                {(props) => (
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
                      deleteRow={ true }
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

export default Employees;
