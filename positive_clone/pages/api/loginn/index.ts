import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import UserModel from "@/modalsmongoose/user";
// import cookie from "cookie";
const Loginn = async (request: NextApiRequest, response: NextApiResponse) => {
   //for the usage of mysql..//
   // let database = await mysql.createConnection({
   //    host: "localhost",
   //    port: 3306,
   //    user: "root",
   //    password: "SHASHVAT",
   //    database: "firstpositive_db"
   // });
   // let responseArray = await database.query("select * from signup", []);
   // let list: any = responseArray[0];
   // let findedResult = list.find((key: any, index: number) => key.password === JSON.parse(request.body).password) || {};
   // //   console.log("positive",findedResult)
   // if (Object.keys(findedResult).length > 0) {
   //    //   response.status(200);
   //    //   response.setHeader('Set-Cookie', cookies.serialize("isLogined", "true"));
   //    //   return response.({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
   //    // const response = NextResponse.json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
   //    // response.cookies.set("isLogedIn", "true");
   //    // response.setHeader('Set-Cookie', cookie.serialize('isLog', 'true'));
   //    return response.status(200).json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
   //    // return response.redirect("/");

   // }
   // else if (Object.keys(findedResult).length === 0) {
   //    return response.status(404).json({ message: "Please Sign Up !", findedResult, statusCode: 404 });
   // }
   //  return response;
   let user = await UserModel.find({ email: request.body.email });
   response.status(200).send("Loginned Successfully");
   response.end();
}
export default Loginn;
