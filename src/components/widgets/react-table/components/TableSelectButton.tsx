import {Button, ButtonProps} from "reactstrap";

interface IProps extends ButtonProps {
  title: string;
  selectedFlatRows?: object[];
  doWithSelected: (selectedItems: Array<any>) => void;
}

export const TableSelectButton = ({
                                    selectedFlatRows,
                                    doWithSelected,
                                    title,
                                    toggleAllRowsSelected,
                                    ...rest
                                  }: IProps) => {

                                    /*
  const {setAlert} = useAlert();

  const clickHandler = (selectedRows: Array<any>) => {
    if (selectedRows.length || title === "Workflow") {
      if (title === "Delete") {
        setAlert(
            <WarningSweetAlert
                title="Delete selected candidates?"
                confirmBtnBsStyle="danger"
                confirmBtnText="Yes, delete it"
                onConfirm={() => {
                  callback(selectedRows)
                  setAlert(null)
                }
                }
            />
        );
      } else callback(selectedRows);
    } else return;
  };*/

  return (
      <Button
          className="ml-0"
          onClick={() => selectedFlatRows && doWithSelected(selectedFlatRows)}
          {...rest}
      >
        {title}
      </Button>
  );
};
