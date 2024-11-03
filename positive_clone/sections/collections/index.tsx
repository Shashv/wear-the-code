import React, { useEffect } from "react";
import COLLECTIONS from "@/utils/collections";
import Box from "@mui/material/Box";
import CollectionCard from "@/components/collectioncard";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { ContextObject } from "@/utils/context";
import style from "../themes/index.module.css";
import { useInView } from "react-intersection-observer";
import Aos from "aos";
import "aos/dist/aos.css";
const CollectionSections: React.FC<{ theme: { light: boolean; dark: boolean } }> = ({ theme }) => {
    let direction = useContext(ContextObject);
    let { inView, ref } = useInView({
        threshold: 0.2
    });
    useEffect(() => {
        Aos.init();
    }, [])
    return (
        <>
            <Box component="div" className={theme.light ? "container-fluid bg-white pb-2" : "container-fluid bg-dark pb-2"}>
                <div ref={ref} data-aos={"zoom-in-up"} className={inView && direction === "down" ? `${style.textviewed} p-4 text-center` : inView && direction === "up" ? `p-4 text-center` : `${style.texthide} p-4 text-center`}>
                    <Typography className={theme.dark ? "text-light" : "text-dark"} variant="h4" fontWeight={"bold"}>
                        COLECTIONS
                    </Typography>
                </div>
                <div className="row g-5 d px-5">
                    {COLLECTIONS.map((key, index) => <div className="col-md-6 col-lg-4 col-sm-12" key={index}> <CollectionCard collectionName={key.collectionName} thumbnail={key.thumbnail} /> </div>)}
                </div>
            </Box>
        </>
    )
}
export default CollectionSections;