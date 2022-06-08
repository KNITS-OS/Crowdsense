import { MouseEvent } from "react";
import { Column } from "react-table";

import { Button } from "reactstrap";

export interface IDefaultActionButtons {
    onDetailsButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const MouseEventActionButton = <T extends { reqId: string | undefined }>({
                                                                                    onDetailsButtonClick,
                                                                                }: IDefaultActionButtons) => {
    return {
        accessor: "action",
        Header: "",
        Cell: ({ row }) => {
            const item = row.original as T;
            if (!item.reqId) return <></>;

            const id = item.reqId
            return (
                <div className="table-action-button-group">
                    <Button
                        id={id}
                        className="btn-icon m-1"
                        type="button"
                        color="info"
                        onClick={onDetailsButtonClick}
                    >
            <span id={id} className="btn-inner--icon">
              <i id={id} className="ni ni-badge"/>
            </span>
                    </Button>
                </div>
            );
        },
    } as Column;
};
