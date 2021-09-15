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
  UncontrolledTooltip
} from "reactstrap";
// core components
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader.js";

import { employees as candidates } from "./EmployeesData.js";


const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: true,
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

function Candidates(props) {
  const candidateDetails = (e)=> {  
      var { id} = e.target;
      props.history.push('/admin/users/candidate-details/'+id);     
  }
  
  const formatActionButtonCell =(cell, row)=>{  
    return (    
      <div>
        <Button id={row.id} className="btn-icon btn-2" type="button" color="info" onClick={candidateDetails}>
          <span id={row.id} className="btn-inner--icon">
            <i id={row.id} className="ni ni-badge" />
          </span>                        
        </Button>
      </div>);
  }

  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);

  return (
    <div>
      {alert}
      <GradientEmptyHeader name="Candidates"  />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Candidates</h3>
                <p className="text-sm mb-0">
                  Candidates for internship
                </p>
              </CardHeader>
              <ToolkitProvider
                data={candidates}
                keyField="id"
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
    </div>
  );
}

export default Candidates;
