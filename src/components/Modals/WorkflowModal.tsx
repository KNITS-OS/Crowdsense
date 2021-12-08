import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  ICandidate,
  ICandidateStatus,
  ITableColumn,
} from "../../types/types";
import { getSelectStatus } from "../../utils";
import { updateCandidatesMutation } from "../../utils/axios";
import { candidatesWithAllStatuses } from "../../variables";
import { WorkflowCard } from "../Cards";
import { SelectFilter } from "../Filters";

interface Props {
  table: ITableColumn;
  selectedCandidates: ICandidate[];
  candidates: ICandidate[];
  setCandidates: React.Dispatch<React.SetStateAction<ICandidate[]>>;
}

const WorkflowModal = ({
  table,
  selectedCandidates,
  candidates,
  setCandidates,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [updatedCandidates, setUpdatedCandidates] =
    useState(selectedCandidates);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    setIsOpen(false);
    setUpdatedCandidates(selectedCandidates);
  };
  useEffect(() => {
    const updateCandidatesState = () => {
      setUpdatedCandidates(oldCandidates =>
        oldCandidates.map(oldCandidate => {
          return {
            ...oldCandidate,
            status: status as ICandidateStatus,
          };
        }),
      );
    };
    updateCandidatesState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setUpdatedCandidates(selectedCandidates);
  }, [selectedCandidates]);

  const updateMultibleCandidates = async () => {
    await updateCandidatesMutation(table, updatedCandidates);

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
    // @todo maybe make them unselected

    setIsOpen(false);
  };

  return (
    <>
      <Button className="btn btn-success" onClick={toggleModal}>
        Workflow
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
export default WorkflowModal;
