import { ICartProduct } from "@/modals";
import { ADDBUYPRODUCT } from "../constants";
const addBuyproduct: (payload: ICartProduct) => { type: string; payload: ICartProduct } = payload => {
   
    return {
        type: ADDBUYPRODUCT,
        payload
    }
}
export default addBuyproduct;