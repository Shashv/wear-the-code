import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
// import cookie from "cookie";
const Loginn = async (request: NextApiRequest, response: NextApiResponse) => {
   let database = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "SHASHVAT",
      database: "firstpositive_db"
   });
   let responseArray = await database.query("select * from signup", []);
   let list: any = responseArray[0];
   //   console.log(list[0],JSON.parse(request.body));
   //  let parsedBody = await request.json();
   let findedResult = list.find((key: any, index: number) => key.password === JSON.parse(request.body).password) || {};
   //   console.log("positive",findedResult)
   if (Object.keys(findedResult).length > 0) {
      //   response.status(200);
      //   response.setHeader('Set-Cookie', cookies.serialize("isLogined", "true"));
      //   return response.({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      // const response = NextResponse.json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      // response.cookies.set("isLogedIn", "true");
      // response.setHeader('Set-Cookie', cookie.serialize('isLog', 'true'));
      return response.status(200).json({ message: "Loginned Successfully !", findedResult, statusCode: 200 });
      // return response.redirect("/");

   }
   else if (Object.keys(findedResult).length === 0) {
      // const response = NextResponse.json({ message: "Please Signup !", findedResult, statusCode: 404 });
      // return response;
      return response.status(404).json({ message: "Please Sign Up !", findedResult, statusCode: 404 });
   }
   //  return response;
}
export default Loginn;
