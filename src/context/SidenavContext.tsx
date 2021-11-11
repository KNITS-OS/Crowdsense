import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InitialContextType = {
  sidenavOpen: boolean;
  setSidenavOpen: Dispatch<SetStateAction<boolean>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const initContextData: InitialContextType = {
  sidenavOpen: true,
  setSidenavOpen: () => {},
};

const SidenavContext = createContext(initContextData);

export const useSidenav = () => useContext(SidenavContext);

const SidenavProvider = ({ children }: ProviderProps) => {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  return (
    <SidenavContext.Provider value={{ sidenavOpen, setSidenavOpen }}>
      {children}
    </SidenavContext.Provider>
  );
};

export default SidenavProvider;
