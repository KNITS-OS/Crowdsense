import { Column } from "react-table";
import { ICreateCurriculumResponse } from "../../../../types/api";
import tableRatingCell from "../../../../components/widgets/react-table/components/TableRatingCell";

export const importCurriculumsTableColumns = (): Column<ICreateCurriculumResponse>[] => {

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
            Cell: ({ row }) => {
                const { rating } = row.values
                return tableRatingCell({ rating, })
            }
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

