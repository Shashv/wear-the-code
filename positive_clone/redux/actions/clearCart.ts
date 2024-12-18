import React from "react";
import { CLEARCART } from "../constants";
const clearCart: (payload: any) => { type: string; payload: any } = (payload) => {
    console.log('Babaji will kill brahmrishi');
    return {
        type: CLEARCART,
        payload
    }
}
export default clearCart;