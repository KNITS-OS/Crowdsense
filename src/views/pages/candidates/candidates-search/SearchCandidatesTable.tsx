import { MouseEvent } from "react";
import { Column } from "react-table";
import { MouseEventActionButton } from "../../../../components/widgets/react-table";
import { ICandidate } from "../../../../types/types";
import tableRatingCell from "../../../../components/widgets/react-table/components/TableRatingCell";

export interface IDefaultActions {
    onDetailsButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    updateRatingHandler: (newRating: number, reqId: string) => void
}

export const candidatesTableColumns = ({
                                           onDetailsButtonClick,
                                           updateRatingHandler,
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
                    callback: updateRatingHandler
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

    if (onDetailsButtonClick) {
        tableArray.push(MouseEventActionButton({ onDetailsButtonClick }) as Column<ICandidate>);
    }

    return tableArray
};
