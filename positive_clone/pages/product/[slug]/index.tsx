type Positive = {
    color: "Pink" | "Blue" | "White";
    size: "L" | "SM" | "M" | "XXL" | "XL" | string;
}
import React, { useEffect, useRef } from "react";
import "./index.module.css";
import { useState } from "react";
import StyledModal from "@/components/styledpopup";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Typography, Backdrop, CircularProgress, Grid } from "@mui/material";
import Loader from "@/components/loader";
import addProduct from "@/redux/actions/addProduct";
import { useDispatch, useSelector } from "react-redux";
import StyledToast from "@/components/toast";
import { IState } from "@/redux/sore";
import style from "./index.module.css";
import { IShirts } from "@/pages/api/getProducts";
import useSearchParamsstate from "@/hooks/useSearchParams";
import ColorLabel from "@/components/colorLabels";
import buyProduct from "@/redux/actions/buyproduct";
import LoaderAnimate from "@/components/loader";
import useToast from "@/hooks/useToast";
import clearCart from "@/redux/actions/clearCart";
import ProductModel from "@/modalsmongoose/product";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
type IProductType = {
    alone_back: string;
    alone_front: string;
    image_front: string;
    packed: string;
    image_back: string;
    id: number;
    available_shades: string;
    description: string;
    name: string;
    positive: string;
    type: string;
    variant: string;
}
const ProductClient: NextPage<{ productId?: string, type: string }> = ({ productId, type }) => {
    let [selectedProduct, setSelectedProduct] = useState<IShirts>({
        title: null,
        desc: null,
        img: null,
        availableQuantity: null,
        price: 0,
        category: null,
        size: null,
        color: null,
        slug: null
    });
    let router = useSearchParamsstate();
    let [servie, setService] = useState<boolean>(false);
    const [selectedDisplay, setSelectedDisplay] = useState<string>("image_front.jpg");
    const [loader, setLoader] = useState<boolean>(false);
    const [productVariant, setProductvariant] = useState<any>({});
    let serviceRef = useRef<HTMLButtonElement>(null);
    let routerDetail = useRouter();
    let dispatch = useDispatch();
    let [customtoast, setCustomToast] = useState<{
        variant: "error" | "primary" | "success" | "warning" | "info",
        origin: {
            vertical: "top" | "middle" | "horizontal",
            horizontal: "start" | "middle" | "end"
        }
        autoHideDuration?: number;
        open: boolean,
        message: string;
    }>({
        variant: "success",
        origin: {
            vertical: "top",
            horizontal: "end"
        },
        open: false,
        message: ""
    });
    let productsBought = useSelector((state: IState) => state.buyNow);
    let toastOptions = useToast();
    let [pin, setPin] = useState<{ pinError: boolean | any; pin: any; servicePending: boolean }>({ pinError: "", pin: null, servicePending: false });
    let snackbar = useSnackbar();
    let slug: string | string[] | any = "";
    let sizes: string[] = [];
    let state = useSelector((state: IState) => state.productManage);
    const fetchProduct = async (productName: string): Promise<{ product: IProductType[], productVariant: { [key: string]: { [key: string]: { slug: string } } } }> => {
        let shirt = await fetch(`/api/shirts?type=${productName}`, {
            method: "GET",
        });
        let parsedshirt = await shirt.json();
        return parsedshirt;
    }
    //client side api calls
    useEffect(() => {
        setLoader(true);
        fetchProduct(type).then(shirt => {
            setProductvariant(shirt.productVariant);
            setSelectedProduct((selectedProduct) => (shirt.product[0]));
            setLoader(false);
        }).catch(er => {
            console.log(er);
        });
    }, []);
    useEffect(() => {
        slug = routerDetail?.query?.slug || "";
        if (serviceRef.current) {
            serviceRef?.current?.addEventListener("click", (e: MouseEvent) => {
                setService(true);
            });
        }
        Object.keys(productVariant).map(color => {
            Object.keys(productVariant[color]).forEach(size => {
                if (sizes.includes(size)) {
                    return;
                }
                else {
                    sizes.push(size);
                }
            })
        });
        return () => serviceRef.current?.removeEventListener("click", (e: MouseEvent) => setService(true))
    });
    //end//
    const closeModal = () => {
        setService(false);
        setPin({ ...pin, pinError: false, pin: "" });
    }
    function buyNow(e: React.MouseEvent<HTMLButtonElement>) {
        if (Object.keys(productsBought).includes(selectedProduct?.slug || "")) {
            toastOptions("Product already selected", "info");
        }
        else {
            dispatch(buyProduct({ name: selectedProduct?.title || "", product: selectedProduct.slug, quantity: selectedProduct?.availableQuantity || 1, price: selectedProduct?.price, variant: selectedProduct?.color || "", size: selectedProduct?.size || "" }))
            toastOptions("Product added to cart for delivery", "success");
            dispatch(clearCart({}));
        }
    }
    let id: any | string | number;
    let theme = useSelector((state: IState) => state.toggletheme);
    let magicFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            clearTimeout(id);
            id = setTimeout(() => {
                setPin({ ...pin, servicePending: true });
                fetch("/api/pincode", { method: "POST", body: JSON.stringify(e.target.value) }).then(response => response.json()).then(pin => {
                    if (pin.message === "Service Available") {
                        setPin({ ...pin, pinError: "false", pin: pin.findedPin.toString(), servicePending: false })
                    }
                    else {
                        setPin({ ...pin, pinError: "true", pin: "", servicePending: false })
                    }
                })
            }, 2000);
        }
        else {
            clearTimeout(id);
            setPin({ ...pin, pin: "", pinError: "", servicePending: false })
        }
    }
    const reload = (e: React.MouseEvent<HTMLOptionElement>) => {
        window.location.reload();
    }
    const addToCart: () => void = () => {
        let findedKey: string = Object.keys(state).find(key => key === routerDetail.query.slug) || "";
        if (findedKey) {
            setCustomToast({
                ...customtoast, open: true, variant: "info", origin: {
                    vertical: "top",
                    horizontal: "end"
                }, message: "Item already added to the cart!"
            });
        }
        else {
            console.log("selectedproduct", selectedProduct.slug)
            dispatch(addProduct({ name: selectedProduct?.title || "", product: selectedProduct.slug, size: selectedProduct?.size || "", variant: selectedProduct?.color || "", price: selectedProduct?.price || 0, quantity: 1 }));
            setCustomToast({
                ...customtoast, open: true, variant: "success", origin: {
                    vertical: "top",
                    horizontal: "end"
                }, message: "Item added to the cart!"
            });
        }
    }
    const babaJi: (e: React.MouseEvent, timeout: ReturnType<typeof setTimeout>) => void = (e, timeout) => {
        clearTimeout(timeout);
        setCustomToast({
            ...customtoast, open: false
        });
    };
    const setOpen8: () => void = () => {
        setCustomToast({ ...customtoast, open: false });
    }
    const refreshVariants = (newColor: string, newSize: string) => {
        router.getDetails().replace(productVariant[newColor][newSize]["slug"]);
    }
    const selectProduct: (e: React.MouseEvent<HTMLOptionElement>) => void = e => {

    }
    const ModalContent: JSX.Element = <div className="d-flex flex-column w-100">
        <input className={!pin.servicePending ? "bg-light rounded-4 p-4 rounded-2" : "rounded-4 p-4 rounded-2 backdrop-blur-2xl bg-light"} style={{ border: "2px solid pink", outline: "2px solid pink" }} defaultValue={pin.pin} type="text" placeholder="Enter six digit Service Locality Code" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            magicFunction(e);
        }
        } />
        {pin.pinError === "false" && <Typography className="" variant={"subtitle2"} color={"green"} position={"absolute"} left={"50px"} top={"165px"}>
            Yay,service available*
        </Typography>}
        {pin.pinError === "true" && <Typography className="" variant={"subtitle2"} color={"red"} position={"absolute"} left={"50px"} top={"165px"}>
            So,sorry service not
            available</Typography>}
    </div>
    return (
        <>
            {loader ? <Backdrop open className="flex flex-column justify-center align-center">
                <LoaderAnimate />
            </Backdrop> :
                <>
                    <StyledToast anchorOrigin={{
                        vertical: "top",
                        horiontal: "end"
                    }} variant={customtoast.variant} open={customtoast.open} message={customtoast.message} onClose={babaJi} autoHide={() => setCustomToast({ ...customtoast, open: false })} />
                    <div className={theme.light ? `${style.productpagelight}` : `${style.productpagedark}`}>
                        <section className="text-gray-600 body-font overflow-hidden">
                            <div className="container-fluid">
                                <div className="row px-5">
                                    <div className={`col-md-5 col-sm-12 ${style.imageholder}`}>
                                        <div className="d-flex flex-column align-items-center justify-start gap-3 w-[20%]">
                                            {/* commented for the time being */}
                                            {/* <img className={selectedDisplay === product.image_front ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.image_front}`} onClick={() => setSelectedDisplay(product.image_front)} />
                                            <img className={selectedDisplay === product.image_back ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.image_back}`} onClick={() => setSelectedDisplay(product.image_back)} />
                                            <img className={selectedDisplay === product.alone_back ? `outline-orange-400 border border-none ${style.selectedvariant}` : `outline-slate-200 border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.alone_front}`} onClick={() => setSelectedDisplay(product.alone_back)} />
                                            <img className={selectedDisplay === product.alone_front ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.alone_back}`} onClick={() => setSelectedDisplay(product.alone_front)} />
                                            <img className={selectedDisplay === product.positive ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.positive}`} onClick={() => setSelectedDisplay(product.positive)} /> */}
                                            {/* end */}
                                        </div>
                                        <div className="main-display w-[90%] h-100">
                                            <img alt="egoocommerce" className={`transition-all duration-300 hover:scale-105`} src={selectedProduct?.img || ""} />
                                        </div>
                                    </div>
                                    <div className="col-md-7 col-sm-12 p-2 ps-5">
                                        <h2 className={theme.light ? "text-gray-500 tracking-widest" : `tracking-widest ${style.codesweardark}`}>CODESWEAR</h2>
                                        <h1 className={theme.light ? "text-gray-900 text-3xl title-font font-medium mb-1" :
                                            "text-light text-3xl title-font"
                                        }>{selectedProduct.title} ({selectedProduct.size}/{selectedProduct.color})</h1>
                                        <div className="description-holder my-1">
                                            <Typography className="" variant="h6" fontWeight={"700"} color={"#9ca3af"}>
                                                Product Description:
                                            </Typography>
                                            <p className={theme.light ? "leading-relaxed " : "text-light"}>
                                                {selectedProduct.desc}
                                            </p>
                                        </div>
                                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                            <div className="flex-column ">
                                                <Typography className={theme.light ? `mr-3` : `text-light mr-3`}>Color:{ }</Typography>
                                                <Grid container columnGap={0.55}>
                                                    {Object.keys(productVariant).map(color => {
                                                        return <Grid className="cursor-pointer" item key={color}>
                                                            <ColorLabel key={color} onClick={(e) => {
                                                                setSelectedProduct(state => ({ ...state, color, size: Object.keys(productVariant[color])[0], slug: productVariant[color][Object.keys(productVariant[color])[0]]["slug"], price: productVariant[color][Object.keys(productVariant[color])[0]]["price"] }))
                                                                refreshVariants(color, Object.keys(productVariant[color])[0]);
                                                            }
                                                            } selected={color === selectedProduct.color} hexcode={color} />
                                                        </Grid>
                                                    }
                                                    )}
                                                </Grid>
                                            </div>
                                            <div className="flex ml-6 items-center">
                                                <span className={theme.light ? "mr-3" : "text-light mr-3"}>Size</span>
                                                <div className="relative bg-light rounded-2 border-light">
                                                    <select defaultValue={selectedProduct?.size?.toLowerCase() || ""} className="rounded border appearance-none border-pink-300 px-7 py-1" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                        setSelectedProduct({ ...selectedProduct, size: e.currentTarget.value.toUpperCase(), slug: productVariant[selectedProduct?.color || ""][e.currentTarget.value.toUpperCase()].slug, price: productVariant[selectedProduct?.color || ""][e.currentTarget.value.toUpperCase()]["price"] });
                                                        refreshVariants(selectedProduct?.color || "", e.currentTarget.value.toUpperCase());
                                                    }}>
                                                        {Object.keys(productVariant[selectedProduct?.color || ""] || {}).map(size => <option selected={size === selectedProduct.size} className="" key={size}>{size}</option>)}
                                                    </select>
                                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                            <path d="M6 9l6 6 6-6"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <div className="">
                                                <span className={theme.light ? "title-font font-medium text-2xl text-gray-900" : "text-light text-2xl font-medium"}>${selectedProduct.price}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={buyNow} className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                                                <button className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
                                                    addToCart()
                                                }}>Add to Cart</button>
                                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="check-service mt-2">
                                            <button ref={serviceRef} className="bg-pink-500 text-light border-pink-400 outline-pink-400 px-3 py-2 focus:border-none rounded-1 hover:bg-indigo-500">
                                                Check Location Service with pin code
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <StyledModal confirmProcess={() => null} title="Check Your Desired Location Code" loader={pin.servicePending} open={servie} closeModal={() => closeModal()} content={ModalContent} width={"500px"} height={"250px"} />
                        </section>
                    </div>
                </>
            }

        </>
    )
}
export default ProductClient;
let pins: string = "";
const fetchPins = async (value: string) => {
    let pinsJson = await fetch("/api/pincode", { method: "POST", body: JSON.stringify(value) });
    let pins = await pinsJson.json();
    return pins;
}

