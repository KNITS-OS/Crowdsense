import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

// // react component used to create sweet alerts
// import ReactBSAlert from "react-bootstrap-sweetalert";

type AlertType = null | React.ReactNode;

type InitialContextType = {
  alert: AlertType;
  setAlert: Dispatch<SetStateAction<AlertType>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const initContextData: InitialContextType = {
  alert: null,
  setAlert: () => {
  },
};

const AlertContext = createContext(initContextData);

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({children}: ProviderProps) => {
  const [alert, setAlert] = useState<AlertType>(null);

  return (
      <AlertContext.Provider value={{alert, setAlert}}>
        {children}
      </AlertContext.Provider>
  );
};

export default AlertProvider;
