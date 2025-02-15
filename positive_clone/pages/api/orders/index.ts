import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
import connectDatabase from "@/configuration";
const orders = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, product, quantity, price, variant, size } = JSON.parse(req.body);
    if (req.method === "GET")
        return res.status(200).json([]);
    else if (req.method === "POST") {
        // const createOrder = await OrdersModel.create({});
        return res.status(201).send("Order placed successfully");
    }
}
// ...call the database mongoose connection explicitly , using mongooose.connect..//
// export default orders;
export default connectDatabase(orders);