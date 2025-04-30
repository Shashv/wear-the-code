import { NextApiRequest, NextApiResponse } from "next";
import pinList from "@/utils/pinList";
import connectDatabase from "@/configuration";
const handler = async (req: NextApiRequest, response: NextApiResponse) => {
    let findedPin: { pinCode: number, city: string } = pinList.find(key => key.pinCode === Number(JSON.parse(req.body))) as {pinCode:number,city:string};
    // let mappedResult = pinList.map(key => key === Number(JSON.parse(req.body)) ? key : false);
    if (findedPin)
        return response.json({ message: `Service Available at ${findedPin.city}`, status: 200, findedPin });
    else return response.json({ message: `Service Unavailable at mentioned location`, status: 404, findedPin });
}
// connection with the database;
// export default handler;
export default connectDatabase(handler);