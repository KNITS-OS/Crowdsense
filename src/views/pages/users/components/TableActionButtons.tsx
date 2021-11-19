import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { ICandidate } from "types/types";

interface Props {
  row: ICandidate;
  col?: number;
  rowIndex?: number;
}

const TableActionButtons = ({ row }: Props) => {
  const { reqId } = row;
  let candidateId = reqId.toString();

  return (
    <>
      <Link to={`/admin/users/candidate-details/${candidateId}`}>
        <Button className="btn-icon btn-2" type="button" color="info">
          <span className="btn-inner--icon">
            <i className="ni ni-badge" />
          </span>
        </Button>
      </Link>
    </>
  );
};
export default TableActionButtons;
