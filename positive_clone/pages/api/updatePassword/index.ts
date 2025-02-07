import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "@/configuration";
import UserModel from "@/modalsmongoose/user";
import bycryptjs from "bcryptjs";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log('Babaji');
        const { email, password, confirmPassword } = JSON.parse(req.body);

        if (password !== confirmPassword) res.status(400).json({ message: "Password and confirmPassword are not equal" })
        else {
            const genSalt = await bycryptjs.genSalt(10);
            const hashedPaswword = await bycryptjs.hash(password, genSalt);
            const updatedUser = await UserModel.findOneAndUpdate({ email: email }, { password: hashedPaswword });
            console.log("adfljv", updatedUser);
            updatedUser &&
                res.status(200).json({ message: "Password updated successfully" });
        }
    }
    catch (er) {
        console.log("Mahadev");
        res.status(500).send("Oops something went wrong")
    }
}
export default connectDatabase(handler);