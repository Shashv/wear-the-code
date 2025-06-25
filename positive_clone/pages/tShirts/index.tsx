import React, { Component } from "react";
// import Link from "next/link";
import styles from "./index.module.css";
import { Typography, Grid } from "@mui/material";
import { connect } from "react-redux";
import { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
// import ProductCard from "@/components/productcard";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import authorizeOptions from "../api/auth/[...nextauth]";
import { getServerSession, } from "next-auth";
import { withRouter } from "next/router";
import paginate from "@/utils/paginate";
import LoadingBar from "react-top-loading-bar";
import Pagination from "@/components/pagination";
import { TShirtState, TShirtProps, FormatisedList } from "@/modals";
// import ProductModel from "@/modalsmongoose/product";

import babaji from "@/utils/babaji";
import calculateConfig from "@/utils/constants/pagination/calculateConfigvalues";
import ProductGrid from "@/utils/constants/renderProductgrid";
import ProductLabel from "@/components/productLabel";
class TShirts extends Component<TShirtProps, TShirtState> {
    constructor(props: TShirtProps) {
        super(props);
        this.state = {
            products: {},
            loading: false,
            progress: 40,
            page: 1,
            session: null,
            isMobileFilterpositive: false
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }


    handlePageChange = (_: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.props.router.replace(`/tShirts?page=${page}`);
    };

    renderProductGrid() {

        const { theme, shirts } = this.props;

        return (
            <div className={"py-2"}>
                <ProductLabel labelHead="Explore Our TShirts Collection" description="
                Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!"/>
                <ProductGrid zippersSchema={shirts} />

            </div>
        );
    }

    async componentDidMount() {
        const session = await getSession();

        this.setState({ session, progress: 100 });

    }
    async componentDidUpdate(previousProps: Readonly<TShirtProps>, previousState: Readonly<TShirtState>): Promise<void> {
        if (previousState && previousProps) {
            console.log("Component did update function", this.props.router.query);
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
                            <div className={this.state.isMobileFilterpositive ? `row h-100 ` : "row h-100"}>
                                <div className={`col-md-2 ${styles.mobilefiltercontainer} p-0`}>
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
                            paginate(Object.keys(products).length, 7) :
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
//server side function calling...//
export const getServerSideProps: GetServerSideProps<{ session: unknown; shirts: FormatisedList, shirtsCount?: number }> = async (context: GetServerSidePropsContext) => {

    let { query } = context;
    const session = await getServerSession(context.req, context.res, authorizeOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false
            }
        };
    }
    else {
        if (!context.query.page || isNaN(Number(query.page)) || Number(query.page) < 1)
            return {
                redirect: {
                    destination: '/tShirts?page=1',
                    permanent: false
                }
            };
        else {
            let babajiConfiguration: FormatisedList = {};
            // const { res } = context;
            let { skipOffset, limitValue } = calculateConfig(Number(query.page));
            // console.log("Skipoffset", skipOffset, "Limit value", limitValue)
            babajiConfiguration = (await babaji("tshirts", skipOffset, limitValue)).configuration || {};
            let shirtCount = (await babaji("tshirts", skipOffset, limitValue)).configurationCount || 10;
            return {
                props: {
                    session,
                    shirts: babajiConfiguration,
                    shirtCount
                }
            }
        }
    }
};
/* <Grid container rowGap={2.4} className="justify-center" columnGap={1.4}>
                   {Object.entries(shirts).map(([key, product]) => (
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
               </Grid> */

// ...//