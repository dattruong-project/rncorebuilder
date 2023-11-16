import { createContext, useCallback, useContext, useState } from 'react';
const AlertContext = createContext({});
function AlertProvider({ children }) {
    const [isShown, setIsShown] = useState(false);
    const [alertParams, setAlertParams] = useState({});
    const showAlert = useCallback((params) => {
        setAlertParams(params);
        setIsShown(true);
    }, []);
    const closeAlert = useCallback(() => {
        setIsShown(false);
    }, []);
    return (<AlertContext.Provider value={{ isShown, alertParams, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>);
}
function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertContext');
    }
    return context;
}
export { AlertProvider, useAlert };
