import { MouseEvent } from "react";
import { Column } from "react-table";
import tableRatingCell from "../components/TableRatingCell";
import { ICandidate, OptionType } from "../../../../types/types";
import { EditableColumn, MouseEventActionButton } from "../../index";
import TableTagsCell from "../components/TableTagsCell";

export interface IDefaultActions {
    onDetailsButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    onChangeRating: (newRating: number, reqId: string) => void
    onChangeComment?: (value: string) => void
    onSelectTags?: (id: string, value: OptionType[]) => void
}

export const candidatesTableColumns = ({
                                           onDetailsButtonClick,
                                           onChangeRating,
                                           onChangeComment,
                                           onSelectTags,
                                       }: IDefaultActions): Column<ICandidate>[] => {

    const tableArray: Column<ICandidate>[] = [
        {
            accessor: 'reqId',
            Header: 'Requisition ID',
        },
        {
            accessor: 'firstName',
            Header: 'First Name',
        },
        {
            accessor: 'fullName',
            Header: 'Full Name',
        },
        {
            accessor: 'rating',
            Header: 'Rating',
            Cell: ({ row }) => {
                const { reqId, rating } = row.values
                return tableRatingCell({
                    rating,
                    reqId,
                    callback: onChangeRating
                })
            }
        },

        {
            accessor: 'email',
            Header: 'Email',
        },
        {
            accessor: 'submissionDate',
            Header: 'Submission Date',
        },
        {
            accessor: 'status',
            Header: 'Current Status',
        },
        {
            accessor: 'country',
            Header: 'Country'
        },

    ]


    if (onSelectTags) {
        tableArray.splice(8, 0, {
            accessor: 'tags',
            Header: 'Tags',
            Cell: ({ row }) => {
                const { reqId } = row.original
                return (
                    <TableTagsCell id={reqId} callback={onSelectTags}/>
                )
            }
        })
    }

    if (onChangeComment) {
        tableArray.splice(3, 0, {
            accessor: 'comment',
            Header: 'Comment',
            Cell: ({ row }) => {
                return (
                    <EditableColumn
                        value={row.values.comment}
                        updateColumn={onChangeComment}
                    />
                )
            }
        })
    }

    if (onDetailsButtonClick) {
        tableArray.push(MouseEventActionButton({ onDetailsButtonClick }) as Column<ICandidate>);
    }

    return tableArray
};
