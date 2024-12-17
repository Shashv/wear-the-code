import { IActionCreator } from "../constants";
import { SUCCESS, ERROR, LOADING } from "../constants";
let initialState: {
    loading: boolean,
    data: [],
    error: Error | null | any
} = {
    loading: false,
    data: [],
    error: null
}
const reducertesting: (state: typeof initialState, actions: IActionCreator) => typeof initialState = (state = initialState, actions) => {
    switch (actions.type) {
        case LOADING: return { ...state, loading: true };
        case SUCCESS: return { ...state, loading: false, data: actions.payload };
        case ERROR: return { ...state, loading: false, data: actions.payload };
        default: return state;
    }
}

export default reducertesting;