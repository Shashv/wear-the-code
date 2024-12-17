"use client";
interface IShirt {
    data: any[];
    onScroll: any;
    theme: { light: boolean; dark: boolean; };
}
import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import styles from "./index.module.css";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { connect } from "react-redux";
import store, { IState } from "@/redux/sore";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import StyledToast from "@/components/toast";
import Head from "next/head";
import { Grid } from "@mui/material";
import { ToastContext } from "@/hooks/useToast";
import LoaderAnimate from "@/components/loader";
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
}
class Shirts extends React.Component<IShirt, { data: any, toast: { active: boolean; variant: string; }; loader: boolean }> {
    static contextType?: React.Context<any> | undefined = ToastContext;
    constructor(props: IShirt) {
        super(props);
        this.state = {
            data: {},
            loader: false,
            toast: {
                active: false,
                variant: "success"
            },
        }
        this.getData = this.getData.bind(this);
        this.onClose = this.onClose.bind(this);
        this.autoHide = this.autoHide.bind(this);
        this.refreshVariants = this.refreshVariants.bind(this);
    }
    getData(): void {
        this.setState({ loader: true, data: {} })
        fetch("/api/getProducts").then(response => response.json()).then(result => {
            this.setState({
                data: result.productlist,
                loader: false,
                toast: {
                    active: true,
                    variant: "success"
                }
            })
        });
    }
    refreshVariants(): void {
        window.location.reload();
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
                <ToastContext.Consumer>
                    {(context: (message?: string, type?: string) => void) => {
                        return (
                            <>
                                {
                                    this.state.loader ? <Backdrop className="flex flex-column align-center justify-center" open>
                                        <LoaderAnimate />
                                    </Backdrop> :
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
                                                                    <Typography color={this.props.theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { xs: 13, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.2}>
                                                                        Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                                                    </Typography>
                                                                    <Grid container rowGap={1.4} className="justify-center" columnGap={1.4}>
                                                                        {Object.keys(this.state.data).length > 0 &&
                                                                            Object.keys(this.state.data).map((key: string, index: number) =>
                                                                                <Grid item xs={8.9} sm={5.9} md={2.2} key={index}>
                                                                                    <Link href={{
                                                                                        pathname: `product/${this.state.data[key].slug}`
                                                                                    }} >
                                                                                        <ProductCard colors={this.state.data[key].colors} sizes={this.state.data[key].sizes} title={this.state.data[key].title} img={this.state.data[key].img} desc={this.state.data[key].desc}
                                                                                            category="Tshirt" price={10} />
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
                                            </div>
                                        </>
                                }
                            </>
                        )

                    }}
                </ToastContext.Consumer>
            </>
        )
    }
    componentDidMount(): void {
        const contextValue: any = this.context;
        contextValue("TShirts - Codeswear - Wear the Code", "success");
        this.getData();
    }
    componentDidUpdate(previousprops: Readonly<IShirt>, previousstate: Readonly<IShirt | { data: any, loader: boolean, toast: { active: boolean; variant: string } }>): void {
    }
}
let combinedstate = store.getState();
const mapStateToProps = (combinedstate: IState) => {
    let { toggletheme } = combinedstate;
    return {
        theme: toggletheme
    }
}
export default connect(mapStateToProps)(Shirts); 