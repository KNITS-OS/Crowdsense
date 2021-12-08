import { ToolkitContextType } from "react-bootstrap-table2-toolkit";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import {
  ICandidate,
  ICandidateStatus,
  IWorkflowRoutes,
} from "../../types/types";
import { createQueryStringForWorkflow } from "../../utils";
import DefaultExportCSVButton from "../Buttons/DefaultExportCSVButton";

interface Props {
  selectedCandidates: ICandidate[];
  updateCandidates: () => Promise<void>;
  toolkitProps: ToolkitContextType;
  workflowRoute: IWorkflowRoutes;
  defaultStatuses: ICandidateStatus[];
}

const TableActions = ({
  selectedCandidates,
  updateCandidates,
  toolkitProps,
  workflowRoute,
  defaultStatuses,
}: Props) => {
  const history = useHistory();
  return (
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
        <Button className="btn btn-success" onClick={updateCandidates}>
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
          onClick={() => {
            const queryString = createQueryStringForWorkflow(
              workflowRoute,
              selectedCandidates,
              defaultStatuses,
            );
            history.push(queryString);
          }}
        >
          Workflow
        </Button>
      </div>
      <div>
        <DefaultExportCSVButton props={toolkitProps} />
      </div>
    </div>
  );
};
export default TableActions;
