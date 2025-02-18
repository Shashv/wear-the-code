import connectAPProuterdb from "@/configuration/appConnectiondb";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/modalsmongoose/product";
interface IType {
    id: string
}
const processGetRequest = async (req: NextRequest, params: { params: IType }) => {
    try {
        // console.log("params.id",params);
        let specificProduct = await ProductModel.findOne({ slug: params.params.id });
        // console.log("specific product", specificProduct);
        if (specificProduct)
            return NextResponse.json({ specificProduct }, { status: 200 });
        else return NextResponse.json({ message: "Unable to find the product" }, { status: 200 })
    }
    catch (er) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
export const GET = connectAPProuterdb(processGetRequest);