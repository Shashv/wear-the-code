import React from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ICustomSession } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
const OrdersList: NextPage<{ pageName: string, sessionStatus: ICustomSession, ordersList: any }> = ({ pageName, sessionStatus, ordersList }) => {
    const { user } = sessionStatus;
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {user.name}
                        <CommonTable tablebody={[]} tablehead={[]} />
                        {user.email}
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrdersList;
// babaji this function will run on the server side...///
export const getServversideprops: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionStatus = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    const ordersList = await OrdersModel.find({});
    // console.log("order list", ordersList);
    if (sessionStatus)
        return {
            props: {
                pageName: "OrdersList page",
                sessionStatus: {
                    name: sessionStatus.user.name,
                    email: sessionStatus.user.email
                },
                ordersList
            }
        }
    else return {
        redirect: {
            basePath: false,
            destination: "/authentication/login",
            permanent: false
        }
    }
}