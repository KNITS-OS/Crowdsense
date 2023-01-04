import { Button } from "reactstrap";
import { useState } from "react";


interface IProps {
  id: string;
  comment?: string;
  onSaveComment: (event: React.MouseEvent<HTMLElement>) => void;
  onChangeComment: (newComment: string, id: string) => void;
}

export const TableCommentCell = ({
  id,
  comment,
  onChangeComment,
  onSaveComment,
}: IProps) => {
  // const { reqId, comment = "" } = candidate;

  // const [newComment, setNewComment] = useState(comment);
  const [toggle, setToggle] = useState(false);

  // const onSave = () => {
  //   if (newComment !== comment) {
  //     if (updateCellMutation) {
  //       updateCellMutation({ reqId: reqId, body: { comment: newComment } });
  //     }
  //     if (localChange) {
  //       localChange(newComment, reqId);
  //     }
  //   } else setToggle(false);
  // };

  return (
    <>
      {!toggle ? (
        <div onDoubleClick={() => setToggle(true)}>{comment}</div>
      ) : (
        <div>
          <textarea
            style={{ width: "100%" }}
            defaultValue={comment}
            onChange={(e) => onChangeComment(e.target.value, id)}
          />
          <div className="d-flex justify-content-between flex-wrap">
            <Button size="sm" color="success" onClick={onSaveComment}>
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
