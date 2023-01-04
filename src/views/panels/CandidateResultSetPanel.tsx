import { Card, CardHeader, Col, Row } from "reactstrap";
import { ReactTable, TableSelectButton } from "components/widgets/react-table"
import { ICandidate } from "types/types";
import { Column } from "react-table";

interface IProps {
  title: string;
  subTitle: string;
  data: ICandidate[];
  columns: Column<ICandidate>[];
  onDelete: (value: ICandidate[]) => void;
  onExport?: (value: ICandidate[]) => void;
  onWorkflow?: (value: ICandidate[]) => void;
  onAddToWorkflow?: (value: ICandidate[]) => void;
  onImport?: (value: ICandidate[]) => void;
  deleteBtnIsFetching?: boolean;
  importBtnIsFetching?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export const CandidateResultSetPanel = ({
  title,
  subTitle,
  data,
  columns,
  onDelete,
  onExport,
  onWorkflow,
  onImport,
  deleteBtnIsFetching,
  importBtnIsFetching,
  onAddToWorkflow,
  children,
}: IProps) => {

  const selectElementsFilter = () => {
    const elements = [];

    if (onExport) {
      elements.push(
        <TableSelectButton title="Export" color="info" doWithSelected={onExport} />
      );
    }
    if (onWorkflow) {
      elements.push(
        <TableSelectButton
          title="Workflow"
          color="info"
          doWithSelected={onWorkflow}
        />
      );
    }
    if (onImport) {
      elements.push(
        <TableSelectButton
          title="Import"
          color="success"
          doWithSelected={onImport}
          disabled={importBtnIsFetching}
        />
      );
    }
    if (onAddToWorkflow) {
      elements.push(
        <TableSelectButton
          title="Add To Workflow"
          color="success"
          doWithSelected={onAddToWorkflow}
          disabled={importBtnIsFetching}
        />
      );
    }
    return [
      ...elements,
      <TableSelectButton
        title="Delete"
        color="danger"
        doWithSelected={onDelete}
        disabled={deleteBtnIsFetching}
      />,
    ];
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between">
        <Row className="d-flex justify-content-between align-items-center">
          <Col md="12">
            <h3 className="mb-0">{title}</h3>
            <p className="text-sm mb-0">{subTitle}</p>
          </Col>
        </Row>
        {children && (
          <div className="d-flex align-items-center">{children}</div>
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