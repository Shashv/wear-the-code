import React, { forwardRef } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { IModal } from "@/modals";
import Slide from "@mui/material/Fade";
import { Delete, Edit } from "@mui/icons-material";
import Icon from "@mui/material";
import Grow from "@mui/material/Grow";
import style from "./index.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../loader";
const StyledModal: React.FC<IModal> = ({ open, title, content, width, height, purpose, confirmProcess, closeModal, loader, showIcon }) => {
    return (
        <>
            <Dialog PaperProps={{
                sx: {
                    width,
                    height,
                    overflow: "unset"
                }
            }} open={open} className="position-absolute" TransitionComponent={Grow} onClose={() => closeModal()} transitionDuration={500}>
                <span className="position-absolute rounded-circle p-2 cursor-pointer" onClick={closeModal} style={{ top: "-27px", right: "-27px" }}>
                    <IoIosCloseCircle size={40} color="black" />
                </span>
                {loader ? <Loader /> :
                    <div className="position-relative">
                        <DialogTitle className="text-center fw-bold fs-3 pb-0">
                            {title ? title : ""}
                        </DialogTitle>
                        {showIcon && <span className="display-icons position-absolute top-[25px] left-[25px]">{purpose === "Edit" ? <Edit color={"secondary"} fontSize="large" /> : <Delete color={"secondary"} fontSize="medium" />}</span>}
                        <DialogContent className={`${style.dialogcontent} py-0 text-2xl flex-column`} sx={{ height: "200px", maxHeight: "100%" }}>
                            {content}
                        </DialogContent>
                        <DialogActions className="d-flex justify-content-end">
                            <button className={purpose ? "rounded-2 text-pink-400 hover:shadow-sm p-2" : "rounded-2 text-light bg-pink-400 p-2"} onClick={(e) => closeModal()}>
                                Cancel
                            </button>
                            {purpose && <button type="submit" onClick={confirmProcess} className="confirm-process bg-pink-400 w-[70px] rounded-2 text-light p-2">
                                {purpose ? purpose : "Confirm"}
                            </button>}
                        </DialogActions>
                    </div>
                }
            </Dialog>
        </>
    )
}
export default StyledModal;

//comments from code for usage later
///...using modal from reactstrap////
// import { useRef, useEffect } from "react";
// import { Modal } from "reactstrap";
// .....
// let logOutRef = useRef<HTMLButtonElement>(null);
// const GrowTransition = forwardRef((props: any, ref: any) => {
//     return <Grow {...props} ref={ref} />
// })
//using the ref//
// useEffect(() => {
//     logOutRef.current?.addEventListener("click", (e) => confirmProcess(e));
//     return () => {
//         logOutRef.current?.removeEventListener("click", (e) => confirmProcess(e));
//     }
// });
//  ref={logOutRef}
//....