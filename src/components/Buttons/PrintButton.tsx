import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";

interface Props {
  ref: React.MutableRefObject<null>;
}

const PrintButton = ({ ref }: Props) => {
  return (
    <ReactToPrint
      trigger={() => (
        <Button
          color="default"
          size="sm"
          className="buttons-copy buttons-html5"
          id="print-tooltip"
        >
          Print
        </Button>
      )}
      content={() => ref.current}
    />
  );
};
export default PrintButton;
