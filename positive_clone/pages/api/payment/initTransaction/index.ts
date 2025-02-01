import { NextApiRequest, NextApiResponse } from "next";
import PaytmChecksum from "paytmchecksum";
const InitTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
    // const response = await PaytmChecksum.verifySignature("");
    res.send("Response from api");
}
export default InitTransaction;