import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({ message: "Logout successfully" });
}
export default logout;
// export default connectDatabase(logout);