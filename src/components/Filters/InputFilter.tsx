import { FormGroup, Input, Label } from "reactstrap";

interface Props {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const InputFilter = ({ id, value, setValue, placeholder }: Props) => {
  return (
    <FormGroup style={{ marginBottom: 0 }}>
      <Label className="form-control-label" htmlFor={id}>
        {placeholder}
      </Label>
      <Input
        id={id}
        style={{ height: "36px" }}
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </FormGroup>
  );
};
export default InputFilter;
