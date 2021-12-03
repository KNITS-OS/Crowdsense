import { useState } from "react";
import BootstrapTable, {
  SelectRowProps,
} from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { ICandidate, ICandidateStatus } from "types/types";
import {
  axiosInstance,
  defaultColumns,
  getRowsByStatus,
  moveCandidatesToWorkflow,
  pagination,
} from "utils";
import {
  TableActionButtons,
  TableRatingCell,
  TableTagsCell,
} from "views/pages/users/components";
import DefaultExportCSVButton from "../Buttons/DefaultExportCSVButton";

interface Props {
  candidates: ICandidate[];
  setCandidates: React.Dispatch<React.SetStateAction<ICandidate[]>>;
  selectableStatuses: ICandidateStatus[];
}

const CandidatesTableToolkit = ({
  candidates,
  setCandidates,
  selectableStatuses,
}: Props) => {
  const history = useHistory();
  const table = "candidates2";

  /**
   * @description - see which candidates need to be updated
   */
  const [updatedCandidates, setUpdatedCandidates] = useState<ICandidate[]>(
    [],
  );
  const [selectedRows, setSelectedRows] = useState<ICandidate[]>([]);

  const updateCandidates = async () => {
    await axiosInstance.post(table, [...updatedCandidates], {
      headers: {
        prefer: "resolution=merge-duplicates",
      },
    });
    setUpdatedCandidates([]);
  };

  const updateTable = async () => {
    await updateCandidates();
  };

  const candidateSelectRow: SelectRowProps<ICandidate> = {
    mode: "checkbox",
    onSelect: (row, isSelect) => {
      if (isSelect) {
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
        setSelectedRows(getRowsByStatus(selectableStatuses, rows));

        // selects only rows with candidateSelectRowConfig.status status
        return rows
          .filter(row =>
            selectableStatuses.map(status => row.status === status),
          )
          .map(row => row.reqId);
      } else {
        setSelectedRows([]);
        return;
      }
    },
  };

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

  return (
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
                marginRight: "20px",
              }}
            >
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                <Button className="btn btn-success" onClick={updateTable}>
                  Update
                </Button>
              </div>
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                <Button
                  className="btn btn-success"
                  onClick={() =>
                    moveCandidatesToWorkflow(
                      "/admin/cv-workflow",
                      selectedRows,
                      history,
                    )
                  }
                >
                  Workflow
                </Button>
              </div>
              <div>
                <DefaultExportCSVButton props={props} />
              </div>
            </div>

            <BootstrapTable
              {...props.baseProps}
              keyField="reqId"
              pagination={pagination}
              bordered={false}
              selectRow={candidateSelectRow}
              bootstrap4
            />
          </div>
        );
      }}
    </ToolkitProvider>
  );
};
export default CandidatesTableToolkit;
