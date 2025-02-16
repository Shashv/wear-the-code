import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
import connectDatabase from "@/configuration";
const orders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const { name, product, quantity, price, variant, size } = JSON.parse(req.body);
        if (req.method === "GET") 
            return res.status(404).send("Method not allowed");
        else if (req.method === "POST") {
            let parsedBody = JSON.parse(req.body);
            // console.log('body positive', JSON.parse(req.body));
            const createOrder = await OrdersModel.create({
                userId: parsedBody.userId,
                products: Object.keys(parsedBody.buyProduct).map(key => {
                    return {
                        id: parsedBody.buyProduct[key].name,
                        quantity: parsedBody.buyProduct[key].quantity
                    }
                }),
                address: "Nabha",
                totalAmount: Object.keys(parsedBody.buyProduct).map(key => parsedBody.buyProduct[key].quantity).reduce((previousValue: number, currentValue: number, index: number) => {
                    return previousValue + currentValue;
                }),
                orderStatus: "pending"
            });
            if (createOrder)
                return res.status(201).json({ message: "Orders placed successfully" });
            else res.status(500).json({ message: "Something went wrong in order placement" })
        }
    }
    catch (er) {
        console.log("Error", er);
        res.status(500).json({ message: "Oops something went wrong" });
    }
}
// ...call the database mongoose connection explicitly , using mongooose.connect..//
// export default orders;
export default connectDatabase(orders);