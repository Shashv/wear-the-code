import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_POSITIVE || "", {
        apiVersion: "2025-02-24.acacia"
    });
    const parsePayload = JSON.parse(req.body);
    const { amount, useruniqueorderId } = parsePayload;
    // console.log('unique id', parsePayload.useruniqueorderId)
    const stripePositive = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // ui_mode:"embedded",
        line_items: [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Tshirt"
                },
                unit_amount: 1000
            },
            quantity: 1
        }],
        mode: "payment",
        success_url: `http://localhost:3000/orders?orderId=${parsePayload.useruniqueorderId}`,
        cancel_url: "http://localhost:3000",
        metadata: {
            userId: useruniqueorderId || ""
        }
    })
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1000,
    //     currency: "usd",
    //     automatic_payment_methods:{
    //         enabled:true
    //     }
    // });
    // console.log("Amountmust be converted to 50 cents",paymentIntent.client_secret)

    return res.status(200).json({ message: 'Payment client secret', success: true, client_secret: stripePositive.id })
}
export default checkoutSession;