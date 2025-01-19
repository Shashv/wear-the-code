import { ICartProduct } from "@/modals";
import { REMOVEBUYPRODUCT } from "../constants";
const removeBuyProduct: (payload: ICartProduct) => { type: string; payload: ICartProduct } = payload => {
    return {
        type: REMOVEBUYPRODUCT,
        payload
    }
}
export default removeBuyProduct;