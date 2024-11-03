import { ICartProduct } from "@/modals";
import { ADDPRODUCT, CLEARCART, REMOVEPRODUCT } from "../constants";
import { ICartState } from "@/modals";
let initialstate: number = 1;
let reduxInitia = {};
let positive: ICartProduct = { name: "", size: "", quantity: 0, price: 0, variant: "", product: "" };
const productManage: (state: ICartState, actions: { type: string; payload: ICartProduct }) => { itemCode: ICartProduct } | any = (state = reduxInitia, actions) => {
    switch (actions.type) {
        case ADDPRODUCT: {
            if (actions.payload.product in state) {
                let itemCode = actions.payload.product;
                localStorage.setItem("cart", JSON.stringify({
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        quantity: state[itemCode].quantity + 1,
                        size: actions.payload.size,
                        variant: actions.payload.variant,
                        price: actions.payload.price
                    }
                }))
                return {
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        quantity: state[itemCode].quantity + 1,
                        size: actions.payload.size,
                        variant: actions.payload.variant,
                        price: actions.payload.price
                    }
                };
            }
            else {
                let itemCode = actions.payload.product;
                // console.log(actions.payload);
                localStorage.setItem("cart", JSON.stringify({
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        size: actions.payload.size,
                        price: actions.payload.price,
                        quantity: 1,
                        variant: actions.payload.variant,
                    }
                }))
                return {
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        size: actions.payload.size,
                        price: actions.payload.price,
                        quantity: 1,
                        variant: actions.payload.variant,
                    }
                };
            }
        }
        case REMOVEPRODUCT: {
            let itemCode = actions.payload.product;
            if (state[itemCode].quantity === 1) {
                let filteredKeys = Object.keys(state).filter(key => key !== itemCode);
                let { [itemCode]: value, ...rest } = state;

                localStorage.setItem("cart", JSON.stringify(rest));
                return rest;
                // delete state[itemCode];
                // return state;
            }

            else {
                localStorage.setItem("cart", JSON.stringify({
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        size: actions.payload.size,
                        price: actions.payload.price,
                        quantity: state[itemCode].quantity - 1,
                        variant: actions.payload.variant
                    }
                }))
                return {
                    ...state, [itemCode]: {
                        name: actions.payload.name,
                        size: actions.payload.size,
                        price: actions.payload.price,
                        quantity: state[itemCode].quantity - 1,
                        variant: actions.payload.variant
                    }
                }
            }
        }
        case CLEARCART: {
            // console.log("Inside the cleaR CArt process");
            let stateModified = {};
            state = stateModified;
            localStorage.setItem("cart", JSON.stringify(state));
            return state;
        }
        default: return state;
    }
}
export default productManage; 