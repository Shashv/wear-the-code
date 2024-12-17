import Link from "next/link";
import React, { useState } from "react";
import { CgClose, CgLogOut } from "react-icons/cg";
import style from "./index.module.css";
import { FaHamburger, FaInfo, FaInfoCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ICartProduct, ICartState, INavSelected } from "@/modals";
import { Router, useRouter } from "next/router";
import { useEffect, useRef } from "react";
import CustomDrawer from "../cart";
import addProduct from "@/redux/actions/addProduct";
import removeProduct from "@/redux/actions/removeProduct";
import { useDispatch } from "react-redux";
import StyledModal from "../styledpopup/index";
import { UnknownAction } from "redux";
import { toast } from "react-toastify";
import { LuMoon, LuMoonStar, LuSun, LuSunMoon } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import toggletheme from "@/redux/actions/theme";
import { IState } from "@/redux/sore";
import Loader from "../loader";
const StyledBar: React.FC<{ scrollTop: number }> = ({ scrollTop }) => {
    let [collapsed, setCollapsed] = React.useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    let [theme, toggleTheme] = React.useState<{ light: boolean; dark: boolean }>({ light: true, dark: false })
    let [state, setState] = React.useState<{ logout: boolean; cart: boolean }>({
        logout: false,
        cart: false
    });
    let cartState = useSelector((state: IState) => state.productManage);
    let buyProducts = useSelector((state: IState) => state.buyNow);
    let positiveTheme = useSelector((state: IState) => state.toggletheme);
    let [item, selectedItem] = React.useState<INavSelected>({
        tshirts: {
            selected: false,
            value: ""
        },
        mugs: {
            selected: false,
            value: ""
        },
        hoodies: {
            selected: false,
            value: ""
        },
        stickers: {
            selected: false,
            value: ""
        },
        mousepads: {
            selected: false,
            value: ""
        },
        zippers: {
            selected: false,
            value: "positive"
        }

    });
    let dispatch = useDispatch();
    let router = useRouter();
    let navigatePage: (page: string, item: string) => void = (page, selectItem) => {
        let findKey = Object.keys(item).find(key => key == selectItem);
    };
    let referenceElement = useRef<HTMLSpanElement>(null);
    let referenceSecond = useRef<HTMLSpanElement>(null);
    let hidedReference = useRef<HTMLSpanElement>(null);
    let hidedReferenceSecond = useRef<HTMLSpanElement>(null);
    let addProducts: (product: ICartProduct) => any = (product) => dispatch(addProduct({ name: product.name, variant: product.variant, size: product.size, quantity: product.quantity, product: product.product, price: product.price }));
    let removeProducts: (product: ICartProduct) => any = (product) => dispatch(removeProduct({ name: product.name, size: product.size, quantity: product.quantity, variant: product.variant, price: product.price, product: product.product }));
    let positiveBabaji: JSX.Element = <div className="d-flex flex-column justify-content-evenly align-items-center gap-2">
        <span>
            <FaInfoCircle color="#ec4899" size={32} />
        </span>
        <Typography className="text-muted" variant={"h5"}>
            Are you sure you want to logout!
        </Typography>
        <Typography className="text-muted text-center" variant={"subtitle1"}>
            All your unsaved data will be lost
        </Typography>
    </div>
    useEffect(() => {
        referenceElement.current?.addEventListener("click", (e) => {
            setState({ ...state, cart: true });
        });
        referenceSecond.current?.addEventListener("click", (e) => {
            setState({ ...state, logout: true });
        });
    });
    return (
        <>
            {loader ? <Loader /> :
                <>
                    <nav className={theme.light ? `px-2 bg-white ${style.custombar}` : `px-2 ${style.custombar}`} >
                        <div className=" d-flex justify-content-between align-items-center">
                            <div className={style.barcontainer}>
                                <Link className="navbar-brand fw-bold text-light" href={"/"} onClick={() => selectedItem({ ...item, mugs: { ...item.mugs, selected: false, value: "" }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, stickers: { ...item.stickers, value: "stickers", selected: false }, tshirts: { ...item.tshirts, selected: false, value: "tshirts" }, mousepads: { ...item.mousepads, selected: false, value: "mousepads" }, zippers: { ...item.zippers, selected: false, value: "zippers" } })}>
                                    <Image className="rounded-circle" alt="CodeSwear Brand" src={"https://codeswear.com/logo.png"} width={320} height={320} />
                                </Link>
                                <div className={style.searchcontainer}>
                                    <input className={positiveTheme.dark ? `rounded-1 w-full ${style.darkinput} px-2` : `rounded-1 w-full ${style.lightinput} px-2`} type="text" placeholder="Search Our Products" />
                                    <span className={`bg-pink-600 rounded-1 cursor-pointer ${style.search}`}>
                                        <FaSearch color="white" />
                                    </span>
                                </div>
                            </div>
                            <div className="icon-list position-relative d-flex align-items-center gap-4">
                                <div className={style.navlist}>
                                    <ul className="d-flex aling-items-center ms-5">
                                        <li className={item.tshirts.selected ? `${theme.dark ? style.selecteditem : style.selecteditemlight}` : `${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({
                                            ...item, tshirts: {
                                                ...item.tshirts,
                                                selected: true,
                                                value: ""
                                            }, mugs: { ...item.mugs, selected: false, value: "" }, stickers: { ...item.stickers, value: "", selected: false }, hoodies: { ...item.hoodies, value: "", selected: false }, zippers: { ...item.zippers, value: "zippers", selected: false },
                                            mousepads: { ...item.mousepads, selected: false, value: "mousepades" }
                                        })}>
                                            <Link className="text-decoration-none" href={"/tShirts"} replace>
                                                TShirts
                                            </Link>
                                        </li>
                                        <li className={item.stickers.selected ? `${theme.dark ? style.selecteditem : style.selecteditemlight}` : ` ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({ ...item, stickers: { ...item.stickers, value: "", selected: true }, mugs: { ...item.mugs, value: "mugs", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, zippers: { ...item.zippers, value: "zippers", selected: false } })}>
                                            <Link className="text-decoration-none" href={"/stickers"} replace>
                                                Stickers
                                            </Link>
                                        </li>
                                        <li className={item.mugs.selected ? `${theme.dark ? style.selecteditem : style.selecteditemlight}` : ` ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({ ...item, mugs: { ...item.mugs, value: "mugs", selected: true }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, hoodies: { ...item.hoodies, selected: false, value: "hoodies" }, stickers: { ...item.stickers, value: "stickers", selected: false }, zippers: { ...item.zippers, value: "zippers", selected: false } })}>
                                            <Link className="text-decoration-none" href={"/mugs"} replace>
                                                Mugs
                                            </Link>
                                        </li>
                                        <li className={item.hoodies.selected ? ` ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({ ...item, hoodies: { ...item.hoodies, value: "hoodies", selected: true }, tshirts: { ...item.tshirts, selected: false, value: "" }, mugs: { ...item.mugs, value: "mugs", selected: false }, stickers: { ...item.stickers, value: "stickers", selected: false }, mousepads: { ...item.mousepads, value: "mousepads", selected: false }, zippers: { ...item.zippers, value: "zippers", selected: false } })}>
                                            <Link className="text-decoration-none" href={"/hoodies"} replace>
                                                Hoodies
                                            </Link>
                                        </li>
                                        <li className={item.mousepads.selected ? ` ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({ ...item, mousepads: { ...item.mousepads, value: "Mousepads", selected: true }, tshirts: { ...item.tshirts, selected: false, value: "" }, mugs: { ...item.mugs, value: "mugs", selected: false }, stickers: { ...item.stickers, value: "stickers", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, zippers: { ...item.zippers, value: "Positive", selected: false } })}>
                                            <Link className="text-decoration-none" href={"/mousepads"} replace>
                                                Mousepads
                                            </Link>
                                        </li>
                                        <li className={item.zippers.selected ? ` ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => selectedItem({ ...item, zippers: { ...item.zippers, value: "zippers", selected: true }, tshirts: { ...item.tshirts, selected: false, value: "" }, mugs: { ...item.mugs, value: "mugs", selected: false }, stickers: { ...item.stickers, value: "stickers", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, mousepads: { ...item.mousepads, value: "mousepads", selected: false } })}>
                                            <Link className="text-decoration-none" href={"/zippers"} replace>
                                                Zippers
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="settings d-flex align-items-center gap-2">
                                    <Tooltip title={"Logout"}>
                                        <span className={style.logout} ref={referenceSecond}>
                                            <CgLogOut color={theme.dark ? "white" : "#ec4899"} size={31} cursor={"pointer"} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title={"View Cart"}>
                                        <span className={style.logout} ref={referenceElement}>
                                            <span className="badge position-absolute bg-pink-500" style={{ top: "-7.25px", right: "-7.25px", borderRadius: "50%" }}>
                                                {Object.keys(buyProducts).length > 0 ? Object.keys(buyProducts).length : Object.keys(cartState).length}
                                            </span>
                                            <FiShoppingCart color="#ec4899" size={31} cursor={"pointer"} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title={theme.light ? "Convert to Night Mode" : "Convert to Dark Mode"}>
                                        <span className={style.themeexpanded}>
                                            {theme.light ? <LuMoonStar color="#ec4899" size={27} onClick={() => {
                                                toggleTheme({ ...theme, light: false, dark: true });
                                                dispatch(toggletheme({ light: false, dark: true }));
                                            }
                                            } /> : <LuSun color="#ec4899" size={27} onClick={() => {
                                                toggleTheme({ ...theme, dark: false, light: true });
                                                dispatch(toggletheme({ light: true, dark: false }));
                                            }
                                            } />}
                                        </span>
                                    </Tooltip>
                                    <span className={!collapsed ? style.toggler : style.hidetoggle} onClick={() => setCollapsed(!collapsed)}>
                                        <IoMenu color={theme.dark ? "#ec4899" : "#000"} size={31} cursor={"pointer"} />
                                    </span> :
                                    <span className={collapsed ? style.close : style.hideclose} onClick={() => setCollapsed(!collapsed)}>
                                        <CgClose color={theme.dark ? "#ec4899" : "#000"} cursor={'pointer'} size={31} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={!collapsed ? `${style.sidebar} container-fluid` : `${style.showbar} container-fluid`}>
                            <div className={style.smallcontainer}>
                                <input className={positiveTheme.dark ? `rounded-1 w-full ${style.darkinput} px-2` : `rounded-1 w-full ${style.lightinput} px-2`} type="text" placeholder="Search Our Products" />
                                <span className={`bg-pink-600 rounded-1 cursor-pointer ${style.search}`}>
                                    <FaSearch color="white" />
                                </span>
                            </div>
                            <div className="row mt-1 justify-between">
                                <div className="col-4 flex justify-start">
                                    <ul className="" style={{ listStyleType: "none" }}>
                                        <li className={item.tshirts.selected ? `text-center ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `text-center ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => {
                                            selectedItem({
                                                ...item, mugs: { ...item.mugs, selected: false, value: "tshirts" }, stickers: {
                                                    ...item.stickers,
                                                    selected: false,
                                                    value: "stickers"
                                                }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, tshirts: { ...item.tshirts, selected: true, value: "tshirts" }, zippers: { ...item.zippers, value: "zippers", selected: false }
                                            })
                                            router.push({
                                                pathname: "/tShirts",
                                            });
                                        }}>
                                            <Link className="text-decoration-none" href={"/tShirts"} replace>
                                                TShirts
                                            </Link>
                                        </li>
                                        <li className={item.stickers.selected ? `text-center ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `text-center ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => {
                                            router.push({
                                                pathname: "/stickers"
                                            });
                                            selectedItem({ ...item, mugs: { ...item.mugs, value: "mugs", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, stickers: { ...item.stickers, value: "stickers", selected: true }, zippers: { ...item.zippers, value: "zippers", selected: false } })
                                        }}>
                                            <Link className="text-decoration-none" href={"/stickers"} replace>
                                                Stickers
                                            </Link>
                                        </li>
                                        <li className={item.mugs.selected ? `text-center ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `text-center ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => {
                                            router.push({
                                                pathname: "/mugs"
                                            });
                                            selectedItem({ ...item, stickers: { ...item.stickers, value: "stickers", selected: false }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, mugs: { ...item.mugs, value: "mugs", selected: true }, zippers: { ...item.zippers, value: "zippers", selected: false } })
                                        }}>
                                            <Link className="text-decoration-none" href={"/mugs"} replace>
                                                Mugs
                                            </Link>
                                        </li>
                                        <li className={item.hoodies.selected ? `text-center ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `text-center ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => {
                                            router.push({
                                                pathname: "/hoodies"
                                            });
                                            selectedItem({
                                                ...item, stickers: { ...item.stickers, value: "stickers", selected: false }, mugs: {
                                                    ...item.mugs,
                                                    value: "mugs", selected: false
                                                }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: true }, zippers: { ...item.zippers, selected: false, value: "zippers" }
                                            })
                                        }}>
                                            <Link className="text-decoration-none" href={"/hoodies"} replace>
                                                Hoodies
                                            </Link>
                                        </li>
                                        <li className={item.hoodies.selected ? `text-center ${theme.dark ? style.selecteditem : style.selecteditemlight}` : `text-center ${theme.dark ? style.unselecteditem : style.unselecteditemlight}`} onClick={() => {
                                            router.push({
                                                pathname: "/hoodies"
                                            });
                                            selectedItem({
                                                ...item, stickers: { ...item.stickers, value: "stickers", selected: false }, mugs: {
                                                    ...item.mugs,
                                                    value: "mugs", selected: false
                                                }, tshirts: { ...item.tshirts, value: "tshirts", selected: false }, hoodies: { ...item.hoodies, value: "hoodies", selected: false }, zippers: { ...item.zippers, selected: true, value: "Zippers" }
                                            })
                                        }}>
                                            <Link className="text-decoration-none" href={"/zippers"} replace>
                                                Zippers
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-7 flex justify-end align-center gap-2">
                                    <Tooltip title={"Logout"} sx={{ zIndex: 20 }}>
                                        <span className="cursor-pointer">
                                            <CgLogOut color={theme.light ? "#ec4899" : "#fff"} size={27} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title={"View Cart"} sx={{ zIndex: 10 }}>
                                        <span className="cursor-pointer position-relative">
                                            {Object.keys(buyProducts).length > 0 || Object.keys(cartState).length > 0 &&
                                                <Tooltip title={"View Cart"}>
                                                    <span className="text-light text-center text-sm rounded-circle w-[19px] h-[19px] bg-pink-600 position-absolute top-[-8px] end-[-10px]">
                                                        {Object.keys(buyProducts).length > 0 ? Object.keys(buyProducts).length : Object.keys(cartState).length > 0 && Object.keys(cartState).length}
                                                    </span>
                                                </Tooltip>
                                            }
                                            <FiShoppingCart onClick={(e) => setState({ ...state, cart: true })} color={theme.light ? "#ec4899" : "#fff"} size={27} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title={theme.light ? "Night Mode" : "Day Mode"} sx={{ zIndex: 10 }}>
                                        <span className="cursor-pointer">
                                            {theme.light ?
                                                <LuMoonStar color="#ec4899" size={27} onClick={() => toggleTheme({ ...theme, light: false, dark: true })} /> : <LuSunMoon onClick={() => toggleTheme({ ...theme, dark: false, light: true })} color="#ec4899" size={27} />
                                            }
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <CustomDrawer reviewCart reduxAdd={addProducts} reduxSubtract={removeProducts} open={state.cart} closeDrawer={() => setState({ ...state, cart: false })} width={400} />
                    <StyledModal open={state.logout} content={positiveBabaji} purpose="Log Out" closeModal={() => setState({ ...state, logout: false })} confirmProcess={() => {
                        setLoader(true);
                        fetch("/api/logout").then(response => response.json()).then(resp => {
                            if (resp.statusCode === 200) {
                                setLoader(false);
                                router.push("/authentication/login");
                                toast.success("LogedOut Successfully", {
                                    position: "top-right",
                                    autoClose: 2500,
                                    draggable: false,
                                    theme: "colored"
                                });
                            }
                        });

                    }} />
                </>
            }
        </>
    )
}
export default StyledBar;
//Lazy lading is the process of lazily loading the component , which is not being involved in the bundle of the static javascriot components , as a result of all the alias imports , in which all the components javascript results into the bundled minified version of the javascript files with included return type of the html , and some react js own code. Now that bundle gets compiled with the static index.html file in the public folder, all the javascript bundle is being downloaded by the browser engine , and the html being compiled with the javascript, thus  resulting in the loading of the components until all the js bundle is being compiled , with the index.html , with the help of react own js code and the jsx functions,
//Now in the lazy loading we can lazy load the component , means we cannot include the component , in the static bundle of the js , now the component is also not being compiled on the loading of the page initial , and on the reload of the page , since it will automatically make a different bundle file on the visit of the route.
//SO this will reduce the initial onload timing of the bundle execution of the static js.