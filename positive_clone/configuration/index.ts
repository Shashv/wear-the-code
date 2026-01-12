import { connectMongoose } from "@/utils/connectMongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDatabase = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>) => async (req: NextApiRequest, res: NextApiResponse) => {
   
    await connectMongoose();
    return await handler(req, res)
}

export default connectDatabase;