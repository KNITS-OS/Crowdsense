import { InputType } from "reactstrap/es/Input";
import { FormInput } from ".";
import { FormLabel } from "../Labels";

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
}

const LabeledFormInput = ({ id, name, value, onChange, label }: Props) => {
  return (
    <>
      <FormLabel id={id} label={label} />
      <FormInput id={id} name={name} value={value} onChange={onChange} />
    </>
  );
};
export default LabeledFormInput;
