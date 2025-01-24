import { NextApiRequest, NextApiResponse } from "next";
import PaytmChecksum from "paytmchecksum";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const params = {
            mid: "",
            orderId: "",
            amount: "",
            customerId: "",
            channel: "WEB",
            INDUSTRY_TYPE_ID: "",
            callbackUrl: "https://localhost:3000/api/paytm/verifytransaction"
        }
        const hashedSignature = PaytmChecksum.generateSignature(params, "");
        const transactionParams = { ...params, CHECKSUMHASH: hashedSignature }
        res.status(200).json({ params });
    }
    catch (er) {
        res.status(200).send("Oops something went wrong transaction failed")
    }
}
export default handler;