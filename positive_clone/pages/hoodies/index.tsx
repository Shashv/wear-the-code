import React, { useCallback, useRef, useState } from "react";
import style from "./index.module.css";
import { useEffect } from "react";
import { Backdrop, Typography } from "@mui/material";
import Pagination from "../../components/pagination"
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { Grid } from "@mui/material";
import ProductCard from "@/components/productcard";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import ProductModel from "@/modalsmongoose/product";
import FilterBar from "@/components/filtergroup";
import Link from "next/link";
import LoaderAnimate from "@/components/loader";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { IHoodie } from "@/modals";
import useSearchParamsstate from "@/hooks/useSearchParams";
import usePositive from "@/hooks/usePositive";

const Hoodies: NextPage<{
    scrollTop: number, hoodies: Array<IHoodie>, loading?: boolean; cart: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string; productOrientations?: string; tags?: string;
        }
    }
}> = ({ hoodies, cart }) => {

    const [loader, setLoader] = useState(true);
    const session = useSession();

    const router = useSearchParamsstate();
    const themeState = useSelector((state: IState) => state.toggletheme);
    const isInitialMount = useRef<boolean | null>(true);
    const { page, totalPages } = usePositive({ totalRecords: Object.keys(cart).length, recordsPerpage: 2 })
    const [progress, setProgress] = useState<number>(0);
    const [backdropActive, setBackdropactive] = useState<boolean>(false);
    ; const changePage = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
        router.setQuery({
            page: page.toString()
        })
    }
    const callBackfunction = useCallback(() => {
        console.log("Backdrop state", backdropActive)
        setBackdropactive(backdrop => !backdrop);
    }, []);
    useEffect(() => {
        if (session.status === "unauthenticated") router.getDetails().replace("/authentication/login");
        if (hoodies) {
            setLoader(false);
            setProgress(100);
        }
        switch (isInitialMount.current) {
            case true: {
                toast.success("Hoodies", {
                    theme: themeState.light ? "light" : "dark",
                    autoClose: 2000,
                    position: "top-center"
                });
                isInitialMount.current = false;
            }
            default: {
                return
            }
        }
    }, [session]);

    return (
        <>
            {loader ? <Backdrop open>
                <LoaderAnimate />
            </Backdrop> :
                <>
                    <LoadingBar progress={progress} height={3} color="magenta" />
                    <div className={themeState.dark ? style.hoodiescontainerdark : style.hoodiescontainerlight} >
                        <section className="text-gray-600 body-font">
                            <div className="container-fluid p-0">
                                <div className={`row h-100 ${backdropActive ? 'bg-primary' : ''}`}>
                                    <div className={`col-md-2 ${style.hoodiesmobilefilter} p-2`}>
                                        <FilterBar theme={themeState} setShowMobilefilter={callBackfunction} />
                                    </div>
                                    <div className={`col-md-10 ${style.mobilepositive} p-2 px-5`}>
                                        <div className={"py-2"}>
                                            <Typography className={themeState.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                                Explore our hoodies collections!
                                            </Typography>
                                            <Typography color={themeState.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }} fontWeight={600} lineHeight={1.6}>
                                                Welcome to Codeswear.com, your one-stop shop for stylish and unique hoodies. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                            </Typography>
                                            <Grid container rowGap={2.4} columnGap={1.4} justifyContent={"center"}>
                                                {Object.keys(cart).length === 0 && <Grid item xs={12}><Typography color={"#ec4899"}>Soory products out of available</Typography></Grid>}
                                                {Object.keys(cart).map((hoodies: string, index: number) => <Grid item xs={5.7} sm={5.9} md={2.3} key={index}>
                                                    <Link href={`/product/${cart[hoodies].slug}`}> <ProductCard desc={cart[hoodies].desc} slug={cart[hoodies].slug} title={cart[hoodies].title} img={cart[hoodies].img} imageFront={cart[hoodies].productOrientations?.split(",")[0]}
                                                        imageBack={cart[hoodies].productOrientations?.split(",")[1]} colors={cart[hoodies].color} sizes={cart[hoodies].size} /></Link></Grid>)}
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Pagination page={page} changePage={changePage} pageList={totalPages} />
                        </section>
                    </div>
                </>
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
    let sessionData = await getServerSession(context.req, context.res, authorizeOptions);
    let modifiedResponse: Array<IHoodie> = positive.map((positive: any, index: number) => ({ ...positive, createdAt: new Date(positive.createdAt).toLocaleString(), updatedAt: new Date(positive).toLocaleString(), _id: index + 1 }));
    let cart: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string; productOrientations?: string; tags?: string;
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
                    slug: hoodie.slug,
                    productOrientations: hoodie.productOrientations ? hoodie.productOrientations : "",
                    tags: hoodie.tags ? hoodie.tags : ""
                };
                cart[hoodie.title].color = [hoodie.color];
                cart[hoodie.title].size = [hoodie.size];
            }
        }
    });
    if (sessionData) {

        return {
            props: {
                hoodies: modifiedResponse,
                cart
            }
        }
    }
    else {
        return {
            props: {
                loading: true
            },
            redirect: {
                basePath: false,
                permanent: false,
                destination: "/authentication/login",
            }
        }
    }
})