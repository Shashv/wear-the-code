import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
import connectDatabase from "@/configuration";
const orders = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET")
        return res.status(200).json([]);
    else if (req.method === "POST") {
        return res.status(201).send("Order placed successfully");
    }
}
// ...call the database mongoose connection explicitly , using mongooose.connect..//
export default orders;
// export default connectDatabase(orders);