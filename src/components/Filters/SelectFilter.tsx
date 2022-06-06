import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import { OptionType } from "types/types";

interface Props {
  id: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: OptionType[];
}

const SelectFilter = ({ setValue, options, id, label }: Props) => {
  return (
    <FormGroup>
      <Label className="form-control-label" htmlFor={id}>
        {label}
      </Label>
      <Select
        id={id}
        options={options}
        onChange={item => item && setValue(item.value)}
      />
    </FormGroup>
  );
};
export default SelectFilter;
