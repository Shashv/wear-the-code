import React from "react";
import { Dialog, DialogContent, DialogActions, Typography, Button } from "@mui/material";
import Link from "next/link";
import { NextPage } from "next";
const NotFound: React.FC | NextPage = () => {
    return (
        <>
            <Dialog open>
                <DialogContent>
                    <Typography className="text-center" color={"red"} variant={"h3"}>
                        Oops Page not found 404!
                    </Typography>
                </DialogContent>
                <DialogActions className="d-flex justify-content-center">
                    <Link href={"/"} className="fs-1 text-danger text-decoration-none">
                        <span>
                            Back
                        </span>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default NotFound;