import React from "react";
import { ILayout } from "@/modals";
import { Metadata, Viewport } from "next";
import 'bootstrap/dist/css/bootstrap.css';
import Script from "next/script";
const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <>
            <html lang="en">
                <body className="bg-light">
                    {children}
                </body>
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