export const ADDPRODUCT = "addProduct";
export const REMOVEPRODUCT = "removeProduct";
export const CLEARCART = "clearcart";
export const LOADING = "loading";
export const SUCCESS = "success";
export const ERROR = "error";
export const POSITIVE = "positive";
export const REMOVEBUYPRODUCT = "removebuyproduct";
export const ADDBUYPRODUCT = "addbuyproduct";
export const CLEARNEGATIVE = "negative";
export interface IActionCreator {
    type: string;
    payload: any;
}
export const THEME = "theme";