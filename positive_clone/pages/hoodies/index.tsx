import React, { useState } from "react";
import style from "./style.module.css";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { IState } from "../redux/sore";
import { Grid } from "@mui/material";
import ProductCard from "@/components/productcard";
type IHoodie = { id: number; description: string; sizes: string; name: string };
const Hoodies: React.FC<{ scrollTop: number }> = ({ scrollTop }) => {
    const themeState = useSelector((state: IState) => state.toggletheme);
    const [hoodies, setHoodies] = useState<Array<IHoodie>>([]);
    const fetchHoodies: () => Promise<any> = async () => {
        let response = await fetch("/api/hoodies", {
            method: "GET"
        });
        let parsedResponse: any = await response.json();
        return parsedResponse;
    }
    useEffect(() => {
        fetchHoodies().then(hoodies => {
            // console.log("Hoodies response from the api", hoodies?.showhoodies);
            setHoodies(hoodies.showhoodies);
        });
    }, []);
    return (
        <>
            <div className={themeState.dark ? "p-2 bg-dark" : "p-2 bg-light"} onScroll={() => console.log("Scroll Positive")}>
                <section className="text-gray-600 body-font">
                    <div className="heading text-center text-light">
                        <Typography className="" variant="h5">
                            Explore our hoodies collections!
                        </Typography>
                    </div>
                    <Grid container spacing={2}>
                        {hoodies.map((hoodies: IHoodie, index: number) => <Grid item xs={3} key={index}> <ProductCard name={hoodies.name} image_back="" image_front="" variant="" id={1} description={hoodies.description} variations="" price={100} priceoriginal={1000} /></Grid>)}
                    </Grid>
                </section>
            </div>
        </>
    )
}
export default Hoodies;