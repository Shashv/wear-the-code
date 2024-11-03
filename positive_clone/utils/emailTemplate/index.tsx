import nodemailer from "nodemailer";
import React from "react";
import { Html, Button } from "@react-email/components";
const EmailComponent: React.FC = () => {
    return (
        <Html lang={"en"}>
            <Button>
                Back to the home page
            </Button>
        </Html>
    )
}
export default EmailComponent;