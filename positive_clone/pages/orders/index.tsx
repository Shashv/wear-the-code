import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { } from "react-redux";
import Head from "next/head";
import { Box, Typography } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
// import OrdersModel from "@/modalsmongoose/orders";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import orders from "@/modalsmongoose/orders";
import Image from "next/image";
import CommonTable from "@/components/commonlist";
const Orders: React.FC = (props: unknown) => {

    const cartstate = useSelector((state: IState) => {
        return state.productManage;
    });
    const buyedProducts = useSelector((state: IState) => state.buyNow);
    let [orderList, setOrderList] = useState<string[] | any[]>([]);
    let [orderId, setOrderId] = useState<number>();
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
    const convertOrderList = async (specificOrder: string) => {
        let specificProduct = await fetch(`/api/orderProducts/${specificOrder}`, {
            method: "GET"
        });
        let parsedProductDetail = await specificProduct.json();
        // console.log("Parsed peroduct details", parsedProductDetail);
        return parsedProductDetail.specificProduct;
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
    useEffect(() => {
        // Object.keys(cartstate).length > 0 ?
        //     setOrderList(Object.keys(cartstate)) : setOrderList(Object.keys(buyedProducts));
        let id: number = Math.random();
        setOrderId(id);
        fetch(`/api/orders?user_id=${localStorage.getItem("user_id")}`, {
            method: "GET",
        }).then(response => response.json()).then(response => {
            const promises = Promise.all(response.orders.products.map(async (product: { id: string; quantity: number }) => {
                return await convertOrderList(product.id);
            }));
            // console.log("Promises final", promises);
            return promises;
        }).then(finalList => {
            // console.log("Final List", finalList);
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
                    <div className="container py-28 flex">
                        {/* using the orders list with redux */}
                        {/* <>
                            {
                                Object.keys(cartstate).length > 0 ?
                                    orderList.map(key =>
                                        <div className="row">
                                            <div className="col-6">
                                                <h2 className={theme.light ? "text-sm title-font text-gray-500 tracking-widest" : "text-sm title-font text-light tracking-widest"}>ß
                                                    CODESWEAR.COM
                                                </h2>
                                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                                    ORDER ID: #{orderId}
                                                </h1>
                                                <p className="leading-relaxed mb-4">
                                                    Your Order has been successfully placed!
                                                </p>
                                                <div className="flex mb-4">
                                                    <a className="flex-grow text-center text-pink-500 py-2 text-lg px-1">
                                                        Item Description</a>
                                                    <a className="flex-grow text-center py-2 text-lg px-1">
                                                        Reviews
                                                    </a>
                                                    <a className="flex-grow text-center py-2 text-lg px-1">
                                                        Details
                                                    </a>
                                                </div>
                                                <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">Color</span>
                                                    <span className="ml-auto text-gray-900">Blue</span>
                                                </div>
                                                <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">Size</span>
                                                    <span className="ml-auto text-gray-900">Medium</span>
                                                </div>
                                                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                                                    <span className="text-gray-500">Quantity</span>
                                                    <span className="ml-auto text-gray-900">4</span>
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
                                                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={key} />
                                            </div>
                                        </div>) :
                                    <>
                                    </>
                            }
                        </> */}
                        {/* babaji */}
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
                    </div>
                    <div className="order-tabular-list">
                        <CommonTable tablebody={tableData.tableHead ? tableData.tableHead : []} tablehead={tableData.tableBody ? tableData.tableBody : []} theme={theme} />
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
    console.log("Orders list", orders);
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