import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import { OptionType } from "types/types";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

interface Props extends StateManagerProps {
    id: string;
    label: string;
    setValue: React.Dispatch<OptionType | null>;
    options: OptionType[];
}

const SelectFilter = ({ setValue, options, id, label, ...rest }: Props) => {
    return (
        <FormGroup>
            <Label className="form-control-label" htmlFor={id}>
                {label}
            </Label>
            <Select
                id={id}
                options={options}
                onChange={(item) => setValue(item as OptionType)}
                {...rest}
            />

        </FormGroup>
    );
};
export default SelectFilter;
