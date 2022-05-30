import { InputType } from "reactstrap/es/Input";
import { FormInput } from ".";
import { FormLabel } from "../Labels";
import { InputProps } from "reactstrap";

type Props = InputProps & {
  id: string;
  name: string;
  label: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  disabled?: boolean;
}

const LabeledFormInput = ({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
  ...rest
}: Props) => {
  return (
    <>
      <FormLabel id={id} label={label} />
      <FormInput
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
    </>
  );
};
export default LabeledFormInput;
