import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import { OptionType } from "types/types";

interface Props {
  id: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: OptionType[];
  defaultValue?: OptionType;
}

const SelectFilter = ({
  setValue,
  options,
  id,
  label,
  defaultValue,
}: Props) => {
  return (
    <FormGroup style={{ marginBottom: 0 }}>
      <Label className="form-control-label" htmlFor={id}>
        {label}
      </Label>
      <Select
        id={id}
        options={options}
        defaultValue={defaultValue}
        onChange={item => item && setValue(item.value)}
      />
    </FormGroup>
  );
};
export default SelectFilter;
