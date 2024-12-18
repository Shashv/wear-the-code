import { UnknownAction } from "redux";
import { IconType } from "react-icons";
export type IModal = {
    open: boolean;
    content?: JSX.Element | React.FC | any;
    width?: number | string;
    height?: number | string;
    title?: string;
    purpose?: string;
    confirmProcess: any;
    closeModal: () => void;
    loader?: boolean;
}
export type INavSelected = {
    hoodies: {
        selected: boolean;
        value: string;
    };
    mugs: {
        selected: boolean;
        value: string;
    };
    stickers: {
        selected: boolean;
        value: string;
    };
    tshirts: {
        selected: boolean;
        value: string
    },
    mousepads: {
        selected: boolean;
        value: string;
    },
    zippers: {
        selected: boolean;
        value: string;
    }
};
export interface IToast {
    open?: boolean;
    variant?: "warning" | "primary" | "secondary" | "info" | "error" | "success" | string;
    onClose: (e: React.MouseEvent, timeOut: ReturnType<typeof setTimeout> | any) => void;
    autoHide?: () => void;
    message?: string;
    anchorOrigin?: {
        vertical: string;
        horiontal: string;
    };
}
export interface IToastState {
    message: string;
    anchorOrigin: {
        vertical: "top" | "middle" | "bottom" | "" | string,
        horizontal: "start" | "middle" | "bottom" | "" | string;
    };
    variant: "error" | "info" | "success" | ""
}
export interface IDrawer {
    open: boolean;
    width?: number | string;
    height?: number | string;
    list?: string[];
    reviewCart: boolean;
    closeDrawer: (e: React.MouseEvent<HTMLElement>) => void;
    reduxAdd: (e: { name: string; price: number; quantity: number; variant: string; size: string; product: string }) => { type: string; payload: any } | void | UnknownAction | any;
    reduxSubtract: (e: { name: string; price: number; quantity: number; variant: string; size: string; product: string }) => { type: string; payload: any } | void | UnknownAction | any;
}
export type IPositive = {
    Component: React.ReactNode | React.ReactElement | JSX.Element | any;
    props: {
        session: any;
        pageProps: any
    }
}
export type ISpinner = {
    show?: boolean;
    size?: number | string;
    color?: "warning" | "primary" | "secondary" | "light" | "dark" | "info" | "danger"
}
export type ICartProduct = {
    name?: string;
    size?: string ;
    variant?: string;
    price?: number ;
    quantity?: number;
    product: any;
}
export type ICartState = {
    [key: string]: ICartProduct
}
export type ILayout = {
    children: React.ReactNode
}
export interface IRegisterOptions {
    name: string;
    email: string;
    address: string;
    phone: string;
    city: string;
    pinCode: string;
}

export interface IOpenGraphImage {
    params: {
        slug: string;
    },
    id?: number;
}
export interface ICollectionCard {
    collectionName: string;
    thumbnail: string;
}
export interface ITagList {
    logo: React.ReactNode,
    label: string;
    desciption: string;
    theme: {
        light: boolean;
        dark: boolean;
    }
}
export interface ITheme {
    light: boolean;
    dark: boolean;
}
export interface ITableData<DataType> {
    tablehead: Array<DataType>;
    tablebody: Array<unknown>
}
export type Slides = {
    visibleSlides?:number;
}