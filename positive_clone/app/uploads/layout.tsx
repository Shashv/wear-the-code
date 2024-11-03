import { Metadata } from "next";
import React from "react";
const UploadLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </>
    )
}
export default UploadLayout;
export const metadata: Metadata = {
    title: "Uploads for the layout",
    description: 'Uploads should be done with the description'
}
