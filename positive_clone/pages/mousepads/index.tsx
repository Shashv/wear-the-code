import React from "react";
import Head from 'next/head';
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ProductModel from "@/modalsmongoose/product";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import FilterBar from "@/components/filtergroup";
import style from "./index.module.css";
import ProductCard from "@/components/productcard";
import useToast from "@/hooks/useToast";
const MousePads: NextPage<{
    mousePadsSchema: {
        [key: string]: {
            title: string;
            desc: string;
            price: number;
            img: string;
            slug: string;
            colors: string[];
            sizes: string[];
            udpatedAt?: string;
            createdAt?: string;
            _id?: any;
            availableQuantity: number;
            category: string;
        }
    }
}> = (props) => {
    let { mousePadsSchema } = props;
    const theme = useSelector((state: IState) => state.toggletheme);
    const toastOptions = useToast();
    useEffect(() => {
        Object.keys(mousePadsSchema).length > 0 &&
            toastOptions("Mousepads fetched successfully", "success");
    }, []);
    return (
        <>
            <Head>
                <title>Positive MousePads</title>
                <link rel="icon" href="/logo.webp" />
            </Head>
            <div className={theme.light ? style.padlight : style.paddark}>
                <section className="">
                    <div className="container-fluid">
                        <div className="row h-100">
                            <div className={`col-md-2 ${style.mobilepadcontainer} p-2`}>
                                <FilterBar theme={theme} />
                            </div>
                            <div className="col-md-10 p-2">
                                <div className="py-3">
                                    <Typography color={theme.light ? "#000" : "#fff"} className="text-center" fontSize={{ xs: 21, md: 30.5 }}>
                                        Explorre our MousePads at negotiable price and best quality
                                    </Typography>
                                    <Typography color={theme.light ? "#000" : "#9ca3af"} className="text-start px-24 py-2 pb-3" sx={{ fontSize: { xs: 13, md: 14 } }}>
                                        Welcome to Codeswear.com, your one-stop shop for stylish and unique mousepads. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                    </Typography>
                                    <Grid container rowGap={1.4} columnGap={1.4}>
                                        {
                                            Object.keys(mousePadsSchema || {}).length > 0 ?
                                                Object.keys(mousePadsSchema).map((mousepad: string, index: number) => <Grid key={index} item xs={8.9} sm={5.8} md={2.2}>
                                                    <ProductCard title={mousePadsSchema[mousepad].title} colors={mousePadsSchema[mousepad].colors} sizes={mousePadsSchema[mousepad].sizes} desc={mousePadsSchema[mousepad].desc} img={mousePadsSchema[mousepad].img} category={mousePadsSchema[mousepad].category} />
                                                </Grid>)
                                                :
                                                <Grid item xs={12}>
                                                    <Typography className="text-2xl text-pink-500">
                                                        Sorry , product ou of stock
                                                    </Typography>
                                                </Grid>
                                        }
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}
export default MousePads;
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const mousepads = await ProductModel.find({ category: "mousepads" }).lean();
    const mousePadsSchema: {
        [key: string]: {
            title: string;
            desc: string;
            price: number;
            img: string;
            slug: string;
            colors: string[];
            sizes: string[];
            udpatedAt?: string;
            createdAt?: string;
            _id?: any;
            availableQuantity: number;
            category: string;
        }
    } = {};
    for (let pad of mousepads) {
        if (pad.title in mousePadsSchema) {
            if (!mousePadsSchema[pad.title].colors.includes(pad.color) && pad.availableQuantity > 0) {
                mousePadsSchema[pad.title].colors.push(pad.color);
            }
            else if (!mousePadsSchema[pad.title].sizes.includes(pad.size) && pad.availableQuantity > 0) {
                mousePadsSchema[pad.title].sizes.push(pad.size);
            }
        }
        else {
            if (pad.availableQuantity > 0)
                mousePadsSchema[pad.title] = {
                    title: pad.title,
                    colors: [pad.color],
                    sizes: [pad.size],
                    slug: pad.slug,
                    desc: pad.desc,
                    img: pad.img,
                    price: pad.price,
                    availableQuantity: pad.availableQuantity,
                    category: pad.category,
                    createdAt: new Date(pad.createdAt).toLocaleString(),
                    udpatedAt: new Date(pad.updatedAt).toLocaleString(),
                }
        }
    }
    return {
        props: {
            mousePadsSchema
        }
    }
}