//server side logic//
export const getServerSideProps: GetServerSideProps<{
    productVariant: {
        [key: string]: {
            [key: string]: {
                slug: string;
                price: number;
            }
        }
    }, product: Array<any>
}> = async context => {
    let responseproduct = await ProductModel.find({ slug: context.query.slug }).lean();
    const availableshirts: any[] = await ProductModel.find({ title: responseproduct[0].title, category: responseproduct[0].category }).lean();
    const colorslug: {
        [key: string]: {
            [key: string]: {
                slug: string;
                price: number;
            }
        }
    } = {};
    let modifiedResponse = responseproduct.map((product: any, index: number) => ({ ...product, createdAt: new Date(product.createdAt).toLocaleString(), updatedAt: new Date(product.updatedAt).toLocaleString(), _id: index }));
    for (let shirtVaraints of availableshirts) {
        if (shirtVaraints.color in colorslug) {
            colorslug[shirtVaraints.color][shirtVaraints.size] = { slug: shirtVaraints.slug, price: shirtVaraints.price }
        }
        else {
            colorslug[shirtVaraints.color] = {};
            colorslug[shirtVaraints.color][shirtVaraints.size] = { slug: shirtVaraints.slug, price: shirtVaraints.price }
        }
    }
    return {
        props: {
            productVariant: colorslug,
            product: modifiedResponse,
            type: responseproduct[0].slug
        }
    }
}