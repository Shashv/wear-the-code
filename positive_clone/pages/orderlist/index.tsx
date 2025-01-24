import React from "react";
import CommonTable from "@/components/commonlist";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
const OrdersList: NextPage<{ pageName: string }> = ({ pageName }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <CommonTable tablebody={[]} tablehead={[]} />
                    </div> 
                </div>
            </div>
        </>
    )
}
export default OrdersList;
export const getServversideprops: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionStatus = getServerSession(context.req, context.res, authorizeOptions);
    return {
        props: {
            pageName: "OrdersList page"
        }
    }
}