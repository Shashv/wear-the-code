import React from "react";
import CommonTable from "@/components/commonlist";
import { ICustomSession } from "@/modals";
import { useEffect } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getServerSession } from "next-auth";
import authorizeOptions from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { IState } from "@/redux/sore";
const MyAccount: NextPage<{ accountDetails: { name: string; email: string } }> = ({ accountDetails: { name, email } }) => {
    const { status } = useSession();
    const routerActions = useRouter();
    const themeState = useSelector((state: IState) => state.toggletheme);
    useEffect(() => {
        if (status === "unauthenticated") routerActions.replace("/authentication/login");
    }, [status, routerActions])
    return (
        <>
            <div className={`container-fluid h-[100vh] ${themeState.dark ? 'bg-dark' : 'bg-light'}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="accoubnt-details-fields">
                            <Typography variant="h5" color={"salmon"}>Account Holder - {name}</Typography>
                            <Typography variant="h5" color={"skyblue"}>Account Holder Email - {email}</Typography>
                        </div>
                        <div className="">
                            <CommonTable tablebody={[]} tablehead={[]} />
                        </div>
                    </div>
                    <div className="col-12">

                    </div>
                </div>
            </div>
        </>
    )
}
export default MyAccount;
//below will run on the server side...//
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const sessionserver = await getServerSession(context.req, context.res, authorizeOptions) as ICustomSession | null;
    // console.log("Session account", sessionserver);
    if (sessionserver) {
        return {
            props: {
                accountDetails: {
                    name: sessionserver.user.name,
                    email: sessionserver.user.email
                }
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