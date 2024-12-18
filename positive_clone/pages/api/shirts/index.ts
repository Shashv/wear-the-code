import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import connectDatabase from "@/configuration";
import ProductModel from "@/modalsmongoose/product";
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    let type = request.query.type;
    if (request.method === "GET") {
        console.log("Type",type);
        let responseproduct = await ProductModel.find({ slug: type }).lean();
        const availableshirts: any[] = await ProductModel.find({ title: responseproduct[0].title, category: responseproduct[0].category }).lean();
        const colorslug: {
            [key: string]: {
                [key: string]: {
                    slug: string;
                    price: number;
                }
            }
        } = {};
        for (let shirtVaraints of availableshirts) {
            if (shirtVaraints.color in colorslug) {
                colorslug[shirtVaraints.color][shirtVaraints.size] = { slug: shirtVaraints.slug, price: shirtVaraints.price }
            }
            else {
                colorslug[shirtVaraints.color] = {};
                colorslug[shirtVaraints.color][shirtVaraints.size] = { slug: shirtVaraints.slug, price: shirtVaraints.price }
            }
        }
        return response.status(200).json({ productVariant: colorslug, product: responseproduct });
    }
    else {
        return response.status(405).json({ message: "Method not allowed" });
    }
    response.end();
}
export default connectDatabase(handler);
