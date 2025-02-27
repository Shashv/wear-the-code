interface IShirtProps {
    data: any[];
    onScroll: any;
    theme: { light: boolean; dark: boolean; };
    session?: Session;
    router: NextRouter;

}
type IShirtState = {
    data: any, toast: { active: boolean; variant: string; }; loader: boolean; progress: number
}
import React from "react";
import Link from "next/link";
// import { Container, Row, Col } from "reactstrap";
import styles from "./index.module.css";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
// import { compose } from "redux";
import store, { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import Head from "next/head";
import { Grid } from "@mui/material";
// import LoaderAnimate from "@/components/loader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import authorizeOptions from "../api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";
import { NextRouter, withRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
export type IProductType = {
    readonly desc: string;
    readonly category?: string;
    readonly price?: number;
    readonly slug?: string;
    readonly img?: string;
    readonly colors?: string[];
    readonly type?: string;
    readonly availableQuantity?: number;
    readonly title?: string;
    readonly sizes?: string[];
    showIcon?: boolean;
}
class Shirts extends React.Component<IShirtProps, IShirtState> {
    constructor(props: IShirtProps) {
        super(props);
        this.state = {
            data: {},
            loader: false,
            toast: {
                active: false,
                variant: "success"
            },
            progress: 40,
        }
        this.getData = this.getData.bind(this);
        this.onClose = this.onClose.bind(this);
        this.autoHide = this.autoHide.bind(this);
    }
    getData(): void {
        // custom loader//
        // this.setState({ loader: true, data: {} });
        // custom loader//
        fetch("/api/getProducts").then(response => response.json()).then(result => {
            this.setState({
                data: result.productlist,
                loader: false,
                toast: {
                    active: true,
                    variant: "success"
                }
            });
            toast.success("Tshirts", {
                theme: this.props.theme.light ? "light" : "dark",
                autoClose: 2000,
            })
        });
    }
    onClose(e: any, timeOutId: any): void {
        clearTimeout(timeOutId);
        this.setState(state => ({ ...state, toast: { ...state.toast, active: false, variant: "success" } }))
    }
    autoHide(): void {
        this.setState((state) => ({ ...state, toast: { ...state.toast, active: false, variant: "success" } }));
    }
    render(): JSX.Element {
        return (
            <>
                <Head>
                    <link rel="icon" href="logo.webp" />
                    <title>
                        But TShirts at best price in India - CodeSwear
                    </title>
                </Head>
                <LoadingBar progress={this.state.progress} shadow className="" height={3} color="magenta" />
                <>
                    <div className={this.props.theme.light ? `${styles.positivelight}` : `${styles.positivedark}`}>
                        <section className="">
                            <div className={"container-fluid p-0"}>
                                <div className="row h-100">
                                    <div className={`col-md-2 ${styles.mobilefiltercontainer} p-2`}>
                                        <FilterBar theme={this.props.theme} />
                                    </div>
                                    <div className="col-md-10 p-2">
                                        <div className={"py-2"}>
                                            <Typography className={this.props.theme.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                                Explore Our TShirts Collection
                                            </Typography>
                                            <Typography color={this.props.theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.6} fontWeight={600}>
                                                Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                            </Typography>
                                            <Grid container rowGap={2} className="justify-center" columnGap={1.4}>
                                                {Object.keys(this.state.data).length > 0 &&
                                                    Object.keys(this.state.data).map((key: string, index: number) =>
                                                        <Grid item xs={5.4} sm={5.9} md={2.7} key={index}>
                                                            <Link href={{
                                                                pathname: `product/${this.state.data[key].slug}`
                                                            }} >
                                                                <ProductCard colors={this.state.data[key].colors} sizes={this.state.data[key].sizes} title={this.state.data[key].title} img={this.state.data[key].img} desc={this.state.data[key].desc}
                                                                    category="Tshirt" showIcon price={this.state.data[key].price} />
                                                            </Link>
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Pagination page={1} pageList={[1, 2, 3, 4, 5]} changePage={() => { }} />
                    </div>
                </>

            </>
        )
    }
    async componentDidMount(): Promise<void> {
        // const contextValue: any = this.context;
        const session = await getSession();
        // console.log("tshitst", session);
        if (session?.user) {
            this.getData();
            this.setState({ progress: 100 })
        }
        else {
            this.props.router.replace("/authentication/login");
        }
    }
    componentDidUpdate(previousprops: Readonly<IShirtProps>, previousstate: Readonly<IShirtState>): void {

    }
}
// let combinedstate = store.getState();
const mapStateToProps = (combinedstate: IState) => {
    let { toggletheme } = combinedstate;
    return {
        theme: toggletheme
    }
}
export default withRouter(connect(mapStateToProps)(Shirts));
// function called when using the server side tokens..//
export const getServerSidepProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionServer = await getServerSession(context.req, context.res, authorizeOptions);
    //check server session...///
    // console.log("positive", sessionServer);
    if (sessionServer) {
        return {
            props: {
                sessionServer
            }
        }
    }
    else {
        return {
            redirect: {
                basePath: false,
                destination: "/authentication/login",
                permanent: false
            }
        }
    }
}
// function will call on server side...//*9+6