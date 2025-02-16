import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    return res.status(200).json({ message: "Logout successfully" });
    }
    catch(er) {
        res.status(500).send("Sonmething went wrong")
    }
}
// export default logout;
export default connectDatabase(logout);