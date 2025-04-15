"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
const GooglePay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const stripeIntent = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_POSITIVEKEY || "");
    const clientSecret: string = ""
    useEffect(() => {
        return () => {

        }
    }, []);
    return (
        <>
            {/* will be using the tomorrow */}
            {/* <Elements stripe={stripeIntent} options={{ clientSecret }}>

            </Elements> */}
        </>
    )
}
export default GooglePay;