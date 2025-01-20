import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
const orders = (req: NextApiRequest, res: NextApiResponse) => {
    // console.log("Orders api request for the process of the request");
    if (req.method === "GET")
        return res.status(200).json([]);
    else if (req.method === "POST") {
        // let orders = new OrdersModel({});
        res.status(201).send("Order placed successfully");
    }
    // res.status(200).send("ORDERS request process code");
}
export default orders;