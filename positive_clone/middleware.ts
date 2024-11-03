import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
// import multer from 'multer';
// const multerDefination = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, "/uploadedShirts");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.filename);
//     }
// });
const middleware = (request: NextRequest) => {

    let cookieValue = request.cookies.get("isLog")?.value;
    let pathname = request.nextUrl.pathname || "";
    if (pathname.includes("authentication") && cookieValue === "true") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    else if (!pathname.includes("authentication") && cookieValue !== "true") {
        return NextResponse.redirect(new URL("/authentication/login", request.url))
    }
}
export default middleware;

export const config = {
    matcher: ["/", "/authentication/login", "/authentication/signup"]
}

//General Note regarding the middleware //
//Middleware is the centralised medium between the client and the server, since a middleware is the file or the
// function which gets executed after the request has been sent from the client to the server , but before the request has achieved the server
//since in the middleware we can access the request object response objects , since we can crosscheck the risk of bad request
// from the client or any unauthirized type of request from the client.., so before reaching the request to the server , we can have modified the request object,
//that is sending back to the client the request sent from the client initially due to the unauthorized requests.//
//In the stack there is not boundation that we can have only one middleware function defined, but we can have more than one middleware functions which can be further called after one another in the que ,
//so a  middleware function can have defined by the express //
//in the below syntax request is the client incoming request object, with the help of res prop we can stop the request by going furhter to the server , by ending the response with
//the res keyword, or we can also set the request object i.e modifying the request object, next is the next middleware function in the que if any//
//on calling the next() , we will be calling the next middleware function , if there is no next middleware function , //
//then the request is being sent directly to the server//
// app.use((req,res,next) => { }) 