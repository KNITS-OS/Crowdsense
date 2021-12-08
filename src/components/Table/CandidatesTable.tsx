import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Card, CardHeader, Col, Row } from "reactstrap";
import {
  ICandidate,
  ICandidateStatus,
  ITableColumn,
  IUpdateCandidateUIParams,
  IUseSetCandidate,
  IWorkflowRoutes,
} from "types/types";
import { defaultColumns, pagination, selectCandidateRow } from "utils";
import { updateCandidatesMutation } from "utils/axios";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "views/pages/users/components";
import { TableActions } from ".";

interface Props {
  defaultStatuses: ICandidateStatus[];
  workflowRoute: IWorkflowRoutes;
  candidates: ICandidate[];
  setCandidates: IUseSetCandidate;
  selectedCandidates: ICandidate[];
  setSelectedCandidates: IUseSetCandidate;
  updatedCandidates: ICandidate[];
  setUpdatedCandidates: IUseSetCandidate;
  table: ITableColumn;
}

const CandidatesTable = ({
  defaultStatuses,
  workflowRoute,
  candidates,
  setCandidates,
  selectedCandidates,
  setSelectedCandidates,
  updatedCandidates,
  setUpdatedCandidates,
  table,
}: Props) => {
  const updateCandidateUI = ({
    reqId,
    body,
  }: IUpdateCandidateUIParams) => {
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
                    defaultStatuses={defaultStatuses}
                    selectedCandidates={selectedCandidates}
                    workflowRoute={workflowRoute}
                    updateCandidates={updateCandidates}
                    toolkitProps={props}
                  />

                  <BootstrapTable
                    {...props.baseProps}
                    keyField="reqId"
                    pagination={pagination}
                    bordered={false}
                    selectRow={selectCandidateRow(setSelectedCandidates)}
                    bootstrap4
                  />
                </div>
              );
            }}
          </ToolkitProvider>
        </Card>
      </Col>
    </Row>
  );
};
export default CandidatesTable;
