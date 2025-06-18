import React, { useEffect, useRef, useState, useMemo } from "react";
import style from "./index.module.css";
import calculateConfig from "@/utils/constants/pagination/calculateConfigvalues";
import { Grid } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import positive from './index.module.css';
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
import { Typography } from '@mui/material';
import Head from "next/head";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ProductCard from "@/components/productcard";
import LoadingBar from "react-top-loading-bar";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import Pagination from "@/components/pagination";
import usePositive from "@/hooks/usePositive";
import useSearchParamsstate from "@/hooks/useSearchParams";
import { toast } from "react-toastify";
import { FormatisedList, IShirts } from "@/modals";
import babaji from "@/utils/babaji";

interface ZipperSchema {
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

interface ZippersProps {
    zippersSchema: Record<string, ZipperSchema>
}

const Zippers: NextPage<ZippersProps> = ({ zippersSchema }) => {
    const theme = useSelector((state: IState) => state.toggletheme);
    const initialMount = useRef<boolean | null>(true);
    const session = useSession();
    const router = useSearchParamsstate();
    const [progress, setProgress] = useState<number>(0);

    const { totalPages, page } = usePositive({
        totalRecords: Object.keys(zippersSchema).length,
        recordsPerpage: 2
    });

    const changePage = useMemo(() => (
        (_: React.MouseEvent<HTMLButtonElement> | any, page: number) => {
            router.getDetails().push(`/zippers?page=${page}`);
        }
    ), [router]);

    useEffect(() => {
        if (!router.query.page) {
            router.setQuery({ page: page.toString() });
        }

        if (initialMount.current) {
            toast.success("Zippers", {
                theme: theme.light ? "light" : "dark",
                autoClose: 2000,
                position: "top-center"
            });
            initialMount.current = false;
        }
    }, [router, page, theme.light]);

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.getDetails().push("/authentication/login");
        }
    }, [session.status, router]);

    const renderProductGrid = useMemo(() => (
        <Grid container columnGap={1.4} justifyContent="center" rowGap={2.2}>
            {Object.keys(zippersSchema || {}).length > 0 ? (
                Object.entries(zippersSchema).map(([zipper, product]) => (
                    <Grid item xs={5.7} sm={5.9} md={2.3} key={zipper}>
                        <Link href={`/product/${product.slug}`}>
                            <ProductCard {...product} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12} className="justify-center flex">
                    <Typography variant="h4" color="magenta">
                        Sorry, product out of stock
                    </Typography>
                </Grid>
            )}
        </Grid>
    ), [zippersSchema]);

    return (
        <>
            <Head>
                <title>CodeSwear - Zippers</title>
                <meta content="CodeSwear zippers is the best" name="description" />
            </Head>

            <LoadingBar color="magenta" height={3} progress={progress} />

            <div className={theme.light ? style.lightzipper : style.darkzipper}>
                <section>
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className={`col-md-2 ${positive.mobilefiltercontainer} p-2`}>
                                <FilterBar theme={theme} />
                            </div>
                            <div className="col-md-10 px-5 p-2">
                                <div className="py-3">
                                    <Typography
                                        className={theme.light ? "text-dark text-center" : "text-light text-center"}
                                        fontWeight={600}
                                        sx={{ fontSize: { xs: 21, md: 30.5 } }}
                                    >
                                        Explore Our Zippers Collection
                                    </Typography>

                                    <Typography
                                        color={theme.light ? "#000" : "#9ca3af"}
                                        className="text-start px-24 py-2 pb-3"
                                        sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }}
                                        lineHeight={1.6}
                                        fontWeight={600}
                                    >
                                        Welcome to Codeswear.com, your one-stop shop for stylish and unique zippers. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                    </Typography>

                                    {renderProductGrid}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination page={page} pageList={totalPages} changePage={changePage} />
                </section>
            </div>
        </>
    );
};

export default Zippers;

export const getServerSideProps: GetServerSideProps<{ zippersSchema: FormatisedList, session?: unknown }> = async (context: GetServerSidePropsContext) => {
    const getServerSideSession = await getServerSession(context.req, context.res, authorizeOptions);
    const { query } = context;
    let { skipOffset, limitValue } = calculateConfig(Number(query.page))
    if (!getServerSideSession) {
        return {
            redirect: {
                basePath: false,
                destination: "/authentication/login",
                permanent: false
            }
        };
    }

    const page = context.query.page;
    if (!page) {
        return {
            redirect: {
                permanent: false,
                destination: `/zippers?page=1`
            }
        };
    }

    const zippersSchema: FormatisedList = await babaji("zippers", skipOffset, limitValue) || {};

    return {
        props: { zippersSchema }
    };
};