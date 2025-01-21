
import { ITheme } from "@/modals";
import { IState } from "@/redux/sore";
import { Typography, Box, Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./index.module.css";
import { useInView } from "react-intersection-observer";
import { Button } from "@mui/material";
import bestsale from "../../utils/bestsale";
import ProductCard from "@/components/productcard";
const BestSelling: React.FC = () => {
    let theme: ITheme = useSelector((state: IState) => state.toggletheme);
    const { ref, inView } = useInView({ threshold: 0.2 });
    const [flag, setFlag] = useState<boolean>(false);
  
    const handleClick = useCallback(() => () => {
        setFlag(!flag);

        setTimeout(() => {
            setFlag(!flag);
        }, 2000);
    }, [flag]);
    return (
        <>
            <div  className={theme.dark ? style.bestselling : theme.light ? style.lightbestselling : ``}>
                <div className={theme.dark ? style.bestsellingheading : style.lightbestselling}>
                    <h1 className="">
                        Best Selling Products
                    </h1>
                    <div className={`${style.slicedborder} rounded-pill`}></div>
                </div>
              
                <div className={`${style.collectionlist}`}>
                    <Grid container className="justify-center" spacing={2}>
                        {bestsale.map((key, index) => <Grid item xs={9} sm={6} md={2} key={index}>
                            <ProductCard title={key.productName} desc={key.productName} colors={key.variations.color} sizes={key.variations.size} slug="" img={key.image} price={key.originalPrice} />
                        </Grid>)}
                    </Grid>
                </div>3
            </div>
        </>
    )
}
export default BestSelling;