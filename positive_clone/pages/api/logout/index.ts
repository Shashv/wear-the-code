import { NextApiRequest, NextApiResponse } from "next";
const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200);
    return res.json({message:"Logout successfully"});
}
export default logout;