import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
// import SlickSlides from "@/components/slickSlides";
import ProductModel from "@/modalsmongoose/product";
import ProductCard from "@/components/productcard";
// import { useCallback, useMemo } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import Head from "next/head";
import LoaderAnimate from "@/components/loader";
import styles from "../stickers/index.module.css";
import FilterBar from "@/components/filtergroup";
import { useSession } from "next-auth/react";
import { Grid } from "@mui/material";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
const StickersPage: React.FC<{ stickers: Array<unknown> }> = (props: { stickers: Array<any> }) => {
    let [toastCustom, setToast] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const router = useRouter();
    const combinedState = useSelector((state: IState) => state.toggletheme);
    const hideToast: (e: React.MouseEvent) => void = (e) => {
        setToast(false);
    }
    //scroll positive..///
    // const onScroll: (e: any) => void = (e) => {
    // }
    ///....//
    const session = useSession();
    const [positive, setPositive] = useState<number>(40);

    useEffect(() => {

        if (session.status === "unauthenticated") {
            toast.error("Oops you are not authenticated");
            setLoader(false);
            router.replace("/authentication/login");
        }
    
        else {
            setPositive(100);
            toast.success("Stickers", {
                theme: combinedState.dark ? "dark" : "light",
                autoClose: 2000
            })
        }
    }, []);
    // onclose function///
    // const onClose: (e: React.MouseEvent<any>, timeOutID: any) => void = (e, id) => {
    //     clearTimeout(id);
    //     setToast(false);
    // }
    // ..... ///
    return (
        <>
            <Head>
                <title>Buy best stickers : Code Swear</title>
                <link rel={"icon"} href="logo.webp" />
            </Head>
            {!loader && session.status === "authenticated" ?
                <>
                    <LoadingBar color="magenta" shadow transitionTime={1500} progress={positive} height={3} />
                    <div className={combinedState.dark ? `${styles.containerpacksdark}` : `${styles.containerpacks}`}>
                        <section className="">
                            <div className="container-fluid p-0">
                                <div className="row h-100">
                                    <div className={`col-md-2 ${styles.positivefiltercontainer} p-2`}>
                                        <FilterBar theme={combinedState} />
                                    </div>
                                    <div className="col-md-10 p-2">
                                        <div className="py-2">
                                            <Typography className={combinedState.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                                Explore Our Stickers Collection
                                            </Typography>
                                            <Typography color={combinedState.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { sm: 15, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.6} fontWeight={600}>
                                                Welcome to Codeswear.com, your one-stop shop for stylish and unique stickers. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                            </Typography>
                                            <Grid container rowGap={2} className="justify-center" columnGap={1.4}>
                                                {props.stickers ? props.stickers.map((sticker, index) => <Grid item xs={5.4} sm={5.9} md={2.7} key={`sticker-${index}`}>
                                                    <Link href={`/product/${sticker.slug}`}>
                                                        <ProductCard title={sticker.title} desc={sticker.desc} img={sticker.img} category={sticker.category} slug={sticker.slug} />
                                                    </Link>
                                                </Grid>)
                                                    : <div className="col-12">
                                                        <Typography className="error-text" variant="h4">
                                                            OOPS , Something went wrong !
                                                        </Typography>
                                                    </div>}
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Pagination page={1} pageList={[1, 2, 3, 4, 5]} changePage={() => console.log("Page change")} />
                    </div>
                </>
                :
                session.status === "loading" || loader &&
                <Backdrop open className="flex flex-column align-center justify-center body-font">
                    <LoaderAnimate />
                </Backdrop>}

        </>
    )
}
export default StickersPage;
export const getServerSideProps: GetServerSideProps<{ stickers?: Array<unknown | any>, error?: string }> = async (context: GetServerSidePropsContext) => {
    const sessionServer = await getServerSession(context.req, context.res, authorizeOptions);
    //server consoles session check ..//
    // console.log("Sessionstickers", sessionServer);
    let responseStickers: any = await ProductModel.find({ category: "stickers" }).lean();
    let filteredResponse = responseStickers.map((sticker: any) => {
        const { _id, ...rest } = sticker;
        return { ...rest, createdAt: new Date(sticker.createdAt).toLocaleString(), updatedAt: new Date(sticker.updatedAt).toLocaleString() };
    })
    if (sessionServer) {
        if (responseStickers)
            return {
                props: {
                    stickers: [...filteredResponse],
                }
            }
        else return {
            props: {
                error: "Something went wrong"
            }
        }
    }
    else {
        return {
            redirect: {
                permanent: false,
                destination: "/authentication/login",
                basePath: false
            }
        }
    }

}

