import { NextApiRequest, NextApiResponse } from "next";
import PaytmChecksum from "paytmchecksum";
import connectDatabase from "@/configuration";
const InitTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
    // const response = await PaytmChecksum.verifySignature("");
    const config = {
        merchentId: "",
        amountPaid: "",
        tokenizationMethod: "",
        industry_type_id: "",
        CHANNEL_ID: "WEB",
        callBackUrl: ""
    }
    res.status(200).send("Response from api");
}
// export default InitTransaction;
export default connectDatabase(InitTransaction)