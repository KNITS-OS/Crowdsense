import { Input } from "reactstrap";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ id, name, onChange, value }: Props) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      type="text"
    />
  );
};
export default FormInput;
