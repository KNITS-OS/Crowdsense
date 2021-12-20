import { CandidateFilters } from "components/Filters";
import { BoxHeader } from "components/Headers";
import { CandidatesTable } from "components/Table";
import { useState } from "react";
import { Container } from "reactstrap";
import { ICandidate } from "types/types";
import {
  candidatesWithInterviewStatus,
  ADMIN_INTERVIEW_WORKFLOW,
} from "variables";

const InterviewSearchPage = () => {
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
          defaultStatuses={candidatesWithInterviewStatus}
          setCandidates={setCandidates}
          setSelectedCandidates={setSelectedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
        />

        <CandidatesTable
          defaultStatuses={candidatesWithInterviewStatus}
          workflowRoute={ADMIN_INTERVIEW_WORKFLOW}
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
export default InterviewSearchPage;
