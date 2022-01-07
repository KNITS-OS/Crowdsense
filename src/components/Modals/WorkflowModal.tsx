import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  ModalFooter,
} from "reactstrap";
import { ICandidate, ICandidateStatus } from "types/types";
import { updateCandidatesMutation, getSelectStatus } from "utils";
import { candidatesWithAllStatuses } from "variables";
import { WorkflowCard } from "../Cards";
import { SelectFilter } from "../Filters";

interface Props {
  candidates: ICandidate[];
  setCandidates: React.Dispatch<React.SetStateAction<ICandidate[]>>;
  selectedCandidates: ICandidate[];
  setSelectedCandidates: React.Dispatch<
    React.SetStateAction<ICandidate[]>
  >;
  tableRef: React.MutableRefObject<undefined>;
}

export const WorkflowModal = ({
  candidates,
  setCandidates,
  selectedCandidates,
  setSelectedCandidates,
  tableRef,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [updatedCandidates, setUpdatedCandidates] =
    useState(selectedCandidates);

  const unselectRows = () => {
    setSelectedCandidates([]);
    // @ts-ignore
    tableRef.current.selectionContext.selected = [];
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    unselectRows();
    setIsOpen(false);
    setUpdatedCandidates(selectedCandidates);
  };
  useEffect(() => {
    const updateCandidatesStatus = () => {
      setUpdatedCandidates(oldCandidates =>
        oldCandidates.map(oldCandidate => {
          return {
            ...oldCandidate,
            status: status as ICandidateStatus,
          };
        }),
      );
    };

    updateCandidatesStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setUpdatedCandidates(selectedCandidates);
  }, [selectedCandidates]);

  const updateMultibleCandidates = async () => {
    unselectRows();
    await updateCandidatesMutation(updatedCandidates);

    // @todo two ways. update state like this or refetch everything
    updatedCandidates.forEach(updatedCandidate => {
      const candidateIndex = candidates.findIndex(
        candidate => candidate.reqId === updatedCandidate.reqId,
      );
      setCandidates(oldCandidates => {
        // replace the old candidate with the new one
        oldCandidates.splice(candidateIndex, 1, updatedCandidate);

        return [...oldCandidates];
      });
    });
    unselectRows();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="btn btn-primary"
        color="primary"
        onClick={toggleModal}
      >
        Workflow Modal
      </Button>
      <Modal isOpen={isOpen} size="lg">
        <ModalHeader
          close={
            <button className="close" onClick={closeModal}>
              ×
            </button>
          }
        >
          Candidates
        </ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: "1rem" }}>
            <SelectFilter
              id="status"
              label="Status"
              setValue={setStatus}
              options={getSelectStatus(candidatesWithAllStatuses)}
            />
          </div>
          <Row>
            {updatedCandidates.map((candidate, index) => (
              <WorkflowCard key={index} candidate={candidate} />
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateMultibleCandidates}>
            Update
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
