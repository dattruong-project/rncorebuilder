import { createContext, useCallback, useContext, useState } from 'react';
import { AlertContextData, AlertProviderProps, AlertDialogParams } from './type';


const AlertContext = createContext<AlertContextData>(
  {} as AlertContextData
);

function AlertProvider({ children }: AlertProviderProps) {
  const [isShown, setIsShown] = useState(false);
  const [alertParams, setAlertParams] = useState({} as AlertDialogParams);

  const showAlert = useCallback((params: AlertDialogParams) => {
    setAlertParams(params);
    setIsShown(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsShown(false);
  }, []);

  return (
    <AlertContext.Provider
      value={{ isShown, alertParams, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

function useAlert(): AlertContextData {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert must be used within a AlertContext');
  }

  return context;
}

export { AlertProvider, useAlert };