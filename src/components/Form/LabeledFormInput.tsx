import { InputType } from "reactstrap/es/Input";
import { FormInput } from ".";
import { FormLabel } from "../Elements/Labels";

interface Props {
  id: string;
  name: string;
  label: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  disabled?: boolean;
}

export const LabeledFormInput = ({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
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
      />
    </>
  );
};
