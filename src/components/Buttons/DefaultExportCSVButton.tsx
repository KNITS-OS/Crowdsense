import {
  CSVExport,
  ToolkitContextType,
} from "react-bootstrap-table2-toolkit";

interface Props {
  props: ToolkitContextType;
}

const DefaultExportCSVButton = ({ props }: Props) => {
  const { ExportCSVButton } = CSVExport;
  return (
    <ExportCSVButton
      {...props.csvProps}
      style={{
        backgroundColor: "#003369",
        borderColor: "#003369",
      }}
    >
      Export
    </ExportCSVButton>
  );
};
export default DefaultExportCSVButton;
