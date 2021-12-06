import { CandidateFilters } from "components/Filters";
import { TableActions } from "components/Table";
import { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { ICandidate, ITableColumn } from "types/types";
import { defaultColumns, pagination, selectCandidateRow } from "utils";
import { updateCandidatesMutation } from "utils/axios";
import { candidatesWithCVStatus } from "utils/selectUtils";
import { BoxHeader } from "../../../components/Headers";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "../users/components";

const CVSearchPage = () => {
  const table: ITableColumn = "candidates2";

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
    await updateCandidatesMutation(table, updatedCandidates);
    setUpdatedCandidates([]);
  };

  return (
    <div>
      <BoxHeader />
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
                  table={table}
                />
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
                      <TableActions
                        defaultStatuses={candidatesWithCVStatus}
                        selectedRows={selectedRows}
                        workflowRoute="/admin/cv-workflow"
                        updateCandidates={updateCandidates}
                        toolkitProps={props}
                      />

                      <BootstrapTable
                        {...props.baseProps}
                        keyField="reqId"
                        pagination={pagination}
                        bordered={false}
                        selectRow={selectCandidateRow(setSelectedRows)}
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
