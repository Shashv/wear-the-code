import React from "react";
import { THEME } from "../constants/index";
const toggletheme = (payload: { light: boolean; dark: boolean }) => {
    return {
        type: THEME,
        payload
    }
}
export default toggletheme;