import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import { } from "react-redux";
import Head from "next/head";
import { Typography } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import { Backdrop, CircularProgress } from "@mui/material";

import { toast } from "react-toastify";

import useSearchParamsstate from "@/hooks/useSearchParams";
import dynamic from "next/dynamic";
const Orders: React.FC = (props: unknown) => {

    let [orderList, setOrderList] = useState<string[] | any[]>([]);
    let [loadOrders, setLoadOrders] = React.useState<boolean>(false);
    let [orderId, setOrderId] = useState<number>();

    const routerInsatnce = useSearchParamsstate();

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

    useEffect(() => {

        setLoadOrders(true);
        fetch(`/api/orders?orderId=${routerInsatnce.query.orderId}`, {
            method: "GET",
        }).then(response => response.json()).then(response => {
            toast.success(response.orders.orderStatus === "completed" ? `Orders placed successfully` : `Orders are prending , please complete you respective orders payment`, {
                autoClose: 2000,
                theme: theme.light ? "light" : "dark",
                closeButton: true
            })
            setOrderId(response.orders.orderStatus);
            const promises = Promise.all(response.orders ? response.orders.products.map(async (product: { id: string; quantity: number }) => {
                return await convertOrderList(product);
            }) : []);

            return promises;
        }).then(finalList => {

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
                    <div className="container py-28 min-h-screen">
                        {loadOrders ? <Backdrop open>
                            <Typography variant="h4" className="text-pink-500">LOADING ORDERS!</Typography><CircularProgress color="primary" />
                        </Backdrop> :
                            <>

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

                            </>
                        }
                    </div>

                </section>
            </div>
        </>
    )
}
Orders.displayName = "Orders"
export default dynamic(() => Promise.resolve(Orders), {
    ssr: false
});

