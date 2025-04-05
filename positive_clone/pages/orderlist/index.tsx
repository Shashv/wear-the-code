import React, { useState } from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ICustomSession } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { IState } from "@/redux/sore";
// import { Button } from "reactstrap";
import styles from "./index.module.css";
import Image from "next/image";
const OrdersList: NextPage<{ pageName: string, sessionStatus?: { name: string; email: string }, products: any[] }> = ({ pageName, sessionStatus, products }) => {
    // const { name, email } = sessionStatus;
    const session = useSession();
    const router = useRouter();
    var themeState = useSelector((state: IState) => state.toggletheme);
    // console.log("Orders list on the server component function calling", products);
    let [tableData, setTabledata] = useState<{ tableHead: Array<any>, tableBody: Array<any> }>({
        tableHead: [{
            type: "text",
            label: "Name",
            title: "id"
        }, {
            type: "text",
            label: "Quantity",
            title: "quantity"
        }],
        tableBody: []
    });
    React.useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/authentication/login");
        setTabledata({ ...tableData, tableBody: products });
    }, [session,products]);
    // React.useEffect(() => {
    //     setTabledata({ ...tableData, tableBody: products });
    // }, [products]);
    const userDetails = {
        name: session?.data?.user.name,
        email: session?.data?.user.email,
        profile: session?.data?.user.image
    }
    // const checkSegmentation = (ar: string[], s:co string) => {
    //     const arrayCharacters = Array.from(s);
    //     //    console.log("Array characters",arrayCharacters);
    //     arrayCharacters.forEach(letter => {
    //         ar.forEach(word => {

    //         })
    //     })
    // }
    return (
        <>
            <div className={themeState.dark ? `container-fluid ${styles.orderlistcontainerdark}`:`container-fluid ${styles.orderlistcontainer}`}>
                <div className="row">
                    <div className="col-12 table-container" style={{ backgroundColor: themeState.dark ? "#000" : "#fff" }}>
                        {Object.keys(userDetails).map(user => user === "profile" ? <Image width={100} height={100} className="rounded-circle w-[100px] h-[100px]" src={`/uploads/${userDetails["profile"]}`} alt="profile_pic" /> : <Typography key={user} variant="h4">
                            {user === "email" ? session.data?.user.email : user === "name" ? session.data?.user.name : null}
                            {}
                        </Typography>)}
                        <CommonTable tablebody={tableData.tableBody ? tableData.tableBody : []} tablehead={tableData.tableHead ? tableData.tableHead : []} />
                        <Typography className="text-pink-600" variant="h4"></Typography>
                        {/* {session.data?.user.email} */}
                        {/* <Button color="primary" onClick={e => checkSegmentation(["leet", "code"], "leetcode")}>Check</Button> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrdersList;
// babaji this function will run on the server side...///
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionStatus = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    const userSession = await getSession({ req: context.req });
    // console.log("user session",userSession?.user.id);
    let ordersList = await OrdersModel.findOne({ userId: userSession?.user.id || "" });
    // if (typeof window !== undefined) {
    //    console.log("Window found");
    // }
    // else {
    //     ordersList = []
    // }
    // console.log("order list", ordersList);
    let products: Array<any> = [];
    if (ordersList?.products) {
        products = ordersList?.products;
    }
    else {
        products = [];
    }
    if (sessionStatus) {
        return {
            props: {
                pageName: "OrdersList page",
                sessionStatus: {
                    name: sessionStatus.user.name,
                    email: sessionStatus.user.email
                },
                products: products.map(product => {
                    let { _id, id, quantity } = product;
                    return {
                        id,
                        quantity
                    }
                })
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
//server function calling on the  server/...