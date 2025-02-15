import { NextApiRequest, NextApiResponse } from "next";
// import PaytmChecksum from "paytmchecksum"; 
// import Stripe from "stripe";
import connectDatabase from "@/configuration";
const InitTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
    // const response = await PaytmChecksum.verifySignature("");
    res.send("Response from api");
}
// export default InitTransaction;
export default connectDatabase(InitTransaction);