import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import Paytmchecksum from "paytmchecksum";
const handlerpayment = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        return res.status(200).send("Payment send")
    }
    else if (req.method === "GET") {
        return res.status(200).send("Payment processes");
    }

}
// export default handlerpayment;
export default connectDatabase(handlerpayment);