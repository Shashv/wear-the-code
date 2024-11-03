import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CollectionCard from "@/components/collectioncard";
import themes from "../../utils/theme/index";
import { useSelector } from "react-redux";
import { IState } from "@/pages/redux/sore";
import { useInView } from "react-intersection-observer";
import style from "./index.module.css";
import useDirection from "@/utils/hooks/useDirection";
import { useContext } from "react";
import { ContextObject } from "@/utils/context";
import Aos from "aos";
import "aos/dist/aos.css";
const ThemeSection: React.FC<{ theme: { light: boolean; dark: boolean } }> = ({ theme }) => {
    // const theme = useSelector((state: IState) => state.toggletheme);
    const { inView, ref } = useInView({
        threshold: 0.2
    });
    const direction: string = useContext(ContextObject);
    // const direction = useDirection();
    useEffect(() => {
        // const direction = useDirection();
        // console.log(direction);
        Aos.init();
    }, []);
    return (
        <>
            <Box component={"div"} className={theme.light ? "theme-box bg-white pb-2" : "theme-box bg-dark pb-2"}>
                <div ref={ref} data-aos={"zoom-in-up"} className={inView && direction === "down" ? `theme-heading text-center p-4 ${style.textviewed}` : `theme-heading text-center p-4`}>
                    <Typography className={`reftext`} fontWeight={"bold"} color={theme.light ? "#000" : "#fff"} variant={"h4"}>
                        THEMES
                    </Typography>
                </div>
                <div className={theme.dark ? "container-fluid bg-dark" : "container-fluid bg-white"}>
                    <div className="row g-5 px-5 d-flex justify-content-center">
                        {themes.map((key: string, index: number) => <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <CollectionCard thumbnail={key} collectionName="" />
                        </div>)}
                    </div>
                </div>
            </Box>
        </>
    )
}
export default ThemeSection;
