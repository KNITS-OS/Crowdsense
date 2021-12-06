import { CandidateFilters } from "components/Filters";
import { CandidatesTable } from "components/Table";
import { useState } from "react";
import { Container } from "reactstrap";
import { ICandidate, ITableColumn } from "types/types";
import { candidatesWithCVStatus } from "utils/selectUtils";
import { BoxHeader } from "../../../components/Headers";

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

  return (
    <div>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <CandidateFilters
          defaultStatuses={candidatesWithCVStatus}
          setCandidates={setCandidates}
          setSelectedRows={setSelectedRows}
          setUpdatedCandidates={setUpdatedCandidates}
          table={table}
        />

        <CandidatesTable
          defaultStatuses={candidatesWithCVStatus}
          workflowRoute="/admin/cv-workflow"
          candidates={candidates}
          setCandidates={setCandidates}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          updatedCandidates={updatedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
          table={table}
        />
      </Container>
    </div>
  );
};
export default CVSearchPage;
