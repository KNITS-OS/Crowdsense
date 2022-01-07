import { Button } from "reactstrap";
import { useCopy } from "hooks";

interface Props {
  elementId: string;
}

export const CopyButton = ({ elementId }: Props) => {
  const { copyToClipboardAsTable } = useCopy();
  return (
    <Button
      className="buttons-copy buttons-html5"
      color="primary"
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
