import { CLEARNEGATIVE } from "../constants"
const clearBuyproducts: () => { type: string } = () => {
    return {
        type: CLEARNEGATIVE
    }
}
export default clearBuyproducts;