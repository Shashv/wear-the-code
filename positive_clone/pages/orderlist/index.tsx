import React from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ICustomSession } from "@/modals";
import OrdersModel from "@/modalsmongoose/orders";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const OrdersList: NextPage<{ pageName: string, sessionStatus: { name: string; email: string }, ordersList: any[] }> = ({ pageName, sessionStatus, ordersList }) => {
    // const { name, email } = sessionStatus;
    const session = useSession();
    const router = useRouter();
    // console.log("Orders list", ordersList,"positive",session);
    React.useEffect(() => {
        if (session.status === "unauthenticated") router.replace("/authentication/login")
    }, [session]);
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {session.data?.user.name}
                        <CommonTable tablebody={[]} tablehead={[]} />
                        {session.data?.user.email}
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
    let ordersList: any[];
    if (typeof window !== undefined) {
        ordersList = await OrdersModel.find({ userId: localStorage.getItem("user_id") });
    }
    else {
        ordersList = []
    }
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