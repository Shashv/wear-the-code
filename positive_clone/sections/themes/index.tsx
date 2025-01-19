import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CollectionCard from "@/components/collectioncard";
import themes from "../../utils/theme/index";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { useInView } from "react-intersection-observer";
import useDirection from "@/utils/hooks/useDirection";
import { useContext } from "react";
const ThemeSection: React.FC<{ theme: { light: boolean; dark: boolean } }> = ({ theme }) => {
  
    return (
        <>
            <div className={"theme-box pb-2"}>
                <div className={`theme-heading text-center p-4`}>
                    <Typography className={`reftext`} fontWeight={"bold"} color={theme.light ? "#000" : "#fff"} variant={"h4"}>
                        THEMES
                    </Typography>
                </div>
                <div className={"container-fluid"}>
                    <div className="row g-5 px-5 d-flex justify-content-center">
                        {themes.map((key: string, index: number) => <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <CollectionCard thumbnail={key} collectionName="" />
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ThemeSection;
