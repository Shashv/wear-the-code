import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import Paytmchecksum from "paytmchecksum";
let orderId = Math.random();
const paytmParams = {
    mid: process.env.NEXT_PUBLIC_PAYTM_MID || "",
    // WEBSITE: process.env.PAYTM_WEBSITE,
    INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
    CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
    ORDER_ID: "",
    CUST_ID: "",
    txnAmount: {
       value:"10",
       currency:"In"
    },
    CALLBACK_URL: "http://localhost:3000/api/payment/verifyTransaction",
    orderId: `${orderId}`,
    websiteName: "DEFAULT",
    // txnAmount: "10",
    userInfo: "",
    requestType: "Payment"
};
const handlerpayment = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        const verifySignature = await Paytmchecksum.verifySignature(paytmParams, "", body.CHECKSUMHASH);
        // return verifySignature ? res.status(200).send("Payment send") : res.status
    }
    else if (req.method === "GET") {
        // const paytmCheckSumverification = await Paytmchecksum.verifySignature();
        return res.status(200).send("Payment processes");
    }

}

// export default handlerpayment;
export default connectDatabase(handlerpayment);