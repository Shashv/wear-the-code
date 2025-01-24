import { NextApiRequest, NextApiResponse } from "next";
import PaytmChecksum from "paytmchecksum";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const checkSumhash = JSON.parse(req.body)["CHECKSUMHASH"];
    if (checkSumhash) {
        const varifiedSIgnature = PaytmChecksum.verifySignature(JSON.parse(req.body), "", checkSumhash);

    }
}
export default handler;