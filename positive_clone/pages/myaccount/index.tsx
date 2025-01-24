import React from "react";
import CommonTable from "@/components/commonlist";
import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
const MyAccount = () => {
    // const router = useRouter();
    // const session = useSession();
    // useEffect(() => {
    //     session.status === "unauthenticated" ? router.push("/") : null
    // }, []);
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
export default MyAccount;
export const getServersideprops = async (context: GetServerSidePropsContext) => {
    const sessionserver = getServerSession(context.req, context.res, authorizeOptions);
    console.log("Session server", sessionserver);
}