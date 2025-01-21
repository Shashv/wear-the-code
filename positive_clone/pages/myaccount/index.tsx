import React from "react";
import CommonTable from "@/components/commonlist";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
const MyAccount = () => {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        session.status === "unauthenticated" ? router.push("/") : null
    }, []);
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
const getServerSideProps = async (context: GetServerSidePropsContext) => {

}