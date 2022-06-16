import { Alert } from "reactstrap";

interface Props {
  children: string;
}

export const SuccessAlert = ({ children }: Props) => {
  return (
    <Alert className="m-0" dismissible>
      {children}
    </Alert>
  );
};
