import { NextApiRequest, NextApiResponse } from "next";
// import PaytmChecksum from "paytmchecksum"; 
import Stripe from "stripe";
import connectDatabase from "@/configuration";
const InitTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            // console.log("Inside the method GET request");
            res.status(200).send("GET req processed Emthod processed")
        }
        else if (req.method === "POST") {
            if (process.env.STRIPE_SECRET_KEY === undefined) {
                const errorInstance = new Error("Secret token is not provided to initiate the session Instance as to generate the checkout sessions");
                throw errorInstance;
            }
            else {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
                    apiVersion: "2025-01-27.acacia"
                });
                const positiveCheckoutSession = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    mode: "payment",
                    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}/cancel`,
                    line_items: [{
                        price_data: {
                            unit_amount: 100,
                            currency: "usd",
                            product_data: {
                                name: 'Example Product',
                                description: "Sample description"
                                // The product's name
                                // You can also add a description, images, etc.
                            },
                        },
                        quantity: 1,
                    }],
                });
                // will be used later when paytm checksum will bhe used..//
                // console.log("Next public secret key", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
                // console.log("Next secret key", process.env.STRIPE_SECRET_KEY)
                // const response = await PaytmChecksum.verifySignature("");
                // .....
                res.status(201).json({
                    // publicSecret: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
                    // secretKey: process.env.STRIPE_SECRET_KEY,
                    sessionId: positiveCheckoutSession.id
                });
            }
        }
    }
    catch (er) {
        console.log("Error at the backend", er);
        res.status(500).send("Internal server error");
    }
}
// export default InitTransaction;
export default connectDatabase(InitTransaction);