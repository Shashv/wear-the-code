import { NextApiRequest, NextApiResponse } from "next";
import EmailComponent from "@/utils/emailTemplate";
import mynodemailer from "nodemailer";
import { render } from "@react-email/components";
const resetPassword = async (request: NextApiRequest, response: NextApiResponse) => {
    //when we will be able to create the app specific password for the gmail account//
    let emailSender = mynodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: "shashvatgupta19@gmail.com",
            pass: "mkkg uoqi dfui sbxr"
        },
        service: "gmail"
    });
    const customMailOptions = {
        from: "shashvatgupta19@gmail.com",
        to: "sunny.webframez@gmail.com",
        subject: "Custom Subject for the testing of the email",
        text: "This is the testing email for the reset password",
    }
    let email = await emailSender.sendMail(customMailOptions);
    response.status(200);
    response.json({ message: "Email sent successfully" });
}
export default resetPassword;