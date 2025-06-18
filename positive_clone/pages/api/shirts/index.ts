import { NextApiRequest, NextApiResponse } from "next";
// import mysql from "mysql2/promise";
import connectDatabase from "@/configuration";
import ProductModel from "@/modalsmongoose/product";
import { IShirts } from "@/modals";
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        let type = request.query.type;
        if (request.method === "GET") {
            let responseproduct = (await ProductModel.find({ slug: type }).lean()).map(product => {
                let { title, slug, desc, img, category, size, color, price, availableQuantity, productOrientations, tags } = product;
                return {
                    title,
                    slug,
                    img,
                    desc,
                    category,
                    size,
                    color,
                    price, availableQuantity,
                    productOrientations,
                    tags
                }
            }) as IShirts[];
            // console.log("Response babaji", responseproduct)
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

    }
    catch (er) {
        console.log("Backend error");
        response.status(500).send("Something went wrong");
    }
}
export default connectDatabase(handler);
// export default handler;