import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: "your google client id",
//             clientSecret: "your google client secret"
//         })
//     ]
// });
export const GET = async (req:NextRequest) => {
    return NextResponse.json({message:""})
}
//general notes//
//difference between the normal functions and the arrow functions//
//1.) in the arrow functions , we can have this keyword reference as the surrounding lexical scope , but for the regular functions they have their own this reference , depending upon how they are being called or executed , by default the this keyword reference has the window object property value//
//2.) accessing of the arguements , in the regular functions we can access the parameters of the function with the arguements inbuilt keyword in the js , where as in the arrow function we can't access the parameters with the rest operator usage but not with the arguments keywords ,
//3.) Multiple parameters with the same name , for the regular functions ,
// const object: {
//     regularmethod(): void;
//     arrowMethod: () => void
// } = {
//     regularmethod: function () {
//         console.log("This keyword is", this);
//     },
//     arrowMethod: () => {
//         console.log("this keyword for the arrow function", this);
//     }
// }
// console.log("Object", object.arrowMethod(), "Object mehtos");