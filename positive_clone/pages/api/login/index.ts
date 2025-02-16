import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/modalsmongoose/user";
import connectDatabase from "@/configuration";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let signedToken: string = "";
        const body = JSON.parse(req.body);
        const response = await UserModel.find({ email: body.email }).lean();
        return res.status(200).json({ message: "Loginned Successfully", signedToken });
    }
    catch (er) {
        console.log("Error", er);
        res.status(500).send("Oops something went wrong");
    }
}
// export default handler;
export default connectDatabase(handler);