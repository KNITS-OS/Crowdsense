// core components
import { CandidateFilters } from "components/Filters";
import GradientEmptyHeader from "components/Headers/GradientEmptyHeader";
import { useAlert } from "context";
import { useState } from "react";
import BootstrapTable, {
  SelectRowProps,
} from "react-bootstrap-table-next";
// react component for creating dynamic tables
import ToolkitProvider from "react-bootstrap-table2-toolkit";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import { ICandidate, ISelectRowConfig } from "types/types";
import { defaultColumns, getRowsByStatus, pagination } from "utils";
import { updateCandidatesMutation } from "utils/axios";
import { candidatesWithAllStatuses } from "utils/selectUtils";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "./components";

const Candidates = () => {
  const table = "candidates2";
  const { alert: alertHook } = useAlert();

  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  // @ts-ignore
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

  // @ts-ignore
  const updateCandidates = async () => {
    await updateCandidatesMutation(table, updatedCandidates);
    setUpdatedCandidates([]);
  };

  const candidateSelectRowConfig: ISelectRowConfig = {
    status: "CV Review",
  };

  const candidateSelectRow: SelectRowProps<ICandidate> = {
    mode: "checkbox",
    onSelect: (row, isSelect) => {
      if (isSelect && row.status !== candidateSelectRowConfig.status) {
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
    // because this code returns a string array, but onSelectAll likes to receive a number array
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        setSelectedRows(
          getRowsByStatus([candidateSelectRowConfig.status], rows),
        );

        // selects only rows with candidateSelectRowConfig.status status
        return rows
          .filter(row => row.status === candidateSelectRowConfig.status)
          .map(row => row.reqId);
      } else {
        setSelectedRows([]);
        return;
      }
    },
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
                <CandidateFilters
                  defaultStatuses={candidatesWithAllStatuses}
                  setCandidates={setCandidates}
                  setSelectedRows={setSelectedRows}
                  setUpdatedCandidates={setUpdatedCandidates}
                  table="candidates2"
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
                      {/* <TableActions
                        toolkitProps={props}
                        selectedRows={selectedRows}
                        updateCandidates={updateCandidates}
                        workflowRoute="/admin/cv-workflow"

                      /> */}

                      <BootstrapTable
                        {...props.baseProps}
                        keyField="reqId"
                        pagination={pagination}
                        bordered={false}
                        selectRow={candidateSelectRow}
                        // selectRow={() => selectRow()}
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
