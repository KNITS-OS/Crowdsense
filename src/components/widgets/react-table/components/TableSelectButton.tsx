import { Button, ButtonProps } from "reactstrap";
import { useAlert } from "context";
import { WarningSweetAlert } from "components/alerts";

interface IProps extends ButtonProps {
    title: string
    selectedFlatRows?: object[]
    callback: (selectedItems: Array<any>) => void
}

export const TableSelectButton = ({
                                      selectedFlatRows,
                                      callback,
                                      title,
                                      toggleAllRowsSelected,
                                      ...rest
                                  }: IProps) => {
    const {setAlert} = useAlert()

    const clickHandler = (selectedRows:Array<any>) => {
        if (selectedRows.length || title === "Workflow") {
            if (title === "Delete") {
                setAlert(<WarningSweetAlert callback={() => callback(selectedRows)}/>)
            } else callback(selectedRows)
        } else return
    }

    return (
        <Button
            className="ml-0"
            onClick={() => selectedFlatRows && clickHandler(selectedFlatRows)}
            {...rest}
        >
            {title}
        </Button>
    );
};
