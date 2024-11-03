import { ITheme } from "@/modals";
import { IState } from "@/pages/redux/sore";
import { Typography, Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./index.module.css";
import { useInView } from "react-intersection-observer";
import { Button } from "@mui/material";
import bestsale from "../../utils/bestsale";
import ProductCard from "@/components/productcard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useContext } from "react";
import { ContextObject } from "@/utils/context";
const BestSelling: React.FC = () => {
    let theme: ITheme = useSelector((state: IState) => state.toggletheme);
    const { ref, inView } = useInView({ threshold: 0.2 });
    const [flag, setFlag] = useState<boolean>(false);
    //using the useCallBack implementation //
    const handleClick = useCallback(() => () => {
        setFlag(!flag);
        console.log("Inside the process of callbck");
        setTimeout(() => {
            setFlag(!flag);
        }, 2000);
    }, [flag]);
    let direction = useContext(ContextObject);
    useEffect(() => {
        // console.log("Inside the process of rendering of the flag", flag);
        Aos.init({
            duration: 1000,
            easing: "ease-out"
        });
        // console.log("In the view for the element", inView);
    });
    return (
        <>
            <Box component={"div"} data-aos-animate={"zoom-in-up"} className={theme.dark ? style.bestselling : theme.light ? style.lightbestselling : ``}>
                <div className={theme.dark ? style.bestsellingheading : style.lightbestselling}>
                    {/* <div> */}
                    <h1 ref={ref} className={inView && direction === "down" ? style.textviewed : style.texthide}>
                        Best Selling Products
                    </h1>
                    {/* </div> */}
                    <div className={`${style.slicedborder} rounded-pill`}></div>
                </div>
                {/* for the process of callback hooks later used */}
                {/* <div className="btn-container">
                    <Button className="" onClick={handleClick} variant={"contained"} color={"secondary"}>
                        Check Call Back Function
                    </Button>
                </div> */}
                <div data-aos-animate={"zoom-in-up"} className={inView && direction === "down" ? `${style.collectionlist}` : ``}>
                    <Grid container className="justify-center" spacing={2}>
                        {bestsale.map((key, index) => <Grid item xs={3}>
                            <ProductCard image_front={key.image} name="" variant="" description="" id={1} price={key.discountPrice} priceoriginal={key.originalPrice} label={key.productName} variations={""} category={key.category} image_back={key.thumbnail} />
                        </Grid>)}
                    </Grid>
                </div>3
            </Box>
        </>
    )
}
export default BestSelling;