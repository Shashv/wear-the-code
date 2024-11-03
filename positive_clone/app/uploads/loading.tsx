
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
const Uploads: React.FC = () => {
    return (
        <>
            <Backdrop open>
                <CircularProgress variant={"determinate"} color={"success"} />
            </Backdrop>
        </>
    )
}
export default Uploads;
