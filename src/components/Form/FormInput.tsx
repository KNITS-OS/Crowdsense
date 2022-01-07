import { Input } from "reactstrap";
import { InputType } from "reactstrap/es/Input";

interface Props {
  id: string;
  name: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  disabled?: boolean;
}

export const FormInput = ({
  id,
  name,
  onChange,
  value,
  type = "text",
  disabled = false,
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
    />
  );
};
