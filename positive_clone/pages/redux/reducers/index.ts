import { combineReducers } from "redux";
import reducertesting from "./testingreducer";
import productManage from "./addProduct";
import toggletheme from "./toggletheme";
const reducer = combineReducers({
    productManage,
    reducertesting,
    toggletheme
});
export default reducer;
//the returned reducer is the function which takes the global state as the first parameter and the action type as the second parater on the basis of which the state changes.//