import { Button, Card, CardHeader, Col, Row } from "reactstrap";
import { CV_IMPORT, CV_NEW } from "../../variables/routes";
import { ReactTable, TableSelectButton } from "../widgets";
import { ICandidate } from "../../types/types";
import { useHistory } from "react-router";
import { Column } from "react-table";

interface IProps {
    title: string;
    subTitle: string;
    data: ICandidate[]
    columns: Column<ICandidate>[]
    tableType: "candidates" | "curriculum" | "interview" | "offer"
    onDelete: (value: ICandidate[]) => void,
    onExport?: (value: ICandidate[]) => void
    onWorkflow?: (value: ICandidate[]) => void
}

export const CandidateResultSetPanel = ({
                                            title,
                                            subTitle,
                                            data,
                                            tableType,
                                            columns,
                                            onDelete,
                                            onExport,
                                            onWorkflow
                                        }: IProps) => {
    const history = useHistory()

    const selectElementsFilter = () => {
        const elements = []

        if (onExport) {
            elements.push(<TableSelectButton
                    title="Export"
                    color="info"
                    callback={onExport}
                />
            )
        }
        if (onWorkflow) {
            elements.push(<TableSelectButton
                    title="Workflow"
                    color="info"
                    callback={onWorkflow}
                />
            )
        }

        return [ ...elements,
            <TableSelectButton
                title="Delete"
                color="danger"
                callback={onDelete}
            />
        ]
    }

    return (
        <Card>
            <CardHeader className="d-flex justify-content-between">
                <Row>
                    <Col md="12">
                        <h3 className="mb-0">{title}</h3>
                        <p className="text-sm mb-0">
                            {subTitle}
                        </p>
                    </Col>
                </Row>
                {tableType === "curriculum" && (
                    <div className="d-flex align-items-center">
                        <Button
                            color="success"
                            onClick={() => history.push(`/admin${CV_IMPORT}`)}
                        >
                            Import
                        </Button>
                        <Button
                            color="success"
                            className="mr-2"
                            onClick={() => history.push(`/admin${CV_NEW}`)}
                        >
                            New
                        </Button>
                    </div>
                )}
            </CardHeader>
            <ReactTable
                data={data}
                selectElements={selectElementsFilter()}
                columns={columns}
            />
        </Card>
    );
};

