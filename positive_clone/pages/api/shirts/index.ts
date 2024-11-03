import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    // console.log("Request body params",request.query);
    // let specificProduct = request.query.product;
    let type = request.query.type;
    let database = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "SHASHVAT",
        database: "firstpositive_db",
        port: 3306
    });
    if (type) {
        let responseproduct: any = await database.query('select * from shirts where  type = ?', [type]);
        // console.log("Response product",responseproduct[0][0]);
        return response.status(200).json({ product: responseproduct[0][0] });
    }
    else {
        let responseData = await database.query("select * from shirts", []);
        return response.status(200).json({ data: responseData[0] });
    }
    response.end();
}
export default handler;
