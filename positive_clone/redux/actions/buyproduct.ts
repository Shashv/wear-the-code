import { ICartProduct } from "@/modals";
import React from "react";
import { POSITIVE } from "../constants";
const buyProduct: (payload: ICartProduct) => { type: string; payload: ICartProduct } = payload => {
    return {
        type: POSITIVE,
        payload
    }
}
export default buyProduct;