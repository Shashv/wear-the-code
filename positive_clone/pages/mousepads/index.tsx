import React from "react";
import Head from 'next/head';
import { useSelector } from "react-redux";
import { IState } from "../redux/sore";
import { useState, useEffect } from "react";
const MousePads: React.FC<unknown> = (props) => {
    console.log("Proos for the process of the rendering ", props);
    const theme = useSelector((state: IState) => state.toggletheme);
    return (
        <>
            <Head>
                <title>Positive MousePads</title>
                <link rel="icon" href="/logo.webp" />
            </Head>
            <body>
                <div className={theme.light ? "p-2 bg-light" : "p-2 bg-dark"}>

                </div>
            </body>
        </>
    )
}
export default MousePads;
export const getServerSideProps = async (context: any) => {
    return {
        props: {
            pageType: "Page for the mousepads"
        }
    }
}