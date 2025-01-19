import React from "react";
import { useState } from "react";
import { ToastContext } from "@/hooks/useToast";
import StyledToast from ".";
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; visible: boolean, type: string }>({
        visible: false,
        message: "This is default toast",
        type: ""
    });
    const showToast = (message?: string, type?: string) => {
        setToast({ ...toast, visible: true, message: message ? message : "", type: type ? type : "" })
    }
    return (
        <>
            <ToastContext.Provider value={showToast}>
                {children}
                <StyledToast message={toast.message} onClose={(e, timeOut) => {
                    setToast({ ...toast, visible: false });
                    clearTimeout(timeOut)
                }} open={toast.visible} variant={toast.type} autoHide={() => setToast({ ...toast, visible: false })} />
            </ToastContext.Provider>
        </>
    )
}
export default ToastProvider;