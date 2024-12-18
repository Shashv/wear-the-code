import React from "react";
import { useContext } from "react";
export const ToastContext = React.createContext<any>(() => { });
const useToast: () => (message?: string, type?: string) => void = () => useContext(ToastContext);
export default useToast;