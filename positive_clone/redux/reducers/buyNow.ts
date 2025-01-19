import { Action } from "redux";
import { ADDBUYPRODUCT, CLEARNEGATIVE, POSITIVE, REMOVEBUYPRODUCT } from "../constants";
import { ICartProduct } from "@/modals";
let initialState: {
    [key: string]: {
        slug: string;
        name: string;
        price: number;
        variant: string;
        quantity: number;
        size: string;
    }
} = {};
const buyProduct: (state: {
    [key: string]: {
        slug: string;
        name: string;
        price: number;
        variant: string;
        quantity: number;
        size: string;
    }
}, actions: { type: string; payload: ICartProduct }) => typeof state = (state = initialState, actions: { type: string, payload: ICartProduct }) => {

    switch (actions.type) {
        case POSITIVE: {
            if (actions.payload.product in state)
                return {
                    ...state, [actions.payload.product]: {
                        name: actions.payload.name,
                        size: actions.payload.size,
                        price: actions.payload.price,
                        quantity: state[actions.payload.product]?.quantity || 0,
                        variant: actions.payload.variant,
                        slug: actions.payload.product
                    }
                }
            else return {
                ...state, [actions.payload.product]: {
                    name: actions.payload.name,
                    size: actions.payload.size,
                    price: actions.payload.price,
                    quantity: 1,
                    variant: actions.payload.variant,
                    slug: actions.payload.product
                }
            }
        }
        case REMOVEBUYPRODUCT: {

            let removeProductkey = actions.payload.product;
            if (removeProductkey in state && state[removeProductkey].quantity > 1) {
                return { ...state, [removeProductkey]: { ...state[removeProductkey], quantity: state[removeProductkey].quantity - 1 } }
            }
            else {
                let { [removeProductkey]: removedValue, ...restProducts } = state;
                return { ...restProducts };
            }

        }
        case ADDBUYPRODUCT: {

            return { ...state, [actions.payload.product]: { ...state[actions.payload.product], quantity: state[actions.payload.product].quantity + 1 } }
        }
        case CLEARNEGATIVE: {
            state = {};
            return state;
        }
        default: return state;
    }

}
export default buyProduct;