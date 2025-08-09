import { UnknownAction } from "redux";
import { IconType } from "react-icons";
import { NextRouter } from "next/router";
import { Document } from "mongoose";
import { Session } from "next-auth";
import { FieldValues, UseFormRegister } from "react-hook-form";
export type IModal = {
    open: boolean;
    content?: JSX.Element | React.FC | any;
    width?: number | string | null;
    height?: number | string | null;
    title?: string;
    purpose?: string;
    confirmProcess: any;
    closeModal: () => void;
    loader?: boolean;
    showIcon?: boolean
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
    size?: string;
    variant?: string;
    price?: number;
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
    tablebody: Array<DataType>;
    theme?: {
        light: boolean;
        dark: boolean
    }
}
export type Slides = {
    visibleSlides?: number;
}
export interface IProductModel extends Document {
    title: string
    slug: string,
    desc: string,
    img: string,
    category: string,
    size: string,
    color: string,
    price: number,
    availableQuantity: number,
    createdAt: any;
    updatedAt: any;
    productOrientations?: string;
    tags?: string
}
export interface ISchema extends Document {
    email: string;
    password: string;
    username?: string;
    image?: string;
}
export interface ICustomSession extends Session {
    user: {
        name: string;
        email: string;
        image: string | undefined
    } | any
}
export type IPagination = {
    totalRecords: number,
    recordsPerpage: number
}
export type IMugs = { name: string; age: number; loader: false; progress: number, page: number; pages: number[] }
//for dynamic params///
export interface IType {
    id: string
}
export interface Product {
    title: string;
    desc: string;
    img: string;
    colors: string[];
    sizes: string[];
    price: number;
    slug: string;
    category?: string;
    availableQuantity?: number;
    tags?: string;
    productOrientations?: string;
}

export interface TShirtState {
    products: Record<string, Product>;
    loading: boolean;
    progress: number;
    page: number;
    session: Session | null;
    isMobileFilterpositive: boolean;
}

export interface TShirtProps {
    theme: {
        light: boolean;
        dark: boolean;
    };
    router: NextRouter;
    shirts: FormatisedList
}
export type IForm = {
    email: string;
    password: string;
    checkStatus?: boolean;
}
export type IShirts = {
    title: string;
    slug: string;
    desc: string;
    img: string;
    category: string;
    size: string;
    color: string;
    price: number;
    availableQuantity: number;
    productOrientations: string;
    tags: string
}
export interface iShirts extends Omit<IShirts, "size" | "color"> {
    sizes: string[];
    colors: string[]
}
export type FormatisedList = {
    [key: string]: iShirts
}
export interface ISignup {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    checkStatus?: boolean;
    image?: File;
}
export interface User {
    username: string;
    email: string;
    password: string;
    image: string;
}

export interface AccountDetails {
    name: string;
    email: string;
    image: string;
}

export interface FormField {
    type: string;
    name: string;
    placeholder: string;
}

export type IHoodie = { _id: number; title: string; desc: string; img: string; category: string; size: string; color: string; price: number; availableQuantity: number; createdAt: string; updatedAt: string; slug: string; productOrientations?: string; tags?: string };

export type iLabelProps = {
    labelHead: string;
    description: string;
}
export type IFormField<T extends FieldValues> = {
    register: UseFormRegister<T>
}