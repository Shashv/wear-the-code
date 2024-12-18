import React from "react";
import { Backdrop, Typography } from "@mui/material";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
const fetchHeaders: () => number = () => 3;
const TestingAppRouter: React.FC = () => {
    const headerObject = headers();
    const count: number = fetchHeaders();
    if (count === 4) {
        notFound();
    }
    else
        return (
            <>
                <Backdrop className="" open>
                    <Typography className="" color={"red"}>
                        Inside the process of coder in the Mohali in India
                    </Typography>
                </Backdrop>
            </>
        )
}
export default TestingAppRouter;