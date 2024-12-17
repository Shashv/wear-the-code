import React from "react";
import { THEME } from "../constants";
interface IStateType {
    light: boolean;
    dark: boolean;
}
let initialState: IStateType = {
    light: false,
    dark: false
}
let toggletheme: (state: IStateType, actions: { type: string; payload: any }) => IStateType = (state = initialState, actions) => {
    switch (actions.type) {
        case THEME: return {
            ...state, light: actions.payload.light, dark: actions.payload.dark
        };
        default: return state;
    }
}
export default toggletheme;