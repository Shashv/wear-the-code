import next from "next/server";
import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import ProductModel from "@/modalsmongoose/product";
import { iShirts, IShirts } from "@/modals";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {

        let tshirts: {
            [key: string]: iShirts;
        } = {};
        const response = await ProductModel.find({ category: "tshirts" }).lean() as any[];
        let item: IShirts;
        for (item of response) {
            if (item?.title ? item.title in tshirts : null) {
                if (!tshirts[item?.title || ""].colors.includes(item?.color || "") && item?.availableQuantity || 0 > 0) {
                    tshirts[item?.title || ""].colors.push(item?.color || "");
                }
                if (!tshirts[item?.title || ""].sizes.includes(item?.size || "") && item?.availableQuantity || 0 > 0) {
                    tshirts[item?.title || ""].sizes.push(item?.size || "");
                }
            }
            else {
                let { size, color, ...rest } = item;
                tshirts[item?.title || ""] = { ...rest, sizes: [], colors: [] };
                item?.availableQuantity || 0 > 0 ? tshirts[item?.title || ""]["sizes"] = [item?.size || ""] : null;
                item?.availableQuantity || 0 > 0 ? tshirts[item?.title || ""]["colors"] = [item?.color || ""] : null;

            }
        }
        return res.status(200).json({ productlist: tshirts });
    }
    else if (req.method !== "GET") {
        return res.status(200).json({ meesage: "Method not allowed" })
    }
}
export default connectDatabase(handler);
// ..you can explicitly call the database by using the mongoose.connect in every statement..// by using the following the statement below...//
// export default handler;