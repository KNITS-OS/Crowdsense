import SweetAlert from "react-bootstrap-sweetalert";
import { useAlert } from "context";
import { SweetAlertProps } from "react-bootstrap-sweetalert/dist/types";

interface IProps extends SweetAlertProps {
  confirmBtnText?: string;
  confirmBtnBsStyle?: string;
  title: string;
  callback?: () => void;
}

export const WarningSweetAlert = ({
  callback,
  confirmBtnText = "Confirm",
  confirmBtnBsStyle = "danger",
  onConfirm,
  ...rest
}: IProps) => {
  const { setAlert } = useAlert();

  return (
    <SweetAlert
      warning
      showCancel
      confirmBtnText={confirmBtnText}
      confirmBtnBsStyle={confirmBtnBsStyle}
      onConfirm={() => {
        onConfirm();
        setAlert(null);
      }}
      onCancel={() => setAlert(null)}
      {...rest}
    />
  );
};
