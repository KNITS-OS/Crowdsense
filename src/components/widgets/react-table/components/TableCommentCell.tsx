import { Button } from "reactstrap";
import { useState } from "react";
import { CandidatesMutationTriggerType } from "redux/features/candidates/candidatesApiSlice";
import { ICandidate } from "types/types";

interface IProps {
  candidate: ICandidate;
  updateCellMutation?: CandidatesMutationTriggerType<ICandidate>;
  localChange?: (newComment: string, reqId: string) => void;
}

export const TableCommentCell = ({
  candidate,
  updateCellMutation,
  localChange,
}: IProps) => {
  const { reqId, comment = "" } = candidate;

  const [newComment, setNewComment] = useState(comment);
  const [toggle, setToggle] = useState(false);

  const onSave = () => {
    if (newComment !== comment) {
      if (updateCellMutation) {
        updateCellMutation({ reqId: reqId, body: { comment: newComment } });
      }
      if (localChange) {
        localChange(newComment, reqId);
      }
    } else setToggle(false);
  };

  return (
    <>
      {!toggle ? (
        <div onDoubleClick={() => setToggle(true)}>{comment}</div>
      ) : (
        <div>
          <textarea
            style={{ width: "100%" }}
            defaultValue={comment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="d-flex justify-content-between flex-wrap">
            <Button size="sm" color="success" onClick={onSave}>
              Save
            </Button>
            <Button
              size="sm"
              color="danger"
              className="m-0"
              onClick={() => {
                setToggle(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
