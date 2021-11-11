import { useAlert } from "../context/AlertContext";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

/**
 * @description this hook will copy to clipboard an entire table,
 * so you can paste it inside an excel or csv file
 */
const useCopy = () => {
  const { setAlert } = useAlert();
  return {
    copyToClipboardAsTable: (element: HTMLElement) => {
      let text_to_copy = element.innerText;

      navigator.clipboard
        .writeText(text_to_copy)
        .then(function () {
          setAlert(
            <ReactBSAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title="Good job!"
              onConfirm={() => setAlert(null)}
              onCancel={() => setAlert(null)}
              confirmBtnBsStyle="info"
            >
              Copied to clipboard!
            </ReactBSAlert>,
          );
        })
        .catch(function () {
          alert("err"); // error
        });
    },
  };
};

export default useCopy;
