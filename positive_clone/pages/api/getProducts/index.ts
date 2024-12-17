import next from "next/server";
import connectDatabase from "@/configuration";
import { NextApiRequest, NextApiResponse } from "next";
import productModel from "@/modalsmongoose/product";
export type IShirts = {
    id?: any;
    title?: string | null;
    slug?: string | null;
    desc?: string | null;
    img?: string | null;
    category?: string | null;
    size?: string | null;
    color?: string | null;
    price?: number;
    availableQuantity?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    __v?: number | string;
    availableSizes?: string[];
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        interface iShirts extends Omit<IShirts, "size" | "color"> {
            sizes: string[];
            colors: string[]
        }
        let tshirts: {
            [key: string]: iShirts;
        } = {};
        const response = await productModel.find({ category: "tshirts" }).lean() as any[];
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
        res.status(200).json({ productlist: tshirts });
    }
    else if (req.method !== "GET") {
        return res.status(200).json({ meesage: "Method not allowed" })
    }
}
export default connectDatabase(handler);