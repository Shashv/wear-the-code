import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { } from "react-redux";
import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { Backdrop, CircularProgress } from "@mui/material";
// import OrdersModel from "@/modalsmongoose/orders";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import orders from "@/modalsmongoose/orders";
// import Image from "next/image";
import CommonTable from "@/components/commonlist";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
const Orders: React.FC = (props: unknown) => {
    // const cartstate = useSelector((state: IState) => {
    //     return state.productManage;
    // });

    // const buyedProducts = useSelector((state: IState) => state.buyNow);
    let [orderList, setOrderList] = useState<string[] | any[]>([]);
    let [loadOrders, setLoadOrders] = React.useState<boolean>(false);
    let [orderId, setOrderId] = useState<number>();
    let clientSecret = useRef<string>("");
    const [tableData, setTabledata] = useState<{ tableHead: Array<any>, tableBody: Array<any> }>({
        tableHead: [{
            type: 'text',
            title: "title",
            label: "Title"
        }, {
            type: "text",
            title: "img",
            label: "Thumbnail"
        }, {
            type: "text",
            label: "Description",
            title: "desc"
        }],
        tableBody: []
    });
    let theme: { light: boolean; dark: boolean } = useSelector((state: IState) => state.toggletheme);
    const convertOrderList = async (specificOrder: { id: string; quantity: number }) => {
        let specificProduct = await fetch(`/api/orderProducts/${specificOrder.id}`, {
            method: "GET"
        });
        let parsedProductDetail = await specificProduct.json();
        // console.log("Parsed peroduct details", parsedProductDetail);
        return { ...parsedProductDetail.specificProduct, availableQuantity: specificOrder.quantity };
    }
    const formatTableData = (rows: Array<any>) => {
        const formatData = rows.map(row => {
            const { img, title, desc } = row;
            return {
                img,
                title,
                desc
            }
        });
        return formatData;
    }
    const finalPayment: (e: React.MouseEvent<HTMLButtonElement>) => Promise<string> = async e => {
        // console.log("event clicked", e);
        setLoadOrders(true);
        let proceedPayment = await fetch("/api/payment/checkoutSession", {
            method: "POST",
            body: JSON.stringify({ amount: 10000, currency: "usd" })
        });
        let isPaymentProcessed = await proceedPayment.json();
        // console.log("Payment positive",isPaymentProcessed);
        if (isPaymentProcessed.success) {
            setLoadOrders(false);
            clientSecret.current = isPaymentProcessed.client_secret;
            toast.success(`Payment successfull ${clientSecret}`, {
                position: "bottom-center",
                autoClose: 2000,
                theme: "colored"
            });
            return isPaymentProcessed.message
        }
        else {
            toast.error("Oops unable to process payment", {
                position: "bottom-center",
                autoClose: 2000,
            })
            return isPaymentProcessed.message
        }
    }
    const babaji = async () => {
        setLoadOrders(true);
        let deletedOrders = await fetch("/api/orders", {
            method: "DELETE"
        });
        let areOrdersDeleted = await deletedOrders.json();
        setLoadOrders(false);
        if (areOrdersDeleted) toast.info("Orders deleted successfully")
        else toast.error("Unable to delete the orders , please try again");
    }
    // console.log("Client secret", clientSecret)
    useEffect(() => {
        // without api using the redux state cartstate...//
        // Object.keys(cartstate).length > 0 ?
        //     setOrderList(Object.keys(cartstate)) : setOrderList(Object.keys(buyedProducts));
        // ....//
        let id: number = Math.random();
        setOrderId(id);
        setLoadOrders(true);
        fetch(`/api/orders?user_id=${localStorage.getItem("user_id")}`, {
            method: "GET",
        }).then(response => response.json()).then(response => {
            const promises = Promise.all(response.orders ? response.orders.products.map(async (product: { id: string; quantity: number }) => {
                return await convertOrderList(product);
            }) : []);
            //check promises final//
            // console.log("Promises final", promises);
            // ....//
            return promises;
        }).then(finalList => {
            // check final list console.//
            // console.log("Final List", finalList);
            // ....//
            setLoadOrders(false);
            setTabledata({ ...tableData, tableBody: formatTableData(finalList) });
            setOrderList(finalList);
        }).catch(er => console.log(er));
    }, []);
    return (
        <>
            <Head>
                <title>
                    CodeSwear - Your Orders Our Fun
                </title>
                <link rel={"icon"} href="/logo.webp" />
            </Head>
            <LoadingBar height={3} color="magenta" />
            <div className={theme.light ? style.orderscontainer : style.darkorderscontainer}>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container py-28">
                        {loadOrders ? <Backdrop open>
                            <Typography variant="h4" className="text-pink-500">LOADING ORDERS!</Typography><CircularProgress color="primary" />
                        </Backdrop> :
                            <>
                                {/* babaji */}
                                <>
                                    {
                                        orderList.length > 0 &&
                                        <div className="order-container">
                                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                                ORDER ID: #{orderId}
                                            </h1>
                                        </div>
                                    }
                                    <div className="container-fluid">
                                        {
                                            orderList && orderList.length > 0 ?
                                                orderList.map((key, index) =>
                                                    <div key={index} className="row border border-muted rounded-2">
                                                        <div className="col-6">
                                                            <h2 className={theme.light ? "text-sm title-font text-gray-500 tracking-widest" : "text-sm title-font text-light tracking-widest"}>
                                                                CODESWEAR.COM
                                                            </h2>
                                                            <p className="leading-relaxed mb-4">
                                                                Your Order has been successfully placed!
                                                            </p>
                                                            <div className="flex mb-4">
                                                                <a className="flex-grow text-center text-pink-500 py-2 text-lg px-1">
                                                                    {key.desc}</a>
                                                                <a className="flex-grow text-center py-2 text-lg px-1">
                                                                    Reviews
                                                                </a>
                                                                <a className="flex-grow text-center py-2 text-lg px-1">
                                                                    Details
                                                                </a>
                                                            </div>
                                                            <div className="flex border-t border-gray-200 py-2">
                                                                <span className="text-gray-500">Color</span>
                                                                <span className="ml-auto text-gray-900">{key.color ? key.color : "Blue"}</span>
                                                            </div>
                                                            <div className="flex border-t border-gray-200 py-2">
                                                                <span className="text-gray-500">Size</span>
                                                                <span className="ml-auto text-gray-900">{key.size ? key.size : "Medium"}</span>
                                                            </div>
                                                            <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                                                <span className="text-gray-500">Quantity</span>
                                                                <span className="ml-auto text-gray-900">{key.availableQuantity ? key.availableQuantity : 4}</span>
                                                            </div>
                                                            <div className="flex">
                                                                <span className="title-font font-medium text-2xl text-gray-900">
                                                                    Subtotal: $58.00
                                                                </span>
                                                            </div>
                                                            <div className="my-6 flex justify-start">
                                                                <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-2 text-light">Track Order</button>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={key.img} />
                                                        </div>
                                                    </div>) :
                                                <>
                                                    <div className="no-orders-placed">
                                                        <Typography className="" fontStyle={"italic"} variant="h2" color={"magenta"}>
                                                            Oops, no orders plcaed , visit out products pages please!
                                                        </Typography>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </>
                                {/* using the material ui box */}
                                {/* <>
                                    <Box component={"div"} display={"flex"} flexDirection={"column"} gap={2} justifyContent={"start"} alignItems={"start"} color={theme.light ? "#000" : "#fff"}>
                                        {orderList && orderList.map((order, index) => {
                                            return <div className="order-item flex align-center gap-2 justify-center">
                                                <Typography key={index} variant="h4">
                                                    {order.title}
                                                </Typography>
                                                <Image alt="your_order" className="rounded-2" src={order.img} width={50} height={50} />
                                            </div>
                                        })}
                                    </Box>
                                    {
                                        Object.keys(cartstate).length > 0 && Object.keys(buyedProducts).length > 0 || orderList.length === 0 && <Typography className="" variant="h2" color={"magenta"}>
                                            Oops, no orders plcaed , visit out products pages please!
                                        </Typography>
                                    }
                                </> */}
                                {/*.... material-ui.... */}
                            </>
                        }
                    </div>
                    <div className="order-tabular-list">
                        <CommonTable tablebody={tableData.tableBody ? tableData.tableBody : []} tablehead={tableData.tableHead ? tableData.tableHead : []} theme={theme} />
                    </div>
                    <div className="final-payment">
                        <Button className="" onClick={finalPayment} variant="contained" color={"primary"}>
                            Final Payment
                        </Button>
                        <Button className="delete-orders" onClick={e => babaji()}>
                            Delete Orders
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Orders;
// baba ji this function will always run on the server side..//
export const getServerSideProps: GetServerSideProps | ((context: GetServerSidePropsContext) => Promise<any>) = async positive => {
    const session = await getServerSession(positive.req, positive.res, authorizeOptions);
    // let orders = await OrdersModel.find({});
    // console.log("Orders list", orders);
    if (session)
        return {
            props: {
                pageName: "Orders Page",
                // orders
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