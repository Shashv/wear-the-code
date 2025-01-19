import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/modalsmongoose/user";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let signedToken: string = "";
    const body = JSON.parse(req.body);
    console.log(body);
    const response = await UserModel.find({ email: body.email }).lean();
    return res.status(200).json({ message: "Loginned Successfully" ,signedToken});

}
export default handler;