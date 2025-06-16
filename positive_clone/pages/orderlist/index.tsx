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

import styles from "./index.module.css";
import Image from "next/image";
const OrdersList: NextPage<{ pageName: string, sessionStatus?: { name: string; email: string }, products: any[] ,orderPositive:Array<any>}> = ({ pageName, sessionStatus, products ,orderPositive}) => {
    
    const session = useSession();
    const router = useRouter();
    var themeState = useSelector((state: IState) => state.toggletheme);
   
    let [tableData, setTabledata] = useState<{ tableHead: Array<any>, tableBody: Array<any> }>({
        tableHead: [{
            type: "text",
            label: "Name",
            title: "_id"
        }, 
        {
            type: "text",
            label: "Quantity",
            title: "quantity"
        },{
            type:"text",
            label:"Order Id",
            title:"orderId"
        },{
            type:"text",
            label:"Order Status",
            title:"orderStatus"
        },{
            type:"link",
            label:"Order Details",
            title:"orders"
        }],
        tableBody: []
    });
    React.useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/authentication/login");
        setTabledata({ ...tableData, tableBody: orderPositive });
    }, [session,products]);
   
    const userDetails = {
        name: session?.data?.user.name,
        email: session?.data?.user.email,
        profile: session?.data?.user.image
    }
    
    return (
        <>
            <div className={themeState.dark ? `min-h-screen container-fluid ${styles.orderlistcontainerdark}`:`container-fluid min-h-screen ${styles.orderlistcontainer}`}>
                <div className="row">
                    <div className="col-12 table-container" style={{ backgroundColor: themeState.dark ? "#000" : "#fff" }}>
                        {Object.keys(userDetails).map(user => user === "profile" ? <Image width={100} height={100} className="rounded-circle w-[100px] h-[100px]" src={`/uploads/${userDetails["profile"]}`} alt="profile_pic" /> : <Typography key={user} variant="h4">
                            {user === "email" ? session.data?.user.email : user === "name" ? session.data?.user.name : null}
                            {}
                        </Typography>)}
                        <CommonTable tablebody={tableData.tableBody ? tableData.tableBody : []} tablehead={tableData.tableHead ? tableData.tableHead : []} />
                        <Typography className="text-pink-600" variant="h4"></Typography>
                      
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrdersList;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionStatus = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    const userSession = await getSession({ req: context.req });
  
    let ordersList = await OrdersModel.find({ email: userSession?.user.email || "" });
   
    let products: Array<any> = [];
   
    if (sessionStatus) {
        return {
            props: {
                pageName: "OrdersList page",
                sessionStatus: {
                    name: sessionStatus.user.name,
                    email: sessionStatus.user.email
                },
               
                orderPositive:JSON.parse(JSON.stringify(ordersList))
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
