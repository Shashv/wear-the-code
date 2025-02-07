import { NextApiRequest, NextApiResponse } from "next";
// import EmailComponent from "@/utils/emailTemplate";
import mynodemailer from "nodemailer";
// import { render } from "@react-email/components";
import connectDatabase from "@/configuration";
import UserModel from "@/modalsmongoose/user";
const resetPassword = async (request: NextApiRequest, response: NextApiResponse) => {
    const findedUser = await UserModel.findOne({ email: JSON.parse(request.body) });
    try {
        // if (!findedUser) {
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
                to: `${request.body}`,
                subject: "Custom Subject for the testing of the email",
                // for custom text//
                // text: "This is the testing email for the reset password",

                html: `<p>Please positive reset your password by clicking the below link</p>
                        <a href="http://localhost:3000/authentication/resetPassword?email=${JSON.parse(request.body)}">Reset your password</a>
                    <p>Hope this email finds you well!</p>`
            }
            await emailSender.sendMail(customMailOptions);
            response.status(200);
            // response.json({ message: "Email sent successfully" });
            response.json({ message: "Password reset link has been sent to the provided email" });
        // }
    }
    catch (er) {
        response.status(500).send("Oops something went wrong");
    }
}
// export default resetPassword;
export default connectDatabase(resetPassword)