import React from "react";
import "./index.module.css";
import { IToast, IToastState } from "@/modals";
import styles from "./index.module.css";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import { TfiClose } from "react-icons/tfi";
import { useRef, useEffect } from "react";
import { memo } from "react";
import { CgDanger } from "react-icons/cg";
import { useState } from "react";
const StyledToast: React.FC<IToast> = ({ open, onClose, autoHide, message, variant, anchorOrigin }) => {
    let reference = useRef<HTMLDivElement>(null);
    let timeOut: ReturnType<typeof setTimeout> | any = "";
    let [toastProperties, setToastProperties] = useState<IToastState>({
        variant: "",
        anchorOrigin: {
            horizontal: "",
            vertical: ""
        },
        message: ""
    });
    useEffect(() => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if (open) {
                autoHide && autoHide();
            }
            else {
            }
        }, 5000);
        return () => {
            clearTimeout(timeOut)
        }
    }, [open]);
    // for the toast variants//
    useEffect(() => {
        variant === "success" && anchorOrigin && setToastProperties({ ...toastProperties, anchorOrigin: { ...toastProperties.anchorOrigin, vertical: anchorOrigin.vertical, horizontal: anchorOrigin.horiontal }, variant: "success" })
        variant === "info" && anchorOrigin && setToastProperties({ ...toastProperties, anchorOrigin: { ...toastProperties.anchorOrigin, vertical: anchorOrigin.vertical, horizontal: anchorOrigin.horiontal } });
    }, []);
    // end
    return (
        <div ref={reference} className={!open ? styles.toastcontainer : variant === "success" ? styles.activesuccess : variant === "error" ? styles.activeerror : variant === "info" ? styles.activeinfo : ""}>
            <div className="d-flex justify-content-between align-items-center w-100 px-2">
                <div className="d-flex align-items-center gap-4">
                    <span>
                        {variant === "info" && <FaInfoCircle size={25} color="white" opacity={0.7} />}
                        {variant === "success" && <FaCheck size={25} color="white" opacity={0.7} />}
                        {variant === "error" && <CgDanger color="white" size={25} opacity={0.7} />}

                    </span>
                    <div className="d-flex flex-column aling-items-center justify-content-between">
                        <Typography className="fw-bold opacity-55" color={"white"} variant={"h6"}>
                            {variant === "success" && "Success"}
                            {variant === "info" && "Info"}
                            {
                                variant === "error" && "Oops"
                            }
                        </Typography>
                        <Typography color={"#fff"} variant={"subtitle2"} sx={{ textShadow: "0px 0px 8px 2px white", opacity: 0.8 }}>
                            {message ? message : "This is toast message"}
                        </Typography>
                    </div>
                </div>
                <span className="position-relative cursor-pointer" onClick={(e: React.MouseEvent) => onClose && onClose(e, timeOut)}>
                    <TfiClose className="position-absolute" cursor={"pointer"} style={{ top: "-25px", right: "0px" }} color="#fff" size={20} />
                </span>
            </div>
            <div className={styles.toasttimer}>
            </div>
        </div>
    )
}
// export default memo(StyledToast);
export default StyledToast;