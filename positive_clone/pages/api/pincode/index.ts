import { NextApiRequest, NextApiResponse } from "next";
import pinList from "@/utils/pinList";
const handler = (req: NextApiRequest, response: NextApiResponse) => {
    // const pinList = ["147201", "140105", "160543", "110582", "110432", "123456"];

    let findedPin = pinList.find(key => key === Number(JSON.parse(req.body)));
    let mappedResult = pinList.map(key => key === Number(JSON.parse(req.body)) ? key : false);
    if (findedPin)
        return response.json({ message: "Service Available", status: 200, findedPin });
    else return response.json({ message: "Service Unavailable", status: 404, findedPin });
}
export default handler;