import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import mysql from 'mysql2/promise';
// import x from "../../../public/0.jpg";
import { createEdgeRouter } from "next-connect";
const multerstorage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log("File using", file);
            return cb(null, "../../../public");
        }, filename: (req, file, cb) => {
            console.log("File", file);
            return cb(null, file.filename);
        }
    })
});
const upload: any = multerstorage.single("file");
const specificNextRouter = createEdgeRouter<NextRequest, { params: {} }>();
specificNextRouter.use(upload).post(async (req: NextRequest) => {
    // (await req.formData()).forEach((value, key) => {
    //     console.log(value);
    // })
    return NextResponse.json({
        message: "File Uplodaed successfully using the multer"
    }, {
        status: 201
    })
})
export const POST = async (req: NextRequest) => {
    // console.log("Request body", await req.formData());
    return specificNextRouter.run(req, { params: {} })
}
// export const POST = async (request: NextRequest | any, response: any) => {
//     let body = await request.json();
//     // console.log("Payload body for the process", body);
//     let data = await request.formData();
//     console.log("filedata on the server", body, "With the form data", data);
//     // upload(request, response, async (er) => {
//     //     if (er) console.log("Error occured in the middleware function");
//     //     else {
//     //         let formData: FormData = await request.formData();
//     //         // console.log("File from client", formData.get("file"));
//     //         let fileExtraceted = formData.get("file");
//     //         let database = mysql.createPool({
//     //             host: "localhost",
//     //             port: 3306,
//     //             database: "firstpositive_db",
//     //             user: "root",
//     //             password: "SHASHVAT"
//     //         });
//     //         // let responses = await database.query('insert into uploads(name,description,variant,image_front,image_back) values(?,?,?,?,?)', [body]);
//     //     }
//     // });


//     return NextResponse.json({ message: "Upladed Successfully" }, { status: 201, statusText: "Added the details" });
// }
// export const config = {
//     api: {
//         bodyParser: false
//     },
//     runtime: "edge"
// }