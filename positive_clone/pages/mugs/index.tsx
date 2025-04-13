import React from "react";
// import { Container, Row, Col } from "reactstrap";
import style from "./index.module.css";
import { connect, ConnectedProps } from "react-redux";
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
// import { compose } from "redux";
// import { withRouter, NextRouter } from "next/router";
// import { getSession } from "next-auth/react";
import LoadingBar from "react-top-loading-bar";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import paginate from "@/utils/paginate";
import { IMugs } from "@/modals";
// interface PTheme {
//     theme: {
//         light: boolean;
//         dark: boolean
//     }
// }
// interface iMugs {
//     mugs?: Array<any>;
//     mugsSchema?: Array<any>
// }
const mapStateToProps = (state: IState): unknown => {
    let { toggletheme } = state;
    return {
        theme: toggletheme
    }
}
const partialConnector = connect(mapStateToProps);
// type IProps = ConnectedProps<typeof partialConnector>;
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
    // toastExecution: any;
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
                                <div className="col-md-10 p-2">
                                    <div className="list-container py-2">
                                        <Typography className={this.props.theme.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                            Explore Our Mugs Collection
                                        </Typography>
                                        <Typography color={this.props.theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { sm: 15, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.6} fontWeight={600}>
                                            Welcome to Codeswear.com, your one-stop shop for stylish and unique mugs. Buy mugs at the best price in India. We offer a wide range of tshirts for all interests, including coding mugs, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                        </Typography>
                                        <Grid container columnGap={1.4} rowGap={1.4} justifyContent={"center"}>
                                            {Object.keys(this.props.mugsSchema).length > 0 ? Object.keys(this.props.mugsSchema).map((mugs: string, index: number) =>
                                                <Grid key={index} item xs={5.7} sm={5.9} md={2.7}>
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
        // this.toastExecution = this.context;
        toast.success("Mugs", {
            theme: this.props.theme.dark ? "dark" : "light",
            autoClose: 2000,
            position:"top-center"
        })
        // const session = await getSession();
        // console.log("Session mugs", session);
        this.setState({ progress: 100 });
    }
    componentWillUnmount(): void {
        console.log("Component will unmount from the dom tree")
    }
    componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<IMugs>): void {
        // console.log("Previous state page", previousState.page, "Current Page", this.state.page);
    }
    componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>): void {
        // console.log("Next props", nextProps, "nextstate", nextState);
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
// withRouter//
//below will run on the server side for fetching data on the client side...//
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, authorizeOptions);
    let fetchedMugs: Array<any> = await ProductModel.find({ category: "mugs" }).skip(context.query.page ? (Number(context.query.page) - 1) * 10 : (1 - 1) * 10).limit(10).lean();
    const mugsCount: number = await ProductModel.countDocuments({ category: "mugs" });
    // console.log("Mugs count", mugsCount);
    const modifiedResponse = fetchedMugs.map((mugs: any, index: number) => ({ ...mugs, createdAt: new Date(mugs.createdAt).toLocaleString(), updatedAt: new Date(mugs.updatedAt).toLocaleString(), _id: index + 1 }));
    let mugsSchema: {
        [key: string]: {
            _id?: number; title: string; desc: string; img: string; category: string; size: string[]; color: string[]; price: number; availableQuantity: number; createdAt?: string; updatedAt?: string; slug: string
        }
    } = {}
    modifiedResponse.forEach(response => {
        if (response.title in mugsSchema) {
            if (!mugsSchema[response.title].color.includes(response.color)) mugsSchema[response.title].color.push(response.color);
            else if (!mugsSchema[response.title].size.includes(response.Size)) mugsSchema[response.title].size.push(response.size);
        }
        else {
            if (response.availableQuantity > 0) {
                mugsSchema[response.title] = {
                    title: response.title,
                    desc: response.desc,
                    img: response.img,
                    category: response.category,
                    size: [],
                    color: [],
                    price: response.price,
                    availableQuantity: response.availableQuantity,
                    slug: response.slug
                };
                mugsSchema[response.title].color = [response.color];
                mugsSchema[response.title].size = [response.size];
            }
            else {
                return;
            }
        }
    })
    if (session) {
        const page = context.query.page;
        if (page) return {
            props: {
                mugs: modifiedResponse,
                mugsSchema,
                mugsCount
            }
        }
        else return {
            redirect: {
                destination: "/mugs?page=1",
                permanent: false
            }
            // props: {
            //     mugs: modifiedResponse,
            //     mugsSchema
            // }
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
// ....//