import SweetAlert from "react-bootstrap-sweetalert";
import { useAlert } from "context";

interface IProps {
    callback: () => void
}

export const WarningSweetAlert = ({callback}:IProps) => {
    const {setAlert} = useAlert()

    return (
        <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() => {
                setAlert(null)
                callback()
            }}
            onCancel={() => setAlert(null)}
            focusCancelBtn
        />
    );
};

