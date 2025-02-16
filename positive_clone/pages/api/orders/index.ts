import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
import connectDatabase from "@/configuration";
const orders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, product, quantity, price, variant, size } = JSON.parse(req.body);
        console.log('body process', JSON.parse(req.body));
        if (req.method === "GET")
            return res.status(404).send("Method not allowed");
        else if (req.method === "POST") {
            // const createOrder = await OrdersModel.create({});
            return res.status(201).json({ message: "Orders placed successfully" });
        }
    }
    catch (er) {
        console.log("Error", er);
        res.status(500).send("Oops something went wrong");
    }
}
// ...call the database mongoose connection explicitly , using mongooose.connect..//
// export default orders;
export default connectDatabase(orders);