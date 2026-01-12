import React from "react";
import style from "./index.module.css";
import { connect, } from "react-redux";
import { IState } from "@/redux/sore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ProductModel from "@/modalsmongoose/product";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import { Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import Link from "next/link";
import Router from "next/router";

import LoadingBar from "react-top-loading-bar";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import paginate from "@/utils/paginate";
import { FormatisedList, IMugs, } from "@/modals";
import babaji from "@/utils/babaji";
import calculateConfig from "@/utils/constants/pagination/calculateConfigvalues";
import ProductLabel from "@/components/productLabel";

const mapStateToProps = (state: IState): unknown => {
    let { toggletheme } = state;
    return {
        theme: toggletheme
    }
}
const partialConnector = connect(mapStateToProps);

class Mugs extends React.Component<any, IMugs> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "Initial Empty state",
            age: 21,
            loader: false,
            progress: 40,
            pages: [],
            page: Router.query.page ? Number(Router.query.page) : 1
        }
        this.changePage = this.changePage.bind(this);
    }

    render(): JSX.Element {
        return (
            <>
                <LoadingBar height={3} color="magenta" progress={this.state.progress} />
                <div className={this.props.theme.light ? style.lightcontainer : style.darkcontainer}>
                    <section className="">
                        <div className="container-fluid p-0">
                            <div className="row h-100">
                                <div className={`col-md-2 ${style.mobilecontainermugs} p-2`}>
                                    <FilterBar theme={this.props.theme} />
                                </div>
                                <div className="col-md-10 px-5 p-2">
                                    <div className="list-container py-2">
                                        <ProductLabel labelHead="Explore Our Mugs Collection" description="Welcome to Codeswear.com, your one-stop shop for stylish and unique mugs. Buy mugs at the best price in India. We offer a wide range of tshirts for all interests, including coding mugs, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!" />
                                        <Typography className={this.props.theme.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>

                                        </Typography>
                                        <Typography color={this.props.theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { sm: 15, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.6} fontWeight={600}>

                                        </Typography>
                                        <Grid container columnGap={1.4} rowGap={2.4} justifyContent={"center"}>
                                            {Object.keys(this.props.mugsSchema).length > 0 ? Object.keys(this.props.mugsSchema).map((mugs: string, index: number) =>
                                                <Grid key={index} item xs={5.7} sm={5.9} md={2.3}>
                                                    <Link href={`/product/${this.props.mugsSchema[mugs].slug}`}>
                                                        <ProductCard title={this.props.mugsSchema[mugs].title} colors={this.props.mugsSchema[mugs].color} sizes={this.props.mugsSchema[mugs].size} desc={this.props.mugsSchema[mugs].desc} img={this.props.mugsSchema[mugs].img} />
                                                    </Link>
                                                </Grid>) : <Grid xs={12} item><Typography color={this.props.theme.light ? "#000" : "#fff"}>
                                                    No Mugs Available</Typography>
                                            </Grid>}
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination changePage={this.changePage} page={this.state.page} pageList={this.state.pages ? this.state.pages : [1, 2, 3, 4]} />
                    </section>
                </div>
            </>
        )
    }
    async componentDidMount(): Promise<void> {
        this.setState({ pages: paginate(this.props.mugsCount, 5) });

        toast.success("Mugs", {
            theme: this.props.theme.dark ? "dark" : "light",
            autoClose: 2000,
            position: "top-center"
        })

        this.setState({ progress: 100 });
    }
    componentWillUnmount(): void {
        console.log("Component will unmount from the dom tree")
    }


    changePage(e: React.MouseEvent<HTMLButtonElement>, page: number): void {
        this.setState({ page });
        Router.push({
            pathname: `/mugs`,
            query: { page: page.toString() }
        })
    }
}

export default (partialConnector(Mugs));
export const getServerSideProps: GetServerSideProps<{ mugsSchema: FormatisedList, sesssion?: unknown }> = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authorizeOptions);
    const { page } = context.query;
    const babajipositive = calculateConfig(Number(page))

    const mugsCount: number = await ProductModel.countDocuments({ category: "mugs" });

    let mugsSchemaBabaji: FormatisedList = {};
    mugsSchemaBabaji = (await babaji("mugs", babajipositive.skipOffset, babajipositive.limitValue)).configuration || {};
    let mugsBabaji = (await babaji("mugs", babajipositive.skipOffset, babajipositive.limitValue)).configurationCount

    if (session) {
        const page = context.query.page;
        if (page) return {
            props: {

                mugsSchema: mugsSchemaBabaji,
                mugsCount: mugsBabaji
            }
        }
        else return {
            redirect: {
                destination: "/mugs?page=1",
                permanent: false
            }

        }
    }
    else {
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false,
                basePath: false
            }
        }
    }
}
