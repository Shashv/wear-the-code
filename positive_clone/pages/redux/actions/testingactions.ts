import redux from "redux";
import logger from "redux-logger";
import { IActionCreator } from "../constants";
import { LOADING, SUCCESS, ERROR } from "../constants";

const loadingData: () => IActionCreator = () => {
    return {
        type: LOADING,
        payload: null
    }
}
const successData: (payload: any) => IActionCreator = (payload) => {
    return {
        type: SUCCESS,
        payload
    }
}
const errorData: (payload: any) => IActionCreator = (payload) => {
    return {
        type: ERROR,
        payload
    }
}

export const functionLogger = () => {
    return async (dispatch: any) => {
        dispatch(loadingData());
        fetch("https://jsonplaceholder.typicode.com/todos").then(response => response.json()).then(data => dispatch(successData(data))).catch(er => dispatch(errorData(er)))
    }
}