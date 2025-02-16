import { NextApiRequest, NextApiResponse } from "next";
// import mysql from "mysql2/promise";
import bycryptjs from "bcryptjs";
// import jwtmodule from "jsonwebtoken";
import UserModel from "@/modalsmongoose/user";
import connectDatabase from "@/configuration";
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        let parsedPositive = JSON.parse(request.body);
        const generateHashedPassword: (data: string) => Promise<string> = async password => {
            const salts = await bycryptjs.genSalt();
            return await bycryptjs.hash(password, salts);
        }
        let newUser = new UserModel({
            username: parsedPositive.name,
            password: await generateHashedPassword(parsedPositive.password),
            email: parsedPositive.email,
            image:""
        });
        await newUser.save();
        //use myslq to use below....//
        // let databaseControls = await mysql.createConnection({
        //     host: "localhost",
        //     user: "root",
        //     password: "SHASHVAT",
        //     port: 3306,
        //     database: "firstpositive_db"
        // });
        // let generatedSalt = await bycryptjs.genSalt(10);
        // let hashedPaswword = await bycryptjs.hash(parsedPositive.password, generatedSalt);
        // let newUser = new UserModel({
        //     useremail: "",
        //     email: parsedPositive.email,
        //     password: hashedPaswword
        // })
        // let responseData = databaseControls.query(`insert into signup(email,phone,password)values('${parsedPositiVE.email}','${parsedPositiVE.phone}','${hashedPaswword}')`, [])
        // console.log('New user', newUser);
        return response.json({ message: "User created successfully" });
    }
    catch (er) {
        return response.status(500).send("Oops something went wrong");
    }
}
// export default handler;
export default connectDatabase(handler);