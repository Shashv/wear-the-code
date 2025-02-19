import React from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ICustomSession } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
const OrdersList: NextPage<{ pageName: string, sessionStatus: { name: string; email: string }, orders: any[] }> = ({ pageName, sessionStatus, orders }) => {
    // const { name, email } = sessionStatus;
    const session = useSession();
    const router = useRouter();
    console.log("Orders list on the server component function calling", orders);
    React.useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/authentication/login")
    }, [session]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Typography variant="h4">
                            {session.data?.user.name}
                        </Typography>
                        <CommonTable tablebody={[]} tablehead={[]} />
                        <Typography className="text-pink-600" variant="h4"></Typography>
                        {session.data?.user.email}
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
    let ordersList = await OrdersModel.findOne({ userId: userSession?.user.id });;
    // if (typeof window !== undefined) {
    //    console.log("Window found");
    // }
    // else {
    //     ordersList = []
    // }
    console.log("order list", ordersList?.products);
    if (sessionStatus)
        return {
            props: {
                pageName: "OrdersList page",
                sessionStatus: {
                    name: sessionStatus.user.name,
                    email: sessionStatus.user.email
                },
                products: ordersList?.products
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