import React from "react";
import { ILayout } from "@/modals";
import { Metadata, Viewport } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import Script from "next/script";
const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <>
            <html lang="en">
                {/* <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                    crossOrigin="anonymous"
                /> */}
                <body className="bg-light">
                    {children}
                </body>
                {/* <Script
                    defer
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
                    crossOrigin="anonymous"
                /> */}
            </html>
        </>
    )
}
export default Layout;
export const metadata: Metadata = {
    title: "Codeswear",
    description: "Wear the Code"
}
export const viewport: Viewport = {
    colorScheme: "light dark",
    themeColor: "blue"
}