import next from "next/server";
import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import productModel from "@/modalsmongoose/product";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const response = await productModel.find({});
        res.status(200).json({ message: "Products fetched successfully" });
    }
    else if (req.method !== "GET") {
        return res.status(200).json({ meesage: "Method nto allowed" })
    }
}
export default connectDatabase(handler);