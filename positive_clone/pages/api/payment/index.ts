import { NextApiRequest, NextApiResponse } from "next";
import Paytmchecksum from "paytmchecksum";
const handlerpayment = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        return res.status(200).send("Payment send")
    }
    else {
        return res.status(200).send("Payment processes");
    }

}
export default handlerpayment;