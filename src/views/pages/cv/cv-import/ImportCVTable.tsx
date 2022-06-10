import { Column } from "react-table";
import { ICandidate } from "types/types";

export const importCurriculumsTableColumns = (): Column<ICandidate>[] => {

    return [
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
        },
        {
            accessor: 'comment',
            Header: 'Comment',
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
};

