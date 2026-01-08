// import mongoos from "mongoose";
import { connectMongoose } from "@/utils/connectMongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDatabase = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) => async (req: NextApiRequest, res: NextApiResponse) => {
    // await mongoos.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await connectMongoose();
    return await handler(req, res)
}

export default connectDatabase;