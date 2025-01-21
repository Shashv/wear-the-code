import { createContext } from "react";
const ContextWrapper = createContext<(status: boolean) => void>(() => { });
export default ContextWrapper;