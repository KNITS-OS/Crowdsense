import { useState } from "react";

import { Container } from "reactstrap";

import { CandidateFilters } from "components/Filters";
import { BoxHeader } from "components/Headers";
import { CandidatesTable } from "components/Table";

import { ICandidate } from "types/types";
import { ADMIN_CV_WORKFLOW } from "variables/routeVariables";
import { candidatesWithCVStatus } from "variables/statusVariables";

export const CVSearchPage = () => {
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
        />

        <CandidatesTable
          defaultStatuses={candidatesWithCVStatus}
          workflowRoute={ADMIN_CV_WORKFLOW}
          candidates={candidates}
          setCandidates={setCandidates}
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
          updatedCandidates={updatedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
        />
      </Container>
    </div>
  );
};
