import { useEffect, useState } from "react";

import { ErrorAlert, SuccessAlert } from "components/alerts";
import { AlertType } from "types/types";

export const useLocalStateAlerts = () => {
    const [alert, setAlert] = useState<AlertType>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [saveSent, setSaveSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Success");
    const [errorMessage, setErrorMessage] = useState("Some error has been occurred");

    useEffect(() => {
        if (isSuccess && saveSent) {
            setAlert(() => <SuccessAlert>{successMessage}</SuccessAlert>);
        }
    }, [isSuccess, successMessage]);

    useEffect(() => {
        if (!isSuccess && saveSent) {
            setAlert(() => <ErrorAlert>{errorMessage}</ErrorAlert>);
        }
    }, [isSuccess,errorMessage]);

    return { alert, setSaveSent, setSuccessMessage, setErrorMessage, setIsSuccess };
};