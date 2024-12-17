import { combineReducers } from "redux";
import reducertesting from "./testingreducer";
import productManage from "./addProduct";
import toggletheme from "./toggletheme";
import buyNow from "./buyNow";
const reducer = combineReducers({
    productManage,
    reducertesting,
    toggletheme,
    buyNow
});
export default reducer;
//the returned reducer is the function which takes the global state as the first parameter and the action type as the second parater on the basis of which the state changes.//