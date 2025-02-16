import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "@/configuration";
import ProductModel from "@/modalsmongoose/product";
const addProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const addProduct = new ProductModel({
                title: req.body.title,
                slug: req.body.slug,
                desc: req.body.desc,
                img: req.body.img,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                availableQuantity: req.body.availableQuantity
            })
            await addProduct.save();
            return res.status(200).json({ message: "Addedproducts" });
        }
        else {
            return res.status(405).json({ message: "Method not allowed" });
        }
    }
    catch (er) {
        res.status(500).send("Oops something went wrong");
    }
}
export default connectDatabase(addProduct);
// we can use the below statement if want to explicitly call the database connection for every route request..//
// export default addProduct;
