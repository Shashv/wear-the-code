import React, { useState } from "react";
import style from "./index.module.css";
import { useEffect } from "react";
import { Backdrop, Typography } from "@mui/material";
import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { Grid } from "@mui/material";
import ProductCard from "@/components/productcard";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import ProductModel from "@/modalsmongoose/product";
import FilterBar from "@/components/filtergroup";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import LoaderAnimate from "@/components/loader";
type IHoodie = { _id: number; title: string; desc: string; img: string; category: string; size: string; color: string; price: number; availableQuantity: number; createdAt: string; updatedAt: string; slug: string };
const Hoodies: NextPage<{
    scrollTop: number, hoodies: Array<IHoodie>, loading?: boolean; cart: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string
        }
    }
}> = ({ scrollTop, hoodies, loading, cart }) => {
    const [loader, setLoader] = useState(true);
    const toastOptions = useToast();
    const themeState = useSelector((state: IState) => state.toggletheme);
    useEffect(() => {
        hoodies && setLoader(false);
        toastOptions("Hoodies Fetched successfully", "success");
    }, [])
    return (
        <>
            {loader ? <Backdrop open>
                <LoaderAnimate />
            </Backdrop> :
                <div className={themeState.dark ? style.hoodiescontainerdark : style.hoodiescontainerlight} >
                    <section className="text-gray-600 body-font">
                        <div className="container-fluid p-0">
                            <div className="row h-100">
                                <div className={`col-md-2 ${style.hoodiesmobilefilter} p-2`}>
                                    <FilterBar theme={themeState} />
                                </div>
                                <div className={`col-md-10 ${style.mobilepositive} p-2`}>
                                    <div className={"py-2"}>
                                        <Typography className={themeState.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                            Explore our hoodies collections!
                                        </Typography>
                                        <Typography color={themeState.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.2}>
                                            Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                        </Typography>
                                        <Grid container rowGap={1.4} columnGap={1.4} justifyContent={"center"}>
                                            {Object.keys(cart).length === 0 && <Grid item xs={12}><Typography color={"#ec4899"}>Soory products out of available</Typography></Grid>}
                                            {Object.keys(cart).map((hoodies: string, index: number) => <Grid item xs={8.9} sm={5.9} md={2.2} key={index}>
                                                <Link href={`/product/${cart[hoodies].slug}`}> <ProductCard desc={cart[hoodies].desc} slug={cart[hoodies].slug} title={cart[hoodies].title} img={cart[hoodies].img} colors={cart[hoodies].color} sizes={cart[hoodies].size} /></Link></Grid>)}
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            }
        </>
    )
}
export default Hoodies;
export const getServerSideProps: GetServerSideProps<{
    hoodies?: IHoodie[], loading?: boolean; cart?: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string
        }
    }
}> = (async (context: GetServerSidePropsContext) => {
    let positive = await ProductModel.find({ category: "hoodies" }).lean();
    let modifiedResponse: Array<IHoodie> = positive.map((positive: any, index: number) => ({ ...positive, createdAt: new Date(positive.createdAt).toLocaleString(), updatedAt: new Date(positive).toLocaleString(), _id: index + 1 }));
    let cart: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string
        }
    } = {};
    modifiedResponse.forEach(hoodie => {
        if (hoodie.title in cart) {
            if (!cart[hoodie.title].color.includes(hoodie.color) && hoodie.availableQuantity > 0) {
                cart[hoodie.title].color.push(hoodie.color);
            }
            else if (!cart[hoodie.title].size.includes(hoodie.size) && hoodie.availableQuantity > 0) {
                cart[hoodie.title].size.push(hoodie.size);
            }
        }
        else {
            if (hoodie.availableQuantity > 0) {
                cart[hoodie.title] = {
                    title: hoodie.title,
                    desc: hoodie.desc,
                    img: hoodie.img,
                    category: hoodie.category,
                    size: [],
                    color: [],
                    price: hoodie.price,
                    availableQuantity: hoodie.availableQuantity,
                    slug: hoodie.slug
                };
                cart[hoodie.title].color = [hoodie.color];
                cart[hoodie.title].size = [hoodie.size];
            }
        }
    });
    if (positive)
        return {
            props: {
                hoodies: modifiedResponse,
                cart
            }
        }
    else {
        return {
            props: {
                loading: true
            }
        }
    }
})