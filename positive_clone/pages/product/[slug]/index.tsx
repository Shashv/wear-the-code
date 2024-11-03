type Positive = {
    color: "Pink" | "Blue" | "White";
    size: "lg" | "sm" | "md" | "xl" | string;
}
import React, { useEffect, useRef } from "react";
import "./index.module.css";
import { useState } from "react";
import StyledModal from "@/components/styledpopup";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Typography, Backdrop, CircularProgress, Grid } from "@mui/material";
import Loader from "@/components/loader";
import addProduct from "@/pages/redux/actions/addProduct";
import { useDispatch, useSelector } from "react-redux";
import StyledToast from "@/components/toast";
import { IState } from "@/pages/redux/sore";
import style from "./index.module.css";
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
const ProductClient: React.FC<{ productId?: string, type: string }> = ({ productId, type }) => {
    console.log("Product Id", productId, "Type", type);
    let [selectedProduct, setSelectedProduct] = useState<Positive>({ color: "Blue", size: "md" });
    let [servie, setService] = useState<boolean>(false);
    const [selectedDisplay, setSelectedDisplay] = useState<string>("image_front.jpg");
    const [loader, setLoader] = useState<boolean>(false);
    const [product, setProduct] = useState<{
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
    }>({
        image_front: "",
        image_back: "",
        alone_back: "",
        alone_front: "",
        packed: "",
        name: "",
        description: "",
        available_shades: "",
        id: 0,
        positive: "",
        type: "",
        variant: ""
    });
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
    let [pin, setPin] = useState<{ pinError: boolean | any; pin: any; servicePending: boolean }>({ pinError: "", pin: null, servicePending: false });
    let snackbar = useSnackbar();
    let slug: string | string[] | any = "";
    let state = useSelector((state: IState) => state.productManage);
    const fetchProduct = async (productName: string): Promise<{ product: IProductType }> => {
        let shirt = await fetch(`/api/shirts?type=${productName}`, {
            method: "GET",
        });
        let parsedshirt = await shirt.json();
        return parsedshirt;
    }
    useEffect(() => {
        serviceRef?.current?.addEventListener("click", (e: MouseEvent) => {
            setService(true);
        });
        slug = routerDetail?.query?.slug || "";
        setLoader(true);
        fetchProduct(type).then(shirt => {
            // console.log("Shirts fetched from the fucntion", shirt.product);
            setProduct(shirt.product);
            setLoader(false);
        })
    }, []);
    const closeModal = () => {
        setService(false);
        setPin({ ...pin, pinError: false, pin: "" });
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
            dispatch(addProduct({ name: routerDetail.query.slug, product: routerDetail.query.slug, size: selectedProduct.size, variant: selectedProduct.color, price: 10, quantity: 1 }));
            setCustomToast({
                ...customtoast, open: true, variant: "success", origin: {
                    vertical: "top",
                    horizontal: "end"
                }, message: "Item added to the cart!"
            });
        }
    }
    const babaJi: (e: React.MouseEvent, timeout: ReturnType<typeof setTimeout>) => void = (e, timeout) => {
        // console.log(timeout);
        clearTimeout(timeout);
        setCustomToast({
            ...customtoast, open: false
        });
    };
    const setOpen8: () => void = () => {
        setCustomToast({ ...customtoast, open: false });
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
            {loader ? <Backdrop open>
                <CircularProgress sx={{ color: "#e41edc", fontSize: 100 }} />
            </Backdrop> :
                <>
                    <StyledToast anchorOrigin={{
                        vertical: "top",
                        horiontal: "end"
                    }} variant={customtoast.variant} open={customtoast.open} message={customtoast.message} onClose={babaJi} autoHide={() => setCustomToast({ ...customtoast, open: false })} />
                    <div className={theme.light ? `${style.productpagelight}` : `${style.productpagedark}`}>
                        <section className="text-gray-600 body-font overflow-hidden">
                            {/* <Container fluid> */}
                            <div className="container-fluid">
                                <div className="row px-5">
                                    <div className={`col-md-5 col-sm-12 ${style.imageholder}`}>
                                        {/* for the product list */}
                                        <div className="d-flex flex-column align-items-center justify-start gap-3 w-[20%]">
                                            <img className={selectedDisplay === product.image_front ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.image_front}`} onClick={() => setSelectedDisplay(product.image_front)} />
                                            <img className={selectedDisplay === product.image_back ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.image_back}`} onClick={() => setSelectedDisplay(product.image_back)} />
                                            <img className={selectedDisplay === product.alone_back ? `outline-orange-400 border border-none ${style.selectedvariant}` : `outline-slate-200 border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.alone_front}`} onClick={() => setSelectedDisplay(product.alone_back)} />
                                            <img className={selectedDisplay === product.alone_front ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.alone_back}`} onClick={() => setSelectedDisplay(product.alone_front)} />
                                            <img className={selectedDisplay === product.positive ? `border border-none ${style.selectedvariant}` : `border border-none ${style.unselectedvariant}`} src={`/shirts/${product.type}/${product.positive}`} onClick={() => setSelectedDisplay(product.positive)} />
                                        </div>
                                        <div className="main-display w-[90%] h-100">
                                            <img alt="egoocommerce" className={`transition-all duration-300 hover:scale-105`} src={`/shirts/${product.type}/${selectedDisplay}`} />
                                        </div>
                                    </div>
                                    <div className="col-md-7 col-sm-12 p-2 ps-5">
                                        <h2 className={theme.light ? "text-gray-500 tracking-widest" : `tracking-widest ${style.codesweardark}`}>CODESWEAR</h2>
                                        <h1 className={theme.light ? "text-gray-900 text-3xl title-font font-medium mb-1" :
                                            "text-light text-3xl title-font"
                                        }>{product.name} ({selectedProduct.size.toUpperCase()}/{selectedProduct.color})</h1>
                                        <div className="description-holder my-1">
                                            <Typography className="" variant="h6" fontWeight={"700"} color={"#9ca3af"}>
                                                Product Description:
                                            </Typography>
                                            <p className={theme.light ? "leading-relaxed " : "text-light"}>
                                                {/* Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan. */}
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                            <div className="flex-column ">
                                                <Typography className={theme.light ? `mr-3` : `text-light mr-3`}>Color:{ }</Typography>
                                                {/* <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" onClick={() => setSelectedProduct({ ...selectedProduct, color: "White" })}></button>
                                                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" onClick={() => setSelectedProduct({ ...selectedProduct, color: "Blue" })}></button>
                                                <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none" onClick={() => setSelectedProduct({ ...selectedProduct, color: "Pink" })}></button> */}
                                                <Grid container>
                                                    <Grid item>

                                                    </Grid>
                                                    <Grid item></Grid>
                                                    <Grid item></Grid>
                                                    <Grid item></Grid>
                                                </Grid>
                                            </div>
                                            <div className="flex ml-6 items-center">
                                                <span className={theme.light ? "mr-3" : "text-light mr-3"}>Size</span>
                                                <div className="relative bg-light rounded-2 border-light">
                                                    <select className="rounded border appearance-none border-pink-300 py-2 focus:outline-pink focus:ring-2 focus:rounded-2 focus:ring-indigo-200 focus:border-pink-500 text-base bg-light pl-3 pr-10" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProduct({ ...selectedProduct, size: e.currentTarget.value })}>
                                                        <option value={"sm"}>SM</option>
                                                        <option value={"md"}>M</option>
                                                        <option value={"lg"}>L</option>
                                                        <option value={"xlg"}>XL</option>
                                                    </select>
                                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                            <path d="M6 9l6 6 6-6"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <div className="">
                                                <span className={theme.light ? "title-font font-medium text-2xl text-gray-900" : "text-light text-2xl font-medium"}>$58.00</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                                                <button className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => {
                                                    addToCart()
                                                }}>Add to Cart</button>
                                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
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
export const getServerSideProps: (context: any) => Promise<{ props: { productId?: string, type: string } }> = async (context) => {
    return {
        props: {
            type: context.query.slug
        }
    }
}