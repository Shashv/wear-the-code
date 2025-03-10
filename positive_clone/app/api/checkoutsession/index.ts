import connectDatabase from "@/configuration";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const handler = async (req: NextRequest) => {
    try {
        if (req.method !== "POST") {
            // return res.status(405).json({ message: "Oops method not allowed" });
            return NextResponse.json({ message: "Oops method not allowed" }, { status: 405 })
        }
        else {

            // const { amount, currency } = JSON.parse(req.body);
            const { amount, currency } = await req.json();
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "" as string, {
                apiVersion: "2025-01-27.acacia"
            });
            const paymentIntents = await stripe.paymentIntents.create({
                amount: amount ? amount : 10,
                currency: currency ? currency : 10,
                // payment_method_types: ["card"],
                payment_method: "pm_card_visa",
                confirm: true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never"
                },
            });
            // console.log("Babaji", paymentIntents);
            // console.log("Payment credentials client secret", paymentIntents.client_secret, "Payment intents id", paymentIntents.id);
            if (paymentIntents.id && paymentIntents.client_secret) {
                // return res.status(200).json({ success: true, message: "Recieved the client secrets successfully", client_secret: paymentIntents.client_secret ? paymentIntents.client_secret : "", payment_id: paymentIntents.id ? paymentIntents.id : "" });
                return NextResponse.json({ success: true, message: "Recieved the client secrets successfully", client_secret: paymentIntents.client_secret ? paymentIntents.client_secret : "", payment_id: paymentIntents.id ? paymentIntents.id : "" }, { status: 200 })
            }
            else
                // return res.status(200).json({ error: true, message: "Unable to take the client secret as well as payment intent id" });
                return NextResponse.json({ error: true, message: "Unable to take the client secret as well as payment intent id" },{status:200})
        }
    }
    catch (er) {
        console.log("Error while creating the payment intents", er);
        // return res.status(500).json({ message: "Ooops something went wrong" });
    }
}
// export default connectDatabase(handler);