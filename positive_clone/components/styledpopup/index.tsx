import React, { forwardRef } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { IModal } from "@/modals";
import Slide from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import { useRef, useEffect } from "react";
import style from "./index.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../loader";
import { Modal } from "reactstrap";
const StyledModal: React.FC<IModal> = ({ open, title, content, width, height, purpose, confirmProcess, closeModal, loader }) => {
    let logOutRef = useRef<HTMLButtonElement>(null);
    const GrowTransition = forwardRef((props: any, ref: any) => {
        return <Grow {...props} ref={ref} />
    })
    useEffect(() => {
        logOutRef.current?.addEventListener("click", (e) => confirmProcess(e))
    });
    return (
        <>
            <Dialog PaperProps={{
                sx: {
                    width,
                    height,
                    overflow: "unset"
                }
            }} open={open} className="position-absolute" TransitionComponent={GrowTransition} onClose={() => closeModal()} transitionDuration={500}>

                <span className="position-absolute rounded-circle p-2 cursor-pointer" onClick={closeModal} style={{ top: "-27px", right: "-27px" }}>
                    <IoIosCloseCircle size={40} color="black" />
                </span>
                {loader ? <Loader /> :
                    <>
                        <DialogTitle className="text-center fs-3 pb-0">
                            {title ? title : ""}
                        </DialogTitle>
                        <DialogContent className={`${style.dialogcontent} py-0 flex-column`} sx={{ maxHeight: "200px" }}>
                            {content}
                        </DialogContent>
                        <DialogActions className="d-flex justify-content-end">
                            <button className={purpose ? "rounded-2 text-pink-400 hover:shadow-sm p-2" : "rounded-2 text-light bg-pink-400 p-2"} onClick={(e) => closeModal()}>
                                Close
                            </button>
                            {purpose && <button ref={logOutRef} onClick={confirmProcess} className="confirm-process bg-pink-400 rounded-2 text-light p-2">
                                {purpose ? purpose : "Confirm"}
                            </button>}
                        </DialogActions>
                    </>
                }
            </Dialog>
        </>
    )
}
export default StyledModal;