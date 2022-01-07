import {
  CSVExport,
  ToolkitContextType,
} from "react-bootstrap-table2-toolkit";

interface Props {
  props: ToolkitContextType;
}

// @todo find out if this should export all candidates or only selected ones
export const DefaultExportCSVButton = ({ props }: Props) => {
  const { ExportCSVButton } = CSVExport;
  return (
    <ExportCSVButton
      {...props.csvProps}
      style={{
        backgroundColor: "#0099da",
        borderColor: "#0099da",
      }}
    >
      Export
    </ExportCSVButton>
  );
};
