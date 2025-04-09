import React from "react";
import Head from "next/head";
import ContextWrapper from "@/utils/hooks/ContextWrapper";
import { Provider } from "react-redux";
import Footer from "@/components/footer";
import { NextRouter, useRouter } from "next/router";
import "./styles.css";
// import { IPositive } from "@/modals";
import store, { IDispatch, IState } from "@/redux/sore";
// import { useDispatch, useSelector } from "react-redux";
// import addProduct from "@/redux/actions/addProduct";
// import removeProduct from "@/redux/actions/removeProduct";
import { useEffect, useRef } from "react";
import StyledBar from "@/components/customBar";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
// import { headers } from "next/headers";
// import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
// import jsonwebtoken from "jsonwebtoken";
import 'react-toastify/dist/ReactToastify.css';
import { LoadingBarContainer } from "react-top-loading-bar";
import { GetServerSideProps, NextPage } from "next";
import AosInitialize from "@/utils/aos";
import 'aos/dist/aos.css';
import Router from "next/router";
import aos from "aos";
import { Backdrop } from "@mui/material";
import LoaderAnimate from "@/components/loader";
import { getServerSession } from "next-auth";
import authorizeOptions from "./api/auth/[...nextauth]";
const Layout: NextPage<AppProps> = ({ Component, pageProps }) => {
    const routerDetail: NextRouter = useRouter();
    let ref = useRef<HTMLDivElement>(null);
    const [loader, setLoader] = React.useState<boolean>(false);
    let path: string = routerDetail.asPath.split("?")[0];
    let [filterStatus, setFilterStatus] = React.useState<boolean>(false);
    const { session, ...pageparams } = pageProps;
    const toggleFilter = (status: boolean) => {
        setFilterStatus(!status);
    }
    useEffect(() => {
        aos.init();
        Router.events.on("routeChangeStart", e => {
            setLoader(true);
        });
        Router.events.on("routeChangeComplete", e => setLoader(false));
    }, [routerDetail]);
    return (
        <GoogleOAuthProvider clientId="803758111092-tusltrjau3p58fdue2k96a6rkm0nasik.apps.googleusercontent.com">
            <div ref={ref} className="parent">
                <Head>
                    {/* For the bootsrap icons and material */}
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin={"anonymous"} />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"></link>
                    {/* MATERIAL ICONS */}
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"></link>
                    {/* for the aos which is used for the js bases animations of the css */}
                    <link rel="icon" href="/codeswearcircle.png" />
                    <meta name="title" content="Codeswear - Wear the Code" charSet="utf-8"></meta>
                    <meta name="description" content="Codeswear - Wear the Code" charSet={"utf-8"}></meta>
                    <title>Codeswear - Wear the Code</title>
                </Head>
                <Provider store={store}>
                    <SessionProvider session={session}>
                        <AosInitialize>
                            <LoadingBarContainer>
                                {!path.includes("/auth") &&
                                    <StyledBar scrollTop={0} />
                                }
                                <ContextWrapper.Provider value={toggleFilter}>
                                    {/* sx={{ backgroundColor: "#eb4798" }} */}
                                    {loader ?
                                        // <Backdrop open >
                                        <div className="flex bg-pink-300 backdrop-blur-lg justify-center align-center h-[100vh]">
                                            <LoaderAnimate />
                                        </div>
                                        // </Backdrop> 
                                        :
                                        <div className={"route-component"} style={{ height: !path.includes("/auth") ? "600px" : "100vh", overflowY: filterStatus ? "hidden" : "scroll", overflowX: "hidden" }}>
                                            <Component  {...pageparams} />
                                        </div>
                                    }
                                </ContextWrapper.Provider>
                                {!path.includes("/auth") && <Footer />}
                                <ToastContainer />
                            </LoadingBarContainer>
                        </AosInitialize>
                    </SessionProvider>
                </Provider>
            </div>
        </GoogleOAuthProvider>
    )
}
export default Layout;
//function will run on server side...//
export const getServerSideProps: GetServerSideProps = async context => {
    const serverSession = await getServerSession(context.req, context.res, authorizeOptions);
    // console.log("ServerSession", serverSession);
    if (serverSession) {
        return {
            props: {

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
// function willbe used the query params...//
// export const getInitialProps = async (context: any) => {
//     const session = getSession(context);
//     return {
//         pageProps: {
//             session
//         }
//     }
// }
// ...