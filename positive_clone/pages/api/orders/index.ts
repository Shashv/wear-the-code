import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
const orders = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET")
        return res.status(200).json([]);
    else if (req.method === "POST") {
        res.status(201).send("Order placed successfully");
    }
}
export default orders;