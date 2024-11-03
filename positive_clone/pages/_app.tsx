import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import { NextRouter, useRouter } from "next/router";
import "./styles.css";
import { IPositive } from "@/modals";
import store, { IDispatch, IState } from "./redux/sore";
import { useDispatch, useSelector } from "react-redux";
import addProduct from "./redux/actions/addProduct";
import removeProduct from "./redux/actions/removeProduct";
import { useEffect, useRef } from "react";
import StyledBar from "@/components/customBar";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';
import { headers } from "next/headers";
import { usePathname } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import "aos/dist/aos.css";
const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
    // console.log("props", pageProps);
    const routerDetail: NextRouter = useRouter();
    let ref = useRef<HTMLDivElement>(null);
    // const headers = headers();
    let path: string = routerDetail.asPath.split("?")[0];
    let [scrollBar, setScrollBar] = React.useState<number>(0);
    let [direction, setDirection] = React.useState<string>("");
    let initial: number = ref.current?.scrollTop || 0;
    // let { session } = props;
    const onScroll = (e: any) => {
        // console.log("babaji",ref.current?.scrollTop);
        setScrollBar(ref.current?.scrollTop || 0);
        if (ref.current?.scrollTop !== undefined) {
            if (initial > ref.current?.scrollTop) {
                setDirection("up");
            }
            else {
                setDirection("down");
            }
        }
    };
    // console.log(props);
    let routePath = usePathname();
    // useEffect(() => {
    //     console.log("Use Pathname", routePath);
    //     return () => {
    //         console.log("Always called before the execution of the next effect , in order to clean the effect of the previous execution , and secondly called when the component gets unmount");
    //     }
    // }, []);
    return (
        <GoogleOAuthProvider clientId="803758111092-tusltrjau3p58fdue2k96a6rkm0nasik.apps.googleusercontent.com">
            <SessionProvider>
                <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <div ref={ref} className="parent" style={{ height: "100vh" }} onScroll={onScroll}>
                        <Head>
                            {/* For the bootsrap icons and material */}
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin={"anonymous"} />
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"></link>
                            {/* MATERIAL ICONS */}
                            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                rel="stylesheet"></link>
                            {/* for the aos which is used for the js bases animations of the css */}
                            <link rel="icon" href="/logo.webp" />
                            <meta name="title" content="Codeswear - Wear the Code" charSet="utf-8"></meta>
                            <meta name="description" content="Codeswear - Wear the Code" charSet={"utf-8"}></meta>
                            <title>Codeswear - Wear the Code</title>
                        </Head>
                        <Provider store={store}>
                            {!path.includes("/authentication") &&
                                <StyledBar scrollTop={scrollBar} />
                            }
                            <Component  {...pageProps} />
                            {!path.includes("/authentication") && <Footer />}
                            <ToastContainer />
                        </Provider>
                    </div>
                </SnackbarProvider>
            </SessionProvider>
        </GoogleOAuthProvider>
    )
}
export default Layout;

//next is the best object is the best reuqire for the process of the coding in the required in
//NEXT REQuest is the naTIVE REQuest WEB OBJECT WITH AdditionaL CONVIENEIENCE METHODa aND THE SPECIFIC NEXT functions//
//For the state variable in a specific component , we provide a key to the component , with the help of the key , state can be managed of the component , on resetting the key , entire state of the component , can be reset , but this is not the best approach ,
//For the case of the useState variable , we can set the variable initial state in two ways , firstly with the direct initial value , secondly with the initializer function, which gets called on only first render of the component which is the initial render , on subsequent render of the COMPONENT , the function won't be called , react will ignore the second function