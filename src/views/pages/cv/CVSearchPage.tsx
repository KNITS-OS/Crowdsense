import { CandidateFilters } from "components/Filters";
import { CandidatesTable } from "components/Table";
import { useState } from "react";
import { Container } from "reactstrap";
import { ICandidate, ITableColumn } from "types/types";
import { BoxHeader } from "components/Headers";
import { candidatesWithCVStatus } from "variables";

const CVSearchPage = () => {
  const table: ITableColumn = "candidates2";

  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<
    ICandidate[]
  >([]);

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
          setSelectedCandidates={setSelectedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
          table={table}
        />

        <CandidatesTable
          defaultStatuses={candidatesWithCVStatus}
          workflowRoute="/admin/cv-workflow"
          candidates={candidates}
          setCandidates={setCandidates}
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
          updatedCandidates={updatedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
          table={table}
        />
      </Container>
    </div>
  );
};
export default CVSearchPage;