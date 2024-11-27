import mongoos from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const connectDatabase = (handler: (req: NextApiRequest, res: NextApiResponse) => unknown) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoos.connections[0].readyState) {
        return handler(req, res);
    }
    else {
        console.log("baba ji");
        await mongoos.connect("mongodb://localhost:27017/");
        return handler(req, res)
    }
}
export default connectDatabase;