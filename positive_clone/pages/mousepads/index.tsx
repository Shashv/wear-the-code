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
    return (
        <>
            <Head>
                <title>Positive MousePads</title>
                <link rel="icon" href="/logo.webp" />
            </Head>
            <div className={theme.light ? style.padlight : style.paddark}>
                <section>
                    <div className="container-fluid">
                        <div className="row h-100">
                            <div className={`col-md-2 ${style.mobilepadcontainer}`}>
                                <FilterBar theme={theme} />
                            </div>
                            <div className="col-md-10">
                                <div className="py-3">
                                    <Typography color={theme.light ? "#000" : "#fff"} fontSize={{ xs: 20, md: 30.5 }}>
                                        Explorre our MousePads at negotiable price and best quality
                                    </Typography>
                                    <Typography color={theme.light ? "#000" : "#fff"} sx={{ fontSize: { xs: 17, md: 21 } }}>
                                        Mousepads positive
                                    </Typography>
                                    <Grid container rowGap={1.4} columnGap={1.4}>
                                        {Object.keys(mousePadsSchema || {}).length > 0 ?
                                            Object.keys(mousePadsSchema).map((mousepad: string, index: number) => <Grid key={index} item xs={8.9} sm={5.8} md={2.2}>
                                                <ProductCard title={mousePadsSchema[mousepad].title} colors={mousePadsSchema[mousepad].colors} sizes={mousePadsSchema[mousepad].sizes} desc={mousePadsSchema[mousepad].desc} img={mousePadsSchema[mousepad].img} category={mousePadsSchema[mousepad].category} />
                                            </Grid>)
                                            : <Grid item xs={12}>
                                                <Typography className="text-2xl text-pink-500">
                                                    Sorry , product ou of stock
                                                </Typography></Grid>}
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