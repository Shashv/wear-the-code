import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/modalsmongoose/product";
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    let deleteProduct = await ProductModel.deleteOne({ title: req.query });
    console.log("Delete successfully")
  }
}
export default connectDatabase(deleteProduct);