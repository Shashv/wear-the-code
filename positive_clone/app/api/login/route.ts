import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import jwtmodule from "jsonwebtoken";
// import cookies from "cookies";
// import cookies from "cookie";
export const POST = async (request: NextRequest, responses: NextResponse) => {
   let database = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "SHASHVAT",
      database: "firstpositive_db"
   });
   let parsedBody = await request.json();
   let responseArray = await database.query(`select * from signup where email = '${parsedBody.email}'`, []);
   let list: any = responseArray[0];
   // console.log(list[0]);

   let findedResult = list.find((key: any, index: number) => key.password === parsedBody.password) || {};
   //   console.log("positive",findedResult)
   if (Object.keys(findedResult).length > 0 || list[0]) {
      //   response.status(200);
      //   response.setHeader('Set-Cookie', cookies.serialize("isLogined", "true"));
      //   return response.({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      // console.log(findedResult, "inside the found");
      // const response = NextResponse.json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      // response.cookies.set("isLogedIn", "true");
      // return response;
      // NextResponse.next().cookies.set("isLog", "true");
      // NextResponse.redirect("/");Q
      // return NextResponse.json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      let response = NextResponse.json({ message: `Welcome to CodeSwear ${list[0].email.split("@")[0]}`, statusCode: 200 });
      // let response = NextResponse.redirect(new URL("/"));
      response.cookies.set("isLog", "true");
      return response;
      // return NextResponse.redirect(new URL("/"));Q
   }
   else if (Object.keys(findedResult).length === 0 || !list[0]) {
      // consol e.log(findedResult, "inside the not found");
      // const response = NextResponse.json({ message: "Please Signup !", findedResult, statusCode: 404 });
      // return response;
      NextResponse.next().cookies.set("notlog", "true");
      return NextResponse.json({ message: "Please Sign Up !", findedResult, statusCode: 404 });
   }
}
