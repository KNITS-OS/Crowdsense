import { Input, InputProps } from "reactstrap";
import { InputType } from "reactstrap/es/Input";

type Props = InputProps & {
  id: string;
  name: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  disabled?: boolean;
}

const FormInput = ({
  id,
  name,
  onChange,
  value,
  type = "text",
  disabled = false,
    ...rest
}: Props) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={true}
      type={type}
      disabled={disabled}
      {...rest}
    />
  );
};
export default FormInput;
