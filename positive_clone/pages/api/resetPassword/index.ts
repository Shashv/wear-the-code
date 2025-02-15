import { NextApiRequest, NextApiResponse } from "next";
import EmailComponent from "@/utils/emailTemplate";
import mynodemailer from "nodemailer";
import { render } from "@react-email/components";
import connectDatabase from "@/configuration";
const resetPassword = async (request: NextApiRequest, response: NextApiResponse) => {
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
        to: "shashvatgupta19@gmail.com",
        subject: "Custom Subject for the testing of the email",
        // text: "This is the testing email for the reset password",
        html:`<div>
           <p>Click on the below link to reset your password!</p>
           <a href={'http://localhost:3000/authentication/resetPassword'}>Reset Password</a>
        </div>`
    }
    let email = await emailSender.sendMail(customMailOptions);
    console.log("serverside on email",email);
    response.status(200);
    response.json({ message: "Email sent successfully" });
}
// export default resetPassword;
export default connectDatabase(resetPassword)