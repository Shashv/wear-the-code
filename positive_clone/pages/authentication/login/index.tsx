import React from "react";
import Login from "./Login"
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import authorizeOptions from "@/pages/api/auth/[...nextauth]";
const LoginF: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          Codeswear - Login to continue
        </title>
      </Head>
      <Login />
    </>
  )
}
export default LoginF;
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const isPositive = await getServerSession(context.req, context.res, authorizeOptions);
  
  if (isPositive) {
    return {
      redirect: {
        basePath: false,
        destination: "/",
        permanent: false
      }
    }
  }
  else {
    return {
      props: {

      }
    }
  }
}
