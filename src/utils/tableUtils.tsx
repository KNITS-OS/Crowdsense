import paginationFactory from "react-bootstrap-table2-paginator";
import { Label } from "reactstrap";
import { ICandidate, ICandidateStatus } from "types/types";

export const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <Label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e =>
              onSizePerPageChange(parseInt(e.target.value), 1)
            }
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </Label>
    </div>
  ),
});

export const defaultColumns = [
  {
    dataField: "firstName",
    text: "First Name",
    editable: false,
    headerStyle: () => {
      return { width: "8rem" };
    },
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
    headerStyle: () => {
      return { width: "14rem" };
    },
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
];

/**
 * @description - This function is used to get all candidates with given status from given rows
 * @returns - Array of candidates with given status
 */
export const getRowsByStatus = (
  status: ICandidateStatus,
  rows: ICandidate[],
) => rows.filter(row => row.status === status);
