import { REMOVEPRODUCT } from "../constants";

const removeProduct: (payload: any) => {
    type: string;
    payload: any
} = (payload) => {

    return {
        type: REMOVEPRODUCT,
        payload
    }
}
export default removeProduct;