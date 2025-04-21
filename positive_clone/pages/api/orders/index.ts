import { NextApiRequest, NextApiResponse } from "next";
import OrdersModel from "@/modalsmongoose/orders";
import connectDatabase from "@/configuration";
// all the consoles will be required later...//
const orders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { orderId } = req.query;
        if (req.method === "GET") {
            // console.log("query",req.query);
            const orders = await OrdersModel.findOne({ orderId: orderId });
            // console.log("Babaji", orders);
            return res.status(200).json({ orders })
        }
        else if (req.method === "DELETE") {
            let deleteAllOrders = await OrdersModel.deleteMany({});
            if (deleteAllOrders) return res.status(200).json({ message: "Deleted all records" });
        }
        // this will be used later...//
        // return res.status(404).send("Method not allowed");
        // ...////
        else if (req.method === "POST") {
            let parsedBody = JSON.parse(req.body);
            // console.log('body positive', JSON.parse(req.body));
            let babaji = await OrdersModel.findOne({ userId: parsedBody.userId });
            // if (babaji) {
            //     // console.log("Already existing order",babaji);
            //     let updateOrder = await OrdersModel.findByIdAndUpdate({ _id: babaji._id }, {
            //         userId: parsedBody.userId,
            //         email: parsedBody.email,
            //         orderId: babaji.orderId,
            //         products: Object.keys(parsedBody.buyProduct ? parsedBody.buyProduct : {}).map(key => {
            //             return {
            //                 id: parsedBody.buyProduct[key].slug || "",
            //                 quantity: parsedBody.buyProduct[key].quantity || 1
            //             }
            //         }),
            //         address: "Nabha",
            //         totalAmount: Object.keys(parsedBody.buyProduct ? parsedBody.buyProduct : {}).map(key => parsedBody.buyProduct[key].quantity || 1).reduce((previousValue: number, currentValue: number, index: number) => {
            //             return (previousValue + currentValue) * (index + 1);
            //         }),
            //         orderStatus: "completed"
            //     });
            //     if (updateOrder) {
            //         res.status(200).json({})
            //     }
            // }
            // else {
            const oid: unknown = Math.floor(Math.random() * Date.now());
            const createOrder = await OrdersModel.create({
                userId: parsedBody.userId || "",
                email: parsedBody.email || "",
                orderId: oid || "",
                products: Object.keys(parsedBody.buyProduct ? parsedBody.buyProduct : {}).map(key => {
                    return {
                        id: parsedBody.buyProduct[key].slug || "",
                        quantity: parsedBody.buyProduct[key].quantity || 1
                    }
                }),
                address: "Nabha",
                totalAmount: Object.keys(parsedBody.buyProduct ? parsedBody.buyProduct : {}).map(key => parsedBody.buyProduct[key].quantity || 1).reduce((previousValue: number, currentValue: number, index: number) => {
                    return previousValue + currentValue;
                }),
                orderStatus: "pending"
            });
            if (createOrder) {
                // console.log("Created order", createOrder);
                return res.status(201).json({ message: "Orders placed successfully", orderDetails: { orderId: createOrder.orderId, babajistatus: createOrder.orderStatus } });
            }
            else res.status(500).json({ message: "Something went wrong in order placement" })
            // }
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