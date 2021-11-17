import { Input } from "reactstrap";
import { InputType } from "reactstrap/es/Input";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
}

const FormInput = ({
  id,
  name,
  onChange,
  value,
  type = "text",
}: Props) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={true}
      type={type}
    />
  );
};
export default FormInput;
