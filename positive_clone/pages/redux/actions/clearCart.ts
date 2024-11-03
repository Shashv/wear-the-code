import React from "react";
import { CLEARCART } from "../constants";
const clearCart: (payload: any) => { type: string; payload: any } = (payload) => {
    return {
        type: CLEARCART,
        payload
    }
}
export default clearCart;