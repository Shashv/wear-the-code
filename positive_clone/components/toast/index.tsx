import React from "react";
import "./index.module.css";
import { IToast, IToastState } from "@/modals";
import styles from "./index.module.css";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import { TfiClose } from "react-icons/tfi";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { memo } from "react";
import { CgDanger } from "react-icons/cg";
import { useState } from "react";
const StyledToast: React.FC<IToast> = ({ open, onClose, autoHide, message, variant, anchorOrigin }) => {
    // console.log("Toasr REndering");
    let reference = useRef<HTMLDivElement>(null);
    let { } = useForm();
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

        // console.log("InSIDE the coMpoNENT RENdering", open);
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if (open) {
                // console.log("Inside the timeout process autohide",open);
                autoHide();
            }
            else {
                // console.log("Inside the timeout process ",open);
            }
        }, 5000);
    }, [open])
    //settimgs for the toast container//
    useEffect(() => {
        // if (variant === "success" && origin)
        variant === "success" && anchorOrigin && setToastProperties({ ...toastProperties, anchorOrigin: { ...toastProperties.anchorOrigin, vertical: anchorOrigin.vertical, horizontal: anchorOrigin.horiontal }, variant: "success" })
        variant === "info" && anchorOrigin && setToastProperties({ ...toastProperties, anchorOrigin: { ...toastProperties.anchorOrigin, vertical: anchorOrigin.vertical, horizontal: anchorOrigin.horiontal } });
    }, []);
    //SETTINGS END//
    return (
        <div ref={reference} className={!open ? styles.toastcontainer : variant === "success" ? styles.activesuccess : variant === "error" ? styles.activeerror : variant === "info" ? styles.activeinfo : ""}>
            <div className="d-flex justify-content-between align-items-center w-100 px-2">
                <div className="d-flex align-items-center gap-4">
                    <span>
                        {variant === "info" && <FaInfoCircle size={25} color="white" opacity={0.8} />}
                        {variant === "success" && <FaCheck size={25} color="white" opacity={0.8} />}
                        {variant === "error" && <CgDanger color="white" size={25} opacity={0.8} />}

                    </span>
                    <div className="d-flex flex-column aling-items-center justify-content-between">
                        <Typography className="fw-bold" color={"white"} variant={"h5"}>
                            {variant === "success" && "Success"}
                            {variant === "info" && "Info"}
                            {
                                variant === "error" && "Oops"
                            }
                        </Typography>
                        <Typography color={"#fff"} variant={"subtitle1"} sx={{ textShadow: "0px 0px 8px 2px white", opacity: 0.8 }}>
                            {message ? message : "This is toast message"}
                        </Typography>
                    </div>
                </div>
                <span className="position-relative cursor-pointer" onClick={(e: React.MouseEvent) => onClose(e, timeOut)}>
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