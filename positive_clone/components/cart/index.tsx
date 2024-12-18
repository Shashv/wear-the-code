import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import { IDrawer } from "@/modals";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";
import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch,IState } from "@/redux/sore";
import { useState } from "react";
import addProduct from "@/redux/actions/addProduct";
import { IoBagCheckOutline } from "react-icons/io5";
import { ICartProduct } from "../../modals/index";
import clearCart from "@/redux/actions/clearCart";
import Link from "next/link";
import style from "./index.module.css";
import StyledModal from "../styledpopup";
import StyledToast from "../../components/toast/index";
import removeBuyProduct from "@/redux/actions/removeBuyproduct";
import addBuyproduct from "@/redux/actions/addBuyproduct";
import clearBuyproducts from "@/redux/actions/clearBuyProducts";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/router";
const CustomDrawer: React.FC<IDrawer> = ({ open, width, height, list, closeDrawer, reduxAdd, reduxSubtract, reviewCart }) => {
    const dispatch: IDispatch = useDispatch();
    let state = useSelector((state: IState) => state.productManage);
    let buyProduct = useSelector((state: IState) => state.buyNow);
    const router = useRouter();
    let cartState: ICartProduct = {
        name: "",
        size: "",
        variant: "",
        price: 0,
        quantity: 0,
        product: ""
    }
    let [clearCartConfirmation, setClearCartConfirmation] = useState<boolean>(false);
    let [toast, setToast] = useState<boolean>(false);
    const ModalContent: JSX.Element = <>
    </>
    const confirmClearCart: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
        dispatch(clearCart({}));
        setClearCartConfirmation(false);
        closeDrawer(e);
        setToast(true);
    }
    const confirmClearBuyProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(clearBuyproducts());
        dispatch(clearCart({}));
        setClearCartConfirmation(false);
        closeDrawer(e);
        setToast(true);
    }
    const checkoutandClose: (e: React.MouseEvent<HTMLButtonElement>) => void = e => {
        closeDrawer(e);
        router.push("/checkout");
    }
    let babaji: (e: React.MouseEvent, timeOut: ReturnType<typeof setTimeout>) => void = (e, tme) => {
        setToast(false);
    }
    let productList: string[] = Object.keys(state);
    let amount: number = 0;
    productList.forEach(key => amount = amount + state[key].quantity * state[key].price);
    let totalAmount: number = 0;
    Object.keys(buyProduct).forEach(product => {
        totalAmount += totalAmount + buyProduct[product].price * buyProduct[product].quantity;
    });
    return (
        <>
            {
                reviewCart ?
                    <Drawer open={open} anchor={"right"} className={styles.customdrawer} onClose={closeDrawer} transitionDuration={350} PaperProps={{
                        sx: {

                            width: {
                                xs: 300,
                                sm: 350,
                                md: width
                            },
                            height,
                            padding: 2
                        }
                    }}>
                        <StyledModal open={clearCartConfirmation} title="Are you sure you want to clear cart ?" purpose={"Clear Items"}
                            confirmProcess={Object.keys(buyProduct).length > 0 ? confirmClearBuyProducts : confirmClearCart} content={<></>} closeModal={() => setClearCartConfirmation(false)} />
                        <span className="position-absolute top-1 right-1 rounded-circle p-2 bg-pink-500 cursor-pointer" onClick={closeDrawer}>
                            <TfiClose size={18} className="fw-bold" cursor={"pointer"} color="white" />
                        </span>
                        <Box component={"div"} className="bg-pink-100 h-100 py-4">
                            <div className="cart-header text-center my-4">
                                <Typography className="fw-bold" variant={"h5"} color={"#000"}>
                                    Shopping Cart
                                </Typography>
                            </div>
                            {
                                Object.keys(buyProduct).length > 0 ?
                                    <List className="container-fluid">
                                        {Object.keys(buyProduct).map((buyProducy, index) => <ListItem key={`${buyProduct}-${index}`}>
                                            <Col xs={8} className="h-100">
                                                <ListItemText className="fw-bold d-flex aling-items-center gap-2 my-auto" color="pink">
                                                    <div className="">
                                                        <span className="fs-6">
                                                            {index + 1}.
                                                        </span>
                                                        <span className="fs-5 relative" style={{ textWrap: "wrap" }}>
                                                            {buyProduct[buyProducy].name}
                                                            <i className="absolute top-4 text-sm left-0">{buyProduct[buyProducy].variant}/{buyProduct[buyProducy].size}</i>
                                                        </span>
                                                    </div>
                                                </ListItemText>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-center gap-2">
                                                <span className="bg-pink-500 cursor-pointer rounded-circle p-2 justify-center flex" onClick={() => {
                                                    dispatch(addBuyproduct({ product: buyProduct[buyProducy].slug, size: buyProduct[buyProducy].size, name: buyProduct[buyProducy].name, price: buyProduct[buyProducy].price, quantity: buyProduct[buyProducy].quantity, variant: buyProduct[buyProducy].variant }));
                                                }}>
                                                    <FaPlus color="white" cursor={"pointer"} />
                                                </span>
                                                <Typography className="" variant={"h5"}>
                                                    {buyProduct[buyProducy].quantity}
                                                </Typography>
                                                <span className="bg-pink-500 cursor-pointer rounded-circle p-2 flex justify-center" onClick={() => dispatch(removeBuyProduct({ name: buyProduct[buyProducy].name, size: buyProduct[buyProducy].size, product: buyProduct[buyProducy].slug, price: buyProduct[buyProducy].price, variant: buyProduct[buyProducy].variant, quantity: buyProduct[buyProducy].quantity }))}>
                                                    <FaMinus color="white" cursor={"pointer"} />
                                                </span>
                                            </Col>
                                            <Typography className="position-absolute top-10 left-10" variant="h6">
                                                Subtotal :  ₹ {buyProduct[buyProducy].quantity * buyProduct[buyProducy].price}
                                            </Typography>
                                        </ListItem>)}
                                    </List> :
                                    Object.keys(state).length > 0 && <List className="container-fluid">
                                        {Object.keys(state)?.map((key, index) => <ListItem key={index} className="d-flex align-items-center gap-2 position-relaive my-4">
                                            <Col xs={8} className="h-100">
                                                <ListItemText className="fw-bold d-flex aling-items-center gap-2 my-auto" color="pink">
                                                    <div className="">
                                                        <span className="fs-6">
                                                            {index + 1}.
                                                        </span>
                                                        <span className="fs-5 relative" style={{ textWrap: "wrap" }}>
                                                            {state[key].name.toUpperCase()}
                                                            <i className="absolute top-4 text-sm left-0">{state[key].variant}/{state[key].size}</i>
                                                        </span>
                                                    </div>
                                                </ListItemText>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-center gap-2">
                                                <span className="bg-pink-500 cursor-pointer rounded-circle p-2 justify-center flex" onClick={() => reduxAdd({ name: state[key].name, price: state[key].price, quantity: state[key].quantity, variant: state[key].variant, size: state[key].size, product: key })}>
                                                    <FaPlus color="white" cursor={"pointer"} />
                                                </span>
                                                <Typography className="" variant={"h5"}>
                                                    {state[key].quantity}
                                                </Typography>
                                                <span className="bg-pink-500 cursor-pointer rounded-circle p-2 flex justify-center" onClick={() => reduxSubtract({ name: state[key].name, price: state[key].price, quantity: state[key].quantity, variant: state[key].variant, size: state[key].size, product: key })}>
                                                    <FaMinus color="white" cursor={"pointer"} />
                                                </span>
                                            </Col>
                                            <Typography className="position-absolute top-10 left-10" variant="h6">
                                                Subtotal :  ₹ {state[key].quantity * state[key].price}
                                            </Typography>
                                        </ListItem>)}
                                    </List>
                            }
                            {
                                Object.keys(state).length === 0 && Object.keys(buyProduct).length === 0 &&
                                <Box component={"div"} padding={"40px"} borderRadius={"10px"}>
                                    <Typography variant={"h5"} className="text-pink-500 shadow-sm p-2">
                                        Please add some items to your cart!
                                    </Typography>
                                </Box>
                            }
                            {
                                Object.keys(state).length > 0 || Object.keys(buyProduct).length > 0 ?
                                    <div className="d-flex justify-content-center gap-4 my-5">
                                        <button className="flex justify-evenly button-checkout bg-pink-400 rounded-2 p-2" onClick={checkoutandClose}>
                                            <span>
                                                <IoBagCheckOutline color="white" size={27} />
                                            </span>
                                            <span className="">
                                                <Typography color={"white"} variant={"h6"}>
                                                    Checkout
                                                </Typography>
                                            </span>
                                        </button>
                                        <button className="clear-cart bg-pink-400 p-2 rounded-2" onClick={() => setClearCartConfirmation(true)}>
                                            <Typography className="" variant="h6" color={"white"}>
                                                Clear Cart
                                            </Typography>
                                        </button>
                                    </div>
                                    : null
                            }
                        </Box>
                    </Drawer> :
                    <>
                        <div className="bg-pink-200 rounded-2 p-4 my-3">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            Object.keys(buyProduct).length > 0 ?
                                                <List>{
                                                    Object.keys(buyProduct).map((product, index) => <li key={product}>
                                                        <div className="flex align-items-center gap-3">
                                                            <div className="flex align-center justify-start gap-2">
                                                                <span className="text-muted fs-4">
                                                                    {index + 1}
                                                                </span>
                                                                <span className="text-pink-700 fs-4">
                                                                    {buyProduct[product].name.toUpperCase()}
                                                                </span>
                                                                <span className="text-pink-700 fs-4">
                                                                    {buyProduct[product].size.toUpperCase()}/
                                                                    {buyProduct[product].variant.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="flex align-items-center gap-2">
                                                                <span className="bg-pink-400 rounded-circle p-1 cursor-pointer" onClick={() => {

                                                                    dispatch(addBuyproduct({ name: buyProduct[product].name, size: buyProduct[product].size, product: buyProduct[product].slug, quantity: buyProduct[product].quantity, variant: buyProduct[product].variant, price: buyProduct[product].price }))
                                                                }
                                                                }>
                                                                    <FaPlus color="white" cursor={"pointer"} />
                                                                </span>
                                                                <Typography className="" variant="h5">
                                                                    {buyProduct[product].quantity}
                                                                </Typography>
                                                                <span className="bg-pink-400 rounded-circle p-1 cursor-pointer" onClick={() => {
                                                                    dispatch(removeBuyProduct({ name: buyProduct[product].name, product: buyProduct[product].slug, quantity: 1, price: buyProduct[product].price, variant: buyProduct[product].variant, size: buyProduct[product].size }))
                                                                }
                                                                }>
                                                                    <FaMinus color="white" cursor={"pointer"} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="subtotal-container">
                                                            <Typography className={` ${style.typographytext} text-dark`}>
                                                                SUBTOTAL:
                                                                ₹{buyProduct[product].quantity * buyProduct[product].price}
                                                            </Typography>
                                                        </div>
                                                    </li>)}
                                                </List>
                                                :
                                                <List>
                                                    {Object.keys(state).map((key: string, index: number) => <li className="flex flex-column justify-start gap-2" key={index}>
                                                        <div className="flex align-items-center gap-3">
                                                            <div className="flex align-center justify-start gap-2">
                                                                <span className="text-muted fs-4">
                                                                    {index + 1}
                                                                </span>
                                                                <span className="text-pink-700 fs-4">
                                                                    {state[key].name.toUpperCase()}
                                                                </span>
                                                                <span className="text-pink-700 fs-4">
                                                                    {state[key].size.toUpperCase()}/
                                                                    {state[key].variant.toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="flex align-items-center gap-2">
                                                                <span className="bg-pink-400 rounded-circle p-1 cursor-pointer" onClick={() => reduxAdd({ name: state[key].name, size: state[key].size, product: key, quantity: state[key].quantity, variant: state[key].variant, price: state[key].price })}>
                                                                    <FaPlus color="white" cursor={"pointer"} />
                                                                </span>
                                                                <Typography className="" variant="h5">
                                                                    {state[key].quantity}
                                                                </Typography>
                                                                <span className="bg-pink-400 rounded-circle p-1 cursor-pointer" onClick={() => reduxSubtract({ name: state[key].name, product: key, quantity: 1, price: state[key].price, variant: state[key].variant, size: state[key].size })}>
                                                                    <FaMinus color="white" cursor={"pointer"} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="subtotal-container">
                                                            <Typography className={` ${style.typographytext} text-dark`}>
                                                                SUBTOTAL:
                                                                ₹{state[key].quantity * state[key].price}
                                                            </Typography>
                                                        </div>
                                                    </li>
                                                    )}
                                                </List>
                                        }
                                        {
                                            Object.keys(state).length === 0 && Object.keys(buyProduct).length === 0 &&
                                            <Typography className="" variant="h5" color={"red"} sx={{ textShadow: "0px 0px 5px 2px red" }}>
                                                No Items ! Please add items to the cart first
                                            </Typography>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-container mb-2 w-1/6">
                            <Link href={{ pathname: "/orders" }} className="bg-pink-400 w-100 rounded-2 text-light d-flex align-items-center justify-center gap-2 p-2 mb-1">
                                <span className="">
                                    <IoBagCheckOutline color="#fff" size={27} />
                                </span>
                                <span className="fs-5">
                                    Pay
                                </span>
                                <span className="fs-5">
                                    ₹ {Object.keys(buyProduct).length > 0 ? totalAmount : amount}
                                </span>
                            </Link>
                        </div>
                    </>
            }
            <StyledToast anchorOrigin={{ vertical: "top", horiontal: "end" }} open={toast} autoHide={() => setToast(false)} message="Cart has been cleared" onClose={babaji} variant={"info"} />
        </>
    )
}
export default CustomDrawer;