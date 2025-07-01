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
        let customEmail;
        console.log("Stripe event", stripeEvent);
        if (stripeEvent.type === "checkout.session.completed") {
            eventData = stripeEvent.data.object as Stripe.Checkout.Session;
            customEmail = eventData.customer_details?.email;
            // console.log("Event data id", eventData?.id);
            if (eventData?.metadata?.userId) {
                const findedBabaji = await OrdersModel.findOne({ userId: eventData?.metadata?.userId });
                // console.log("sjdc findedBabaji", findedBabaji);
                await OrdersModel.findByIdAndUpdate({ _id: findedBabaji?._id }, { orderStatus: "completed", paymentInfo: eventData });
                // console.log("babaji", babaji);
            }
        }
        else {
            eventData = stripeEvent.data.object as Stripe.Checkout.Session;
            const findedBabaji = await OrdersModel.findOne({ userId: eventData?.metadata?.userId });
            await OrdersModel.findByIdAndUpdate({ _id: findedBabaji?._id }, { orderStatus: "pending", paymentInfo: eventData })
        }
        return res.status(200).send(`Order placed successfully`);
    }
    catch (er) {
        console.log("Error while babaji", er);
        return res.status(500).json({ message: "Opps something went wrong" })
    }

}
export default connectDatabase(webhookListener);
export const config = {
    api: {
        bodyParser: false,
    }
}