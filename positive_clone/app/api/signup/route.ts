import bycryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// import { createEdgeRouter } from "next-connect";
import UserModel from "@/modalsmongoose/user";
import mongoose from "mongoose";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
// const babaji = createEdgeRouter<NextRequest, {}>();
// babaji.use(async (req, event, next) => {
//     // applyMiddleware()
//     await next();
// });
// babaji.post(async req => {
//     const body = await req.formData();
//     await mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//         serverSelectionTimeoutMS: 5000
//     });
//     const findedUser = await UserModel.findOne({ email: body.get("email") });
//     if (findedUser) {
//         let isPasswordSame = await bycryptjs.compare(findedUser.password, body.get("password")?.toString() || "");
//         if (isPasswordSame)
//             return NextResponse.json({ message: "User already exists" }, { status: 200 });
//     }
//     else {
//         const salts = await bycryptjs.genSalt(10);
//         let password = body.get("password")?.toString() || "" as string;
//         let image = body.get("imageName")?.toString();
//         let imagebuffer = body.get("imageBuffer");
//         console.log("Image Buffer",imagebuffer);
//         const hashedPassword = await bycryptjs.hash(password, salts);
//         let newUser = new UserModel({
//             email: body.get("email"),
//             password: hashedPassword,
//             username: body.get("username"),
//             image: image ? image : ""
//         });
//         // fs.writeFile(`/uploads/${image}`,)
//         if (newUser)
//             return NextResponse.json({ message: "User created successfully" })
//     }
// });
export const POST = async (req: NextRequest) => {
    const body = await req.formData();
    // ...//
    // let imagebuffer = body.get("imageBuffer") as string;
    // slient side console check ..//
    // console.log("image buffer at the server side",imagebuffer);
    // ...//
    await mongoose.connect("mongodb+srv://traineewebframez:0xrgceVRyQWHMzBJ@cluster0.wgwyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        serverSelectionTimeoutMS: 5000
    });
    const findedUser = await UserModel.findOne({ email: body.get("email") });
    if (findedUser) {
        let isPasswordSame = await bycryptjs.compare(findedUser.password, body.get("password")?.toString() || "");
        if (isPasswordSame)
            return NextResponse.json({ message: "User already exists" }, { status: 200 });
        else return NextResponse.json({ message: "Password doesnt match" }, { status: 405 });
    }
    else {
        const salts = await bycryptjs.genSalt(10);
        let password = body.get("password")?.toString() || "" as string;
        let image = body.get("image") as File;
        const hashedPassword = await bycryptjs.hash(password, salts);
        let newUser = new UserModel({
            email: body.get("email"),
            password: hashedPassword,
            username: body.get("name"),
            image: image ? image.name : "",
        });
        await newUser.save();
        const joinedPath = path.join(process.cwd(), "/public/uploads");
        const arrayBuffer = await image.arrayBuffer();
        const bufferData = new Uint8Array(arrayBuffer)
        if (!fs.existsSync(joinedPath)) {
            fs.mkdirSync(joinedPath, { recursive: true });
            await writeFile(path.join(joinedPath, image.name), bufferData);
        }
        else {
            if (fs.existsSync(path.join(joinedPath, image.name))) {
                return NextResponse.json({ message: 'Babaji Gangotri , please provide unique profile pic' });
            }
            await writeFile(`${joinedPath}/${image.name}`, bufferData);
        }
        //for the explicit testing..//
        // fs.writeFile(joinedPath, bufferData, er => {
        //     console.log("File callback function called", er);
        // }) 
        // ...//
        if (newUser)
            return NextResponse.json({ message: "User created successfully" }, { status: 200 })
        else return NextResponse.json({ message: "Unable to create the user" }, { status: 500 });
    }

}
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}