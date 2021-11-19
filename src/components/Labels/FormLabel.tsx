import { Label } from "reactstrap";

interface Props {
  label: string;
  id: string;
}

const FormLabel = ({ label, id }: Props) => (
  <Label className="form-control-label" for={id}>
    {label}
  </Label>
);

export default FormLabel;
