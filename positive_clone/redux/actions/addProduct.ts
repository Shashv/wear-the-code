import { ADDPRODUCT } from "../constants";
import { ICartProduct } from "@/modals";
const addProduct: (payload: ICartProduct) => {
    type: string;
    payload: any
} = (payload) => {

    return {
        type: ADDPRODUCT,
        payload
    }
}
export default addProduct;