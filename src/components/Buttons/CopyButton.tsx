import { Button } from "reactstrap";
import { useCopy } from "hooks";

interface Props {
  elementId: string;
}

const CopyButton = ({ elementId }: Props) => {
  const { copyToClipboardAsTable } = useCopy();
  return (
    <Button
      className="buttons-copy buttons-html5"
      color="default"
      size="sm"
      id="copy-tooltip"
      onClick={() =>
        copyToClipboardAsTable(document.getElementById(elementId))
      }
    >
      <span>Copy</span>
    </Button>
  );
};
export default CopyButton;
