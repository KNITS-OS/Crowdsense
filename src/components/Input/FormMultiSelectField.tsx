import { FormGroup } from "reactstrap";
import { OptionType } from "types/types";
import { MultiValue } from "react-select";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import CreatableSelect from "react-select/creatable";

interface IProps extends StateManagerProps {
  name: string;
  label: string;
  options: OptionType[];
  control: Control<any>;
  rules?: RegisterOptions;
}

const FormSelectField = ({
  name,
  label,
  options,
  control,
  rules,
  ...rest
}: IProps) => {
  return (
    <FormGroup>
      <label className="form-control-label" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => {
          return (
            <CreatableSelect
              isMulti
              value={options.find((opt) => opt.value === value)}
              options={options}
              // @ts-ignore
              onChange={(selectedOption: MultiValue<OptionType[]>) => {
                onChange(selectedOption);
              }}
              {...rest}
            />
          );
        }}
      />
    </FormGroup>
  );
};

export default FormSelectField;
