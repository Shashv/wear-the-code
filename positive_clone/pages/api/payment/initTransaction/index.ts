import { NextApiRequest, NextApiResponse } from "next";
// import PaytmChecksum from "paytmchecksum"; 
import Stripe from "stripe";
import connectDatabase from "@/configuration";
import PaytmChecksum from "paytmchecksum";
const InitTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { amount, orderId, customerId } = JSON.parse(req.body);
        const paytmParams = {
            mid: process.env.NEXT_PUBLIC_PAYTM_MID || "",
            // WEBSITE: process.env.PAYTM_WEBSITE,
            INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
            CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
            ORDER_ID: orderId,
            CUST_ID: customerId,
            TXN_AMOUNT: amount,
            CALLBACK_URL: process.env.PAYTM_CALLBACK_URL,
            orderId: "",
            websiteName: "",
            txnAmount: "",
            userInfo: "",
            requestType: ""
        };
        const response = await PaytmChecksum.generateSignature(paytmParams, "");
        return res.status(200).json({ message: { ...paytmParams, CHECKSUMHASH: response } })
    }
    catch (er) {
        return res.status(500).json({ message: "Oops payment not processes" });
    }
    // res.send("Response from api");
}
//handler function...//
// export default InitTransaction;
export default connectDatabase(InitTransaction);
