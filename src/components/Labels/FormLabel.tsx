import { Label } from "reactstrap";

interface Props {
  label: string;
  id: string;
}

export const FormLabel = ({ label, id }: Props) => (
  <Label className="form-control-label" for={id}>
    {label}
  </Label>
);
