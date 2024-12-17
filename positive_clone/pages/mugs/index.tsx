import React from "react";
import { Container, Row, Col } from "reactstrap";
import style from "./index.module.css";
import { connect, ConnectedProps } from "react-redux";
import { IState } from "@/redux/sore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ProductModel from "@/modalsmongoose/product";
import FilterBar from "@/components/filtergroup";
import ProductCard from "@/components/productcard";
import { Grid, Typography } from "@mui/material";
import { ToastContext } from "@/hooks/useToast";
interface PTheme {
    theme: {
        light: boolean;
        dark: boolean
    }
}
interface iMugs {
    mugs?: Array<any>
}

class Mugs extends React.Component<any, { name: string; age: number; loader: false }> {
    static contextType?: React.Context<any> | undefined = ToastContext;
    constructor(props: any) {
        super(props);
        this.state = {
            name: "Initial Empty state",
            age: 21,
            loader: false
        }
    }
    toastExecution: any;
    render(): JSX.Element {
        return (
            <>
                <div className={this.props.theme.light ? style.lightcontainer : style.darkcontainer}>
                    <section className="">
                        <div className="container-fluid p-0">
                            <div className="row h-100">
                                <div className={`col-md-2 ${style.mobilecontainermugs}`}>
                                    <FilterBar theme={this.props.theme} />
                                </div>
                                <div className="col-md-10 p-2">
                                    <div className="list-container py-2">
                                        <Typography className={this.props.theme.light ? "text-dark text-center" : "text-light text-center"} fontWeight={600} sx={{ fontSize: { xs: 21, md: 30.5 } }}>
                                            Explore Our Mugs Collection
                                        </Typography>
                                        <Typography color={this.props.theme.light ? "#000" : "#9ca3af"} className={"text-start px-24 py-2 pb-3"} sx={{ fontSize: { sm: 15, md: 14 }, textIndent: { sm: "start" } }} lineHeight={1.2}>
                                            Welcome to Codeswear.com, your one-stop shop for stylish and unique mugs. Buy mugs at the best price in India. We offer a wide range of tshirts for all interests, including coding mugs, anime tshirts, and casual tshirts for everyday wear. All of our tshirts are made with high-quality materials and are designed to be comfortable and durable. Shop now and find the perfect tshirt for you!
                                        </Typography>
                                        <Grid container columnGap={1.4} rowGap={1.4} justifyContent={"center"}>
                                            {Object.keys(this.props.mugsSchema).length > 0 ? Object.keys(this.props.mugsSchema).map((mugs: string, index: number) => <Grid item xs={8.9} sm={5.9} md={2.2}><ProductCard title={this.props.mugsSchema[mugs].title} colors={this.props.mugsSchema[mugs].color} sizes={this.props.mugsSchema[mugs].size} desc={this.props.mugsSchema[mugs].desc} img={this.props.mugsSchema[mugs].img} /></Grid>) : <Grid xs={12} item><Typography color={this.props.theme.light ? "#000" : "#fff"}>
                                                No Mugs Available</Typography></Grid>}
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        )
    }
    componentDidMount(): void {
        this.toastExecution = this.context;
        this.toastExecution("Mugs Fetched Successfully", "success");
    }
    componentWillUnmount(): void {

    }
    componentDidUpdate(previousProps: Readonly<{}>, previousState: Readonly<{}>): void {

    }
    componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>): void {

    }
}

const mapStateToProps = (state: IState): any => {
    let { toggletheme } = state;
    return {
        theme: toggletheme
    }
}

const partialConnector = connect(mapStateToProps);

export default partialConnector(Mugs);
type IProps = ConnectedProps<typeof partialConnector> & iMugs;
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let fetchedMugs: Array<any> = await ProductModel.find({ category: "mugs" }).lean();
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
    return {
        props: {
            mugs: modifiedResponse,
            mugsSchema
        }
    }

}

