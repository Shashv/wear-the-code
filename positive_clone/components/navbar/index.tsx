import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { INavSelected } from "@/modals";
import CustomDrawer from "../cart";
import { IDrawer } from "@/modals";
import { Tooltip, Typography } from "@mui/material";
import LogOut from "@mui/icons-material/Logout";
import Confirmation from "../styledpopup/index";
import { useDispatch, useSelector } from "react-redux";
import { IDispatch, IState } from "@/pages/redux/sore";
import addProduct from "@/pages/redux/actions/addProduct";
import removeProduct from "@/pages/redux/actions/removeProduct";
import style from "./index.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
const Navbar: React.FC<{ reduxAdd?: () => void; reduxSubtract?: () => void }> = ({ reduxAdd, reduxSubtract }) => {
    let [navlist, setNavList] = useState<INavSelected>({
        hoodies: {
            selected: false,
            value: "hoodies"
        },
        mugs: {
            selected: false,
            value: "mugs"
        },
        tshirts: {
            selected: false,
            value: "tshirts"
        },
        stickers: {
            selected: false,
            value: "stickers"
        },
        mousepads: {
            selected: false,
            value: ""
        },
        zippers: {
            selected: false,
            value: ""
        }
    });
    let [drawersettings, setDrawerSetings] = useState<IDrawer>({
        open: false,
        list: ["Tshirts", "Hoodies", "Stickers", "Mugs", "Wear the Code"],
        width: 400,
        height: "100vh",
        reduxAdd(e) {

        },
        reduxSubtract: (e) => { },
        reviewCart: false,
        closeDrawer(e) {

        },
    });
    let dispatch: IDispatch = useDispatch();
    let state = useSelector((state: IState) => state.productManage);
    let [logoutConfirmation, setLogoutConfirmation] = useState<boolean>(false);
    let confirmLogout = React.useRef<HTMLSpanElement>(null);
    let [collapseDisplay, setCollapseDisplay] = useState<boolean>(false);
    let logOutComplete: () => void = () => {
        setLogoutConfirmation(false);
    }
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap");
        confirmLogout?.current?.addEventListener("click", (e) => setLogoutConfirmation(true));
    }, []);
    return (
        <>
            <nav className={`navbar ${style.customnavbar} fixed-top navbar-expand-lg bg-dark mh-25`}>
                <div className="container-fluid d-flex justify-content-center">
                    <Tooltip title={"Home Page"}>
                        <Link className="text-light text-decoration-none navbar-brand" href={"/"} onClick={() => setNavList({ ...navlist, tshirts: { ...navlist.tshirts, selected: false, value: "tshirts" }, mugs: { ...navlist.mugs, selected: false, value: "mugs" }, hoodies: { ...navlist.hoodies, selected: false, value: "hoodies" }, stickers: { ...navlist.stickers, selected: false, value: "stickers" } })}>
                            <Image src={"/codeswearcircle.png"} className="" width={80} height={80} alt="Brand" />
                        </Link>
                    </Tooltip>
                    {collapseDisplay &&
                        <button onClick={() => setCollapseDisplay(!collapseDisplay)} className="navbar-toggler btn btn-light  ml-auto">
                            <span className="navbar-toggler-icon text-light btn btn-light p-2"></span>
                        </button>
                    }
                    {!collapseDisplay && <button className={`${style.closure} ${style.normalclosure} ml-auto`} onClick={() => setCollapseDisplay(true)}>
                        <AiFillCloseCircle color="white" size={27} />
                    </button>}
                    <div className={!collapseDisplay ? `${style.expanded} ` : `${style.collapsecontent} `}>
                        <ul className="navbar-nav nav d-flex aling-items-center">
                            <li className={navlist.tshirts.selected ? "border border-light border-top-0 border-start-0 border-end-0 border-bottom-2" : "border border-dark border-top-0 border-start-0 border-end-0 border-bottom-2 border-dark"} onClick={() => setNavList({ ...navlist, tshirts: { ...navlist.tshirts, selected: true, value: "tshirts" }, mugs: { ...navlist.mugs, selected: false, value: "mugs" }, hoodies: { ...navlist.hoodies, selected: false, value: "hoodies" }, stickers: { ...navlist.stickers, selected: false, value: "stickers" } })}>
                                <Link href={"/tShirts"} className="text-decoration-none fw-bold text-light nav-link">
                                    TShirts
                                </Link>
                            </li>
                            <li className={navlist.mugs.selected ? "border border-light border-bottom-2 border-start-0 border-end-0 border-top-0" : "border border-top-0 border-start-0 border-end-0 border-bottom-2 border-dark"} onClick={() => setNavList({ ...navlist, mugs: { ...navlist.mugs, selected: true, value: "mugs" }, stickers: { ...navlist.stickers, selected: false, value: "stickers" }, hoodies: { ...navlist.hoodies, selected: false, value: "hoodies" }, tshirts: { ...navlist.tshirts, selected: false, value: "tshirts" } })}>
                                <Link className="nav-link text-decoration-none fw-bold text-light" href={"/mugs"}>
                                    Mugs
                                </Link>
                            </li>
                            <li className={navlist.stickers.selected ? "border border-light border-top-0 border-start-0 border-end-0 border-bottom-2" : "border border-start-0 border-end-0 border-top-0 border-bottom-2 border-dark"} onClick={() => setNavList({ ...navlist, stickers: { ...navlist.stickers, selected: true, value: "sticerks" }, mugs: { ...navlist.mugs, selected: false, value: "mugs" }, hoodies: { ...navlist.hoodies, selected: false, value: "hoodies" }, tshirts: { ...navlist.tshirts, selected: false, value: "tshirts" } })}>
                                <Link className="text-light text-decoration-none fw-bold nav-link" href={"/stickers"}>
                                    Stickers
                                </Link>
                            </li>
                            <li className={navlist.hoodies.selected ? "border border-light border-top-0 border-start-0 border-end-0 border-bottom-2" : "border border-dark border-top-0 border-start-0 border-end-0 border-bottom-2"} onClick={() => setNavList({ ...navlist, hoodies: { ...navlist.hoodies, selected: true, value: "hoodies" }, mugs: { ...navlist.mugs, selected: false, value: "mugs" }, tshirts: { ...navlist.tshirts, selected: false, value: "tshirts" }, stickers: { ...navlist.stickers, selected: false, value: "stickers" } })}>
                                <Link href={"/hoodies"} className="text-decoration-none fw-bold text-light nav-link">
                                    Hoodies
                                </Link>
                            </li>
                        </ul>
                        <div className="icon-list d-flex align-items-center">
                            <Tooltip title={"Log Out"}>
                                <span className="log-out cursor-pointer" ref={confirmLogout}>
                                    <LogOut className="text-light fs-1" />
                                </span>
                            </Tooltip>
                            <Tooltip title={"View Cart"}>
                                <span className="cursor-pointer show-cart" onClick={() => setDrawerSetings({ ...drawersettings, open: true })}>
                                    <FaCartArrowDown className="" color="white" size={40} />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </nav>
            <CustomDrawer reviewCart={true} reduxAdd={(product) => {
                dispatch(addProduct({ name: product.name, size: product.size, variant: product.variant, price: product.price, product: product.product, quantity: product.quantity }))
            }} reduxSubtract={(product) => {

                dispatch(removeProduct({ name: product.name, price: product.price, variant: product.variant, size: product.size, product: product.product }))
            }} open={drawersettings.open} list={drawersettings.list} width={drawersettings.width} height={drawersettings.height} closeDrawer={(e: React.MouseEvent) => setDrawerSetings({ ...drawersettings, open: false })} />
            <Confirmation width={600} confirmProcess={logOutComplete} content={<Typography className="text-gray-500 text-center">This process can't be undone</Typography>} closeModal={() => setLogoutConfirmation(false)} open={logoutConfirmation} title="Are you sure you want to logout!" purpose="Logout" />
        </>
    )
}
export default Navbar;