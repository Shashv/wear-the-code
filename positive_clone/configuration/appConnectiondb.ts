import { NextRequest } from "next/server";
import mongoose from "mongoose";
const connectAPProuterdb = (handler: (req: NextRequest, params: any) => Promise<any>) => async (req: NextRequest, params: any) => {
    if (mongoose.connections[0].readyState) {
        console.log('Connections already made');
    }
    else {
        await mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to mongoose!");
    } 
    return await handler(req, params);
}
export default connectAPProuterdb;