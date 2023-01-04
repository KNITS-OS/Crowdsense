import { MouseEvent } from "react";
import { Column } from "react-table";
import { TableRatingCell, TableTagsCell } from "../../components/widgets/react-table/components";
import { ICandidate, OptionType } from "types/types";
import { MouseEventActionButton, TableCommentCell } from "../../components/widgets/index";
import { CandidatesMutationTriggerType } from "redux/features/candidates/candidatesApiSlice";

export interface IDefaultActions {
  updateCellMutation?: CandidatesMutationTriggerType<ICandidate>;
  onDetailsButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onLocalChangeRating?: (newRating: number, reqId: string) => void;
  onChangeComment: (newComment: string, reqId: string) => void;
  onLocalChangeTags?: (value: OptionType[], reqId: string) => void;
  onSaveComment: (event: React.MouseEvent<HTMLElement>) => void;
}

export const candidatesTableColumns = ({
  updateCellMutation,
  onDetailsButtonClick,
  onLocalChangeTags,
  onLocalChangeRating,
  onChangeComment,
  onSaveComment
}: IDefaultActions): Column<ICandidate>[] => {

  

  const tableArray: Column<ICandidate>[] = [
    {
      accessor: "reqId",
      Header: "Requisition ID",
    },
    {
      accessor: "firstName",
      Header: "First Name",
    },
    {
      accessor: "fullName",
      Header: "Full Name",
    },
    {
      accessor: "comment",
      Header: "Comment",
      Cell: ({ row }) => {
        return (
          <TableCommentCell
            id={row.original.reqId}
            comment={row.original.comment}
            onChangeComment={onChangeComment}
            onSaveComment={onSaveComment}
          />
        );
      },
    },
    {
      accessor: "rating",
      Header: "Rating",
      Cell: ({ row }) => {
        return (
          <TableRatingCell
            candidate={row.original}
            localChange={onLocalChangeRating}
            updateCellMutation={updateCellMutation}
          />
        );
      },
    },
    {
      accessor: "email",
      Header: "Email",
    },
    {
      accessor: "submissionDate",
      Header: "Submission Date",
    },
    {
      accessor: "status",
      Header: "Current Status",
    },
    {
      accessor: "country",
      Header: "Country",
    },
    {
      accessor: "tags",
      Header: "Tags",
      Cell: ({ row }) => {
        return (
          <TableTagsCell
            candidate={row.original}
            localChange={onLocalChangeTags}
            updateCellMutation={updateCellMutation}
          />
        );
      },
    },
  ];

  if (onDetailsButtonClick) {
    tableArray.push(
      MouseEventActionButton({ onDetailsButtonClick }) as Column<ICandidate>
    );
  }

  return tableArray;
};