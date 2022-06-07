import { Button, ButtonProps } from "reactstrap";

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
    return (
        <Button
            className="ml-0"
            onClick={() => selectedFlatRows && callback(selectedFlatRows)}
            {...rest}
        >
            {title}
        </Button>
    );
};
