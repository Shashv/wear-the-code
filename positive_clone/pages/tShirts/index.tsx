export interface Product {
    title: string;
    desc: string;
    img: string;
    colors: string[];
    sizes: string[];
    price: number;
    slug: string;
    category?: string;
    availableQuantity?: number;
    tags?: string;
    productOrientations?: string;
}

interface TShirtProps {
    theme: {
        light: boolean;
        dark: boolean;
    };
    router: NextRouter;
}

interface TShirtState {
    products: Record<string, Product>;
    loading: boolean;
    progress: number;
    page: number;
}
import { NextRouter } from "next/router";
import React, { Component } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { Typography, Grid } from "@mui/material";
import { connect } from "react-redux";
import { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import authorizeOptions from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { withRouter } from "next/router";
import paginate from "@/utils/paginate";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";

class TShirts extends Component<TShirtProps, TShirtState> {
    constructor(props: TShirtProps) {
        super(props);
        this.state = {
            products: {},
            loading: false,
            progress: 40,
            page: 1
        };
    }

    async fetchProducts() {
        try {
            const response = await fetch("/api/getProducts");
            const { productlist } = await response.json();

            this.setState({
                products: productlist,
                loading: false
            });

            toast.success("Tshirts", {
                theme: this.props.theme.light ? "light" : "dark",
                autoClose: 2000,
                position: "top-center"
            });
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
        }
    }

    handlePageChange = (_: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.props.router.replace(`/tShirts?page=${page}`);
    };

    renderProductGrid() {
        const { products } = this.state;
        const { theme } = this.props;

        return (
            <div className={"py-2"}>
                <Typography
                    className={theme.light ? "text-dark text-center" : "text-light text-center"}
                    fontWeight={600}
                    sx={{ fontSize: { xs: 21, md: 30.5 } }}
                >
                    Explore Our TShirts Collection
                </Typography>

                <Typography
                    color={theme.light ? "#000" : "#9ca3af"}
                    className={"text-start px-24 py-2 pb-3"}
                    sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }}
                    lineHeight={1.6}
                    fontWeight={600}
                >
                    Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                </Typography>
                <Grid container rowGap={2.4} className="justify-center" columnGap={1.4}>
                    {Object.entries(products).map(([key, product]) => (
                        <Grid item xs={5.4} sm={5.9} md={2.3} key={key}>
                            <Link href={`/product/${product.slug}`}>
                                <ProductCard
                                    imageFront={product.img}
                                    imageBack={product?.productOrientations?.split(",")[1]}
                                    {...product}
                                    category="Tshirt"
                                    showIcon
                                />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    async componentDidMount() {
        const session = await getSession();

        if (session?.user) {
            await this.fetchProducts();
            this.setState({ progress: 100 });
        } else {
            this.props.router.replace("/authentication/login");
        }
    }

    render() {
        const { progress, products } = this.state;
        const { theme } = this.props;

        return (
            <>
                <Head>
                    <link rel="icon" href="logo.webp" />
                    <title>Buy TShirts at best price in India - CodeSwear</title>
                </Head>

                <LoadingBar progress={progress} shadow height={3} color="magenta" />

                <div className={theme.light ? styles.positivelight : styles.positivedark}>
                    <section>
                        <div className="container-fluid p-0">
                            <div className="row h-100">
                                <div className={`col-md-2 ${styles.mobilefiltercontainer} p-2`}>
                                    <FilterBar theme={theme} />
                                </div>
                                <div className="col-md-10 px-5 p-2">
                                    {this.renderProductGrid()}
                                </div>
                            </div>
                        </div>
                    </section>

                    <Pagination
                        page={1}
                        pageList={Object.keys(products).length ?
                            paginate(Object.keys(products).length, 2) :
                            [1, 2, 3, 4, 5]
                        }
                        changePage={this.handlePageChange}
                    />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    theme: state.toggletheme
});

export default withRouter(connect(mapStateToProps)(TShirts));

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authorizeOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false
            }
        };
    }

    return {
        props: {
            session
        }
    };
};