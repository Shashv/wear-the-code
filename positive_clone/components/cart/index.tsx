import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import { IDrawer } from "@/modals";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import Typography from "@mui/material/Typography";
import styles from "./index.module.css";
import { Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch, IState } from "@/pages/redux/sore";
import { useState, useEffect } from "react";
import addProduct from "@/pages/redux/actions/addProduct";
import { IoBagCheckOutline } from "react-icons/io5";
import { ICartProduct } from "../../modals/index";
import clearCart from "@/pages/redux/actions/clearCart";
import Link from "next/link";
import style from "./index.module.css";
import StyledModal from "../styledpopup";
import StyledToast from "../../components/toast/index";
const CustomDrawer: React.FC<IDrawer> = ({ open, width, height, list, closeDrawer, reduxAdd, reduxSubtract, reviewCart }) => {
    const dispatch: IDispatch = useDispatch();
    let state = useSelector((state: IState) => state.productManage);
    let cartState: ICartProduct = {
        name: "",
        size: "",
        variant: "",
        price: 0,
        quantity: 0,
        product: ""
    }
    let [finalAmountPaid, setFinalAmountPaid] = useState<number>(0);
    let [clearCartConfirmation, setClearCartConfirmation] = useState<boolean>(false);
    let [toast, setToast] = useState<boolean>(false);
    const ModalContent: JSX.Element = <>

    </>
    const confirmClearCart: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
        // console.log(";KJDC KSC")
        dispatch(clearCart({}));
        setClearCartConfirmation(false);
        closeDrawer(e);
        setToast(true);
    }
    let babaji: (e: React.MouseEvent, timeOut: ReturnType<typeof setTimeout>) => void = (e, tme) => {
        // clearTimeout(tme);
        setToast(false);
    }
    useEffect(() => {
        // console.log("INSIDE THE PROCESS OF RENDERING", state);
        let productList: string[] = Object.keys(state);
        let amount: number = 0;
        productList.forEach(key => amount = amount + state[key].quantity * state[key].price);
        setFinalAmountPaid(amount);
    }, [state]);
    return (
        <>
            {
                reviewCart ?
                    <Drawer open={open} anchor={"right"} className={styles.customdrawer} onClose={closeDrawer} transitionDuration={350} PaperProps={{
                        sx: {
                            width,
                            height,
                            padding: 2
                        }
                    }}>
                        <StyledModal open={clearCartConfirmation} title="Are you sure you want to clear cart ?" purpose={"Clear Items"}
                            confirmProcess={confirmClearCart} content={<></>} closeModal={() => setClearCartConfirmation(false)} />
                        <span className="position-absolute top-1 right-1 rounded-circle p-2 bg-pink-500 cursor-pointer" onClick={closeDrawer}>
                            <TfiClose size={18} className="fw-bold" cursor={"pointer"} color="white" />
                        </span>
                        <Box component={"div"} className="bg-pink-100 h-100 py-4">
                            <div className="cart-header text-center my-4">
                                <Typography className="fw-bold" variant={"h5"} color={"#000"}>
                                    Shopping Cart
                                </Typography>
                            </div>
                            {Object.keys(state).length > 0 && <List className="container-fluid">
                                {Object.keys(state)?.map((key, index) => <ListItem key={index} className="d-flex align-items-center gap-2 position-relaive my-4">
                                    <Col xs={8} className="h-100">
                                        <ListItemText className="fw-bold d-flex aling-items-center gap-2 my-auto" color="pink">
                                            <span className="fs-6">
                                                {index + 1}.
                                            </span>
                                            <span className="fs-5" style={{ textWrap: "wrap" }}>
                                                {state[key].name.toUpperCase()}
                                            </span>
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
                            </List>}
                            {
                                Object.keys(state).length === 0 &&
                                <Box component={"div"} padding={"40px"} borderRadius={"10px"}>
                                    <Typography variant={"h5"} className="text-pink-500 shadow-sm p-2">
                                        Please add some items to your cart!
                                    </Typography>
                                </Box>
                            }
                            {
                                Object.keys(state).length > 0 &&
                                <div className="d-flex justify-content-center gap-4 my-5">
                                    <Link className="button-checkout bg-pink-400 text-light gap-2 rounded-2 d-flex align-items-center p-2" href={"/checkout"} onClick={() => closeDrawer}>
                                        <span>
                                            <IoBagCheckOutline color="white" size={27} />
                                        </span>
                                        <span className="">
                                            <Typography color={"white"} variant={"h6"}>
                                                Checkout
                                            </Typography>
                                        </span>
                                    </Link>
                                    <button className="clear-cart bg-pink-400 p-2 rounded-2" onClick={() => setClearCartConfirmation(true)}>
                                        <Typography className="" variant="h6" color={"white"}>
                                            Clear Cart
                                        </Typography>
                                    </button>
                                </div>
                            }
                        </Box>
                    </Drawer> :
                    <>
                        <div className="bg-pink-200 rounded-2 p-4 my-3">
                            {/* just for the designing purPose */}
                            {/* <button className={style.hoverbutton}>
                                Hovering Button
                                <span className={style.topleft}></span>
                                <span className={style.bottomright}></span>
                            </button> */}
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            Object.keys(state).length > 0 ?
                                                <List>
                                                    {Object.keys(state).map((key: string, index: number) => <li className="flex flex-column justify-start gap-2">
                                                        <div className="flex align-items-center gap-3">
                                                            <div className="flex align-center justify-start gap-2">
                                                                <span className="text-muted fs-4">
                                                                    {index + 1}.)
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
                                                    </li>)}
                                                </List> :
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
                                    ₹ {finalAmountPaid}
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
