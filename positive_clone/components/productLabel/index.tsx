import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { iLabelProps } from "@/modals";
const ProductLabel: React.FC<iLabelProps> = ({ labelHead, description }) => {
    const theme = useSelector((state: IState) => state.toggletheme);
    return (
        <>
            <Typography
                className={theme.light ? "text-dark text-center" : "text-light text-center"}
                fontWeight={600}
                sx={{ fontSize: { xs: 21, md: 30.5 } }}
            >
               {labelHead} 
            </Typography>

            <Typography
                color={theme.light ? "#000" : "#9ca3af"}
                className={"text-start px-24 py-2 pb-3"}
                sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }}
                lineHeight={1.6}
                fontWeight={600}
            >
                {description} 
            </Typography>
        </>
    )
}
export default ProductLabel;
ProductLabel.displayName = "Product category Description"