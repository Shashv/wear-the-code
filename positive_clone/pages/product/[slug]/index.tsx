import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.module.css";
import StyledModal from "@/components/styledpopup";
import { useRouter } from "next/router";
import { Typography, Grid } from "@mui/material";
import addProduct from "@/redux/actions/addProduct";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/redux/sore";
import style from "./index.module.css";
import { IShirts } from "@/pages/api/getProducts";
import useSearchParamsstate from "@/hooks/useSearchParams";
import ColorLabel from "@/components/colorLabels";
import buyProduct from "@/redux/actions/buyproduct";
import clearCart from "@/redux/actions/clearCart";
import ProductModel from "@/modalsmongoose/product";
import { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import { getServerSession } from "next-auth";
import authorizeOptions from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

interface IProductType {
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

interface PinState {
    pinError: string;
    pin: string | null;
    servicePending: boolean;
}

const INITIAL_PRODUCT_STATE: IShirts = {
    title: null,
    desc: null,
    img: null,
    availableQuantity: null,
    price: 0,
    category: null,
    size: null,
    color: null,
    slug: null
};

interface ProductProps {
    productId?: string;
    type: string;
}

const ProductClient: NextPage<ProductProps> = ({ productId, type }) => {
    const [selectedProduct, setSelectedProduct] = useState<IShirts>(INITIAL_PRODUCT_STATE);
    const [service, setService] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [productVariant, setProductvariant] = useState<Record<string, any>>({});
    const [pin, setPin] = useState<PinState>({ pinError: "", pin: null, servicePending: false });

    const router = useSearchParamsstate();
    const routerDetail = useRouter();
    const dispatch = useDispatch();
    const serviceRef = useRef<HTMLButtonElement>(null);
    const session = useSession();
    
    const theme = useSelector((state: IState) => state.toggletheme);
    const state = useSelector((state: IState) => state.productManage);
    const productsBought = useSelector((state: IState) => state.buyNow);

    const fetchProduct = useCallback(async (productName: string) => {
        const response = await fetch(`/api/shirts?type=${productName}`);
        return response.json();
    }, []);

    useEffect(() => {
        const loadProduct = async () => {
            setLoader(true);
            try {
                const data = await fetchProduct(type);
                setProductvariant(data.productVariant);
                setSelectedProduct(data.product[0]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoader(false);
            }
        };
        loadProduct();
    }, [type, fetchProduct]);

    useEffect(() => {
        if (session.status === "unauthenticated") {
            routerDetail.replace("/authentication/login");
        }
    }, [session, routerDetail]);

    useEffect(() => {
        const handleServiceClick = () => setService(true);
        
        if (serviceRef.current) {
            serviceRef.current.addEventListener("click", handleServiceClick);
            return () => serviceRef.current?.removeEventListener("click", handleServiceClick);
        }
    }, []);

    const closeModal = useCallback(() => {
        setService(false);
        setPin({ pinError: "", pin: null, servicePending: false });
    }, []);

    const buyNow = useCallback(async () => {
        if (productsBought[selectedProduct?.slug || ""]) {
            toast.info("Product already selected", {
                theme: theme.light ? "light" : "dark",
                autoClose: 2000,
                position: "top-center"
            });
            return;
        }

        const orderData = {
            name: selectedProduct?.title || "",
            product: selectedProduct.slug,
            quantity: selectedProduct?.availableQuantity || 1,
            price: selectedProduct?.price,
            variant: selectedProduct?.color || "",
            size: selectedProduct?.size || ""
        };

        dispatch(buyProduct(orderData));
        dispatch(clearCart({}));

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                body: JSON.stringify(orderData)
            });
            await response.json();
            
            toast.success("Product added to cart for delivery", {
                theme: theme.light ? "light" : "dark",
                autoClose: 2000,
                position: "top-center"
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product");
        }
    }, [selectedProduct, productsBought, dispatch, theme.light]);

    const addToCart = useCallback(() => {
        const existingProduct = Object.keys(state).find(key => key === routerDetail.query.slug);
        
        if (existingProduct) {
            toast.info("Item already added to cart", {
                theme: theme.light ? "light" : "dark",
                autoClose: 2000
            });
            return;
        }

        dispatch(addProduct({
            name: selectedProduct?.title || "",
            product: selectedProduct.slug,
            size: selectedProduct?.size || "",
            variant: selectedProduct?.color || "",
            price: selectedProduct?.price || 0,
            quantity: 1
        }));

        toast.success("Item added to cart", {
            theme: theme.light ? "light" : "dark",
            autoClose: 2000
        });
    }, [selectedProduct, state, routerDetail.query.slug, dispatch, theme.light]);

    return (
        <div className={style.product}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className={style.imageContainer}>
                        {loader ? (
                            <div>Loading...</div>
                        ) : (
                            <img 
                                src={selectedProduct?.img || ""} 
                                alt={selectedProduct?.title || ""}
                                className={style.productImage}
                            />
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={style.productDetails}>
                        <Typography variant="h4">{selectedProduct?.title}</Typography>
                        <Typography variant="body1">{selectedProduct?.desc}</Typography>
                        <Typography variant="h6">Price: ${selectedProduct?.price}</Typography>
                        <div className={style.actions}>
                            <button onClick={addToCart} className={style.addToCart}>
                                Add to Cart
                            </button>
                            <button onClick={buyNow} className={style.buyNow}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <StyledModal
                open={service}
                closeModal={closeModal}
                title="Check Service Availability"
                content={<div>Service availability check content</div>}
                confirmProcess={() => {}}
            />
        </div>
    );
};

export default ProductClient;