import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { } from "react-redux";
import Head from "next/head";
import { Typography } from "@mui/material";
const Orders: React.FC = (props: unknown) => {
    const cartstate = useSelector((state: IState) => {
        return state.productManage;
    });
    const buyedProducts = useSelector((state: IState) => state.buyNow);
    let [orderList, setOrderList] = useState<string[]>([]);
    let [orderId, setOrderId] = useState<number>();
    let theme: any = useSelector((state: IState) => state.toggletheme);
    useEffect(() => {
        console.log("cart state", cartstate);
        Object.keys(cartstate).length > 0 ?
            setOrderList(Object.keys(cartstate)) : setOrderList(Object.keys(buyedProducts));
        let id: number = Math.random();
        setOrderId(id);
        fetch("/api/getProducts", {
            method: "GET"
        }).then(response => response.json()).then(response => {
            console.log(response);
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
            <div className={theme.light ? style.orderscontainer : style.darkorderscontainer}>
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container py-28">
                        {
                            Object.keys(cartstate).length > 0 ?
                                orderList.map(key =>
                                    <div className="row">
                                        <div className="col-6">
                                            <h2 className={theme.light ? "text-sm title-font text-gray-500 tracking-widest" : "text-sm title-font text-light tracking-widest"}>
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
                        {Object.keys(cartstate).length > 0 && Object.keys(buyedProducts).length > 0 &&
                            <Typography className="" variant="h2" color={"magenta"}>
                                Oops, no orders plcaed , visit out products pages please!
                            </Typography>
                        }
                    </div>
                </section>
            </div>
        </>
    )
}
export default Orders;
export const getServerSideProps: (context: unknown) => Promise<{ props: any }> = async (positive) => {
    return {
        props: {
            pageName: "Orders Page"
        }
    }
}