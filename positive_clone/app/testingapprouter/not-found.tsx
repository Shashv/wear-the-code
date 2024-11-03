import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Link from "next/link";
const NotFound: React.FC = () => {
    return (
        <Paper>
            <Box component={"div"}>
                <Typography color={"red"} variant="h1">
                    Ooops Page not found !
                </Typography>
                <Link className="" href={"/"}>
                    Return to home page
                </Link>
            </Box>
        </Paper>
    )
}
export default NotFound;