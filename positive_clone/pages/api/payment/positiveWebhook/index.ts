import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import OrdersModel from "@/modalsmongoose/orders";
const webhookListener: (req: NextApiRequest, res: NextApiResponse) => Promise<any> = async (req, res) => {
    // console.log("Inside the webhook listener process");
    let stripeEvent: Stripe.Event;
    let stripeInstance = new Stripe(process.env.STRIPE_SECRET_POSITIVE || "", {
        apiVersion: "2025-02-24.acacia"
    });
    const positiveRequest = await buffer(req);
    let stripeSignature = req.headers["stripe-signature"] as string;
    try {
        stripeEvent = stripeInstance.webhooks.constructEvent(positiveRequest, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET ? process.env.STRIPE_WEBHOOK_SECRET : "")
        let eventData
        let customEmail
        if (stripeEvent.type === "checkout.session.completed") {
            eventData = stripeEvent.data.object as Stripe.Checkout.Session;
            customEmail = eventData.customer_details?.email;
            // console.log("Event data order id", eventData?.metadata?.userId);
            if (eventData?.metadata?.userId) {
                const findedBabaji = await OrdersModel.findOne({ userId: eventData?.metadata?.userId });
                // console.log("sjdc findedBabaji", findedBabaji);
                const babaji = await OrdersModel.findByIdAndUpdate({ _id: findedBabaji?._id }, { orderStatus: "completed" });
                // console.log("babaji", babaji);
            }
        }
        return res.status(200).send(`Order placed successfully`);
    }
    catch (er) {
        return res.status(500).json({ message: "Opps something went wrong" })
    }

}
export default connectDatabase(webhookListener);
export const config = {
    api: {
        bodyParser: false,
    }
}