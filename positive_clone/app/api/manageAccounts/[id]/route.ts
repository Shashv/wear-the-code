import { NextRequest, NextResponse } from "next/server";
import connectAPProuterdb from "@/configuration/appConnectiondb";
import UserModel from "@/modalsmongoose/user";
import { IType } from "@/modals";

const handlePutrequest = async (req: NextRequest, urlParams: any) => {
    const body = await req.json();
    return NextResponse.json({ message: `Executed the put request with ${urlParams.params.id} and username ${body.username}` });
}

export const PUT = connectAPProuterdb(handlePutrequest);

const handleDeleteRequest = async (req: NextRequest, positive: { params: IType }) => {
    const { params: { id } } = positive;
    const isDeleteMethod = req.method === "DELETE";
    if (!isDeleteMethod) return NextResponse.json({ message: "Invalid Method" });
    try {
        const deleteRecord = await UserModel.findOneAndDelete({ email: id });
        const babajiUsersProtect = await UserModel.find({});
        console.log("Deleted record", deleteRecord, babajiUsersProtect);
        if (deleteRecord) return NextResponse.json({ message: "Positive" }, { status: 200 });
    }
    catch (er) {
        console.log("error ocuured while deleting the user", er);
        NextResponse.json({ message: "Error while deleting the user" }, { status: 500 })
    }
}
export const DELETE = connectAPProuterdb(handleDeleteRequest);

//...The above functions has been fortified with mongodatabase connections...//
//the default behaviour of next js app is , we directly export the named function so that we can make the crud..///