import React from "react";
import style from "./index.module.css";
import ProductModel from "@/modalsmongoose/product";
import { Grid } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import positive from './index.module.css';
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
import { Typography } from '@mui/material';
import Head from "next/head";
import Link from "next/link";
const Dotted: React.FC = () => {
    return (
        <>
            <div className={style.section}>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
                <span className={style.dot}></span>
            </div>
        </>
    )
}
const Zippers: NextPage<{
    zipperSchema: {
        [key: string]: {
            title: string;
            id?: number;
            desc: string;
            createdAt?: string;
            updatedAt?: string;
            img: string;
            category: string;
            colors: string[];
            sizes: string[];
            price: number;
            availableQuantity: number;
            slug: string
        }
    }
}> = (params) => {
    const { zipperSchema } = params;
    const theme = useSelector((state: IState) => state.toggletheme);
    return (
        <>
            <Head>
                <title>
                    CodeSwear - Zippers
                </title>
                <meta content="CodeSwear zippers is the best"></meta>
            </Head>
            <div className={theme.light ? style.lightzipper : style.darkzipper}>
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className={`col-md-2 ${positive.mobilefiltercontainer} p-2`}>
                                <FilterBar theme={theme} />
                            </div>
                            <div className="col-md-10 p-2">
                                <div className="py-3">
                                    <Typography className={theme.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                        Explore Our Zippers Collection
                                    </Typography>
                                    <Typography color={theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.2}>
                                        Welcome to Codeswear.com, your one-stop shop for stylish and unique zippers. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                    </Typography>
                                    <Grid container columnGap={1.4} justifyContent={"center"} rowGap={1.4}>
                                        {Object.keys(zipperSchema || {}).length > 0 ?
                                            Object.keys(zipperSchema).map((zipper: string, index: number) => <Grid item xs={8.9} sm={5.9} md={2.2}>
                                                <Link href={`/product/${zipperSchema[zipper].slug}`}>

                                                </Link>
                                            </Grid>) :
                                            <Grid item xs={12}>
                                                <Typography variant="h2" color={"magenta"}>
                                                    Sorry , product out of stock
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
export default Zippers;
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let fetchedProducts = await ProductModel.find({ category: "zippers" });
    const zippersSchema: {
        [key: string]: {
            title: string;
            id?: number;
            desc: string;
            createdAt?: string;
            updatedAt?: string;
            img: string;
            category: string;
            colors: string[];
            sizes: string[];
            price: number;
            availableQuantity: number;
            slug: string
        }
    } = {};
    for (let zipper of fetchedProducts) {
        if (zipper.title in zippersSchema && zipper.availableQuantity > 0) {
            if (!zippersSchema[zipper.title].colors.includes(zipper.color))
                zippersSchema[zipper.title].colors.push(zipper.color);
            else if (!zippersSchema[zipper.title].sizes.includes(zipper.size))
                zippersSchema[zipper.title].sizes.push(zipper.size);
        }
        else {
            zippersSchema[zipper.title] = {
                title: zipper.title,
                img: zipper.img,
                desc: zipper.desc,
                colors: [zipper.color],
                sizes: [zipper.size],
                slug: zipper.slug,
                availableQuantity: zipper.availableQuantity,
                category: zipper.category,
                price: zipper.price
            }
        }
    }
    return {
        props: {
            zippersSchema
        }
    }
}
// export default Dotted;