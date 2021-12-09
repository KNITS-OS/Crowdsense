import { CandidateFilters } from "components/Filters";
import { CandidatesTable } from "components/Table";
import { useState } from "react";
import { Container } from "reactstrap";
import { ICandidate } from "types/types";
import { BoxHeader } from "components/Headers";
import { candidatesWithOfferStatus } from "variables";

const OfferSearchPage = () => {
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
          defaultStatuses={candidatesWithOfferStatus}
          setCandidates={setCandidates}
          setSelectedCandidates={setSelectedCandidates}
          setUpdatedCandidates={setUpdatedCandidates}
        />

        <CandidatesTable
          defaultStatuses={candidatesWithOfferStatus}
          workflowRoute="/admin/offer-workflow"
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
export default OfferSearchPage;
