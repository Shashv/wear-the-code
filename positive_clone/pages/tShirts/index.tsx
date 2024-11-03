"use client";
interface IShirt {
    data: any[];
    onScroll: any;
    theme: { light: boolean; dark: boolean; }
}
import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import styles from "./index.module.css";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { connect } from "react-redux";
import store, { IState } from "../redux/sore";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import StyledToast from "@/components/toast";
import Head from "next/head";
import { Grid } from "@mui/material";
export type IProductType = {
    readonly name: string;
    readonly variant: string;
    readonly id: number;
    readonly image_front: string;
    readonly image_back: string;
    readonly description: string;
    readonly available_shades?: string;
    readonly variations: string;
    readonly label?: string;
    readonly category?: string;
    readonly price: number;
    readonly priceoriginal: number;
    type?: string;
}
class Shirts extends React.Component<IShirt, { data: Array<IProductType>, loader: boolean }> {
    constructor(props: IShirt) {
        super(props);
        this.state = {
            data: [],
            loader: false
        }
        this.getData = this.getData.bind(this);
    }
    getData(): void {
        this.setState({ loader: true, data: [] })
        fetch("/api/shirts").then(response => response.json()).then(result => {
            this.setState({
                data: result.data,
                loader: false
            })
        });
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
                {this.state.loader ? <Backdrop open>
                    <CircularProgress sx={{ color: "#e41edc" }} size={100} />
                </Backdrop> :
                    <div className={this.props.theme.light ? `bg-white container-fluid ${styles.lightcontainer}` : `bg-dark container-fluid ${styles.darkcontainer}`}>
                        <div className="row">
                            <div className="col-2 p-0">
                                <FilterBar theme={this.props.theme} />
                            </div>
                            <div className="col-10 px-0">
                                <div className={`${this.props.theme.light ? styles.positive : styles.positivedark} p-2`} onScroll={this.props.onScroll}>
                                    <section className="text-gray-600 body-font px-2">
                                        <Typography className={this.props.theme.light ? "text-dark text-center p-2 py-3" : "text-light text-center p-2 pt-3"} variant="h4" fontWeight={600}>
                                            Explore Our TShirts Collection
                                        </Typography>
                                        <Typography color={this.props.theme.light ? "#000" : "#9ca3a4"} className={"text-start px-24 py-2 pb-3"} fontSize={14} lineHeight={1.4}>
                                            Welcome to Codeswear.com, your one-stop shop for stylish and unique tshirts. Buy T-Shirts at the best price in India. We offer a wide range of tshirts for all interests, including coding tshirts, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {this.state.data.map((key: IProductType, index: number) =>
                                                <Grid item xs={12} sm={6} md={3} key={index}>
                                                    <Link href={{
                                                        pathname: `product/${key.type}`
                                                    }} replace={false}>
                                                        <ProductCard image_front={`shirts/${key.type}/${key.image_front}`} name={key.name} variant={key.variant} id={index} description={key.description} variations={key.variant}
                                                            available_shades={key?.available_shades || ""} image_back={`/shirts/${key.type}/${key.image_back}`} label={key.name} category="Tshirt" price={10} priceoriginal={10} />
                                                    </Link>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
    componentDidMount(): void {
        this.getData();
        // this.props
        // console.log("Inside the mounting phase of the component", this.props,"State for the component",this.state);
    }
    componentDidUpdate(previousprops: Readonly<IShirt>, previousstate: Readonly<IShirt | { data: any, loader: boolean }>): void {
        // console.log("update state for the map of the shirts", this.state.data.map((shirt, index) => shirt.name.split(" ").join("/")));
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