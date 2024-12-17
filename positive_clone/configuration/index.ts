import mongoos from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const connectDatabase = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>) => async (req: NextApiRequest, res: NextApiResponse) => {
    await mongoos.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    return handler(req, res)
}
export default connectDatabase;