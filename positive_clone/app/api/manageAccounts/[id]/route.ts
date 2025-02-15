//babaji//
import { NextRequest, NextResponse } from "next/server";
import connectAPProuterdb from "@/configuration/appConnectiondb";
import UserModel from "@/modalsmongoose/user";
// export const PUT = async (req: NextRequest) => {

// }

// export const PATCH = async (req: NextRequest) => {

// }
// export const DELETE = async (req: NextRequest) => {

// } 
const handlePutrequest = async (req: NextRequest, urlParams: any) => {
    // console.log('url params', urlParams);
    const body = await req.json();
    return NextResponse.json({ message: `Executed the put request with ${urlParams.params.id} and username ${body.username}` });
}
export const PUT = connectAPProuterdb(handlePutrequest);
const handleDeleteRequest = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const deleteRecord = await UserModel.findOneAndDelete({ email: body.email });
        deleteRecord && NextResponse.json({ message: "Positive" }, { status: 200 });
    }
    catch (er) {
        console.log("error ocuured while deleting the user", er);
        NextResponse.json({ message: "Error while deleting the user" }, { status: 500 })
    }
}
export const DELETE = connectAPProuterdb(handleDeleteRequest);