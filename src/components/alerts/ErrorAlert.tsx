import { Alert } from "reactstrap";

interface Props {
  children: string;
}

export const ErrorAlert = ({ children }: Props) => {
  return (
    <Alert className="m-0" color="danger" >
      {children}
    </Alert>
  );
};
