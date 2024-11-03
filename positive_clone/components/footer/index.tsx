import Image from "next/image";
import React from "react";
import { Col, Row } from "reactstrap";
import styles from "./footer.module.css";
import { List, ListItem, Typography } from "@mui/material";
import { useState } from 'react';
import { useSelector } from "react-redux";
import Link from "next/link";
import { IState } from "@/pages/redux/sore";
const Footer: React.FC = () => {
    let theme: any = useSelector((state: IState) => state.toggletheme);
    let [footerList, setFooterList] = useState([{
        shop: [{ value: "TShirts", route: "tShirts" }, { value: "SweatShirts", route: "sweatShirts" }, { value: "Hoodies", route: "hoodies" }, { value: "Zipper Hodies", route: "zipperHoddies" }, { value: "Mugs", route: "mugs" }],
        customerService: [{ value: "Contact Us", route: "contactUs" }, { value: "About Us", route: "aboutUs" }, { value: "Return Policy", route: "returnPolicy" }, { value: "Shipping Policy", route: "shippingPolicy" }],
        policy: [{ value: "Privacy Policy", route: "privacyPolicy" }, { value: "Terms and Conditions", route: "termsandConditions" }]
    }]);
    return (
        <>
            <footer className={theme.dark ? `${styles.footerdark} p-2 py-4` : `${styles.footer} p-2 py-4`}>
                <Row className="flex justify-evenly">
                    <Col xs={3}>
                        <Image src={"/codeswearcircle.png"} width={80} height={80} className="rounded-circle" alt="Brand" />
                        <Typography className={theme.light ? "text-dark" : "text-light"}>
                            Wear the code Premuim coding tshirts,
                            hoodies and apparals
                        </Typography>
                    </Col>
                    <Col xs={2} className="text-lightfw-bold my-auto fs-4">
                        <Typography className={theme.light ? "font-600 text-gray-600" : "font-600 text-light"} sx={{ fontSize: "22px" }}>
                            Shirt
                        </Typography>
                        <div className="d-flex flex-column">
                            {footerList[0].shop.map((key, index) => <List dense disablePadding className="" key={index}>
                                <ListItem sx={{ fontSize: "15px" }} className="ps-0">
                                    <Link href={`/${key.route}`} className={theme.light ? "text-decoration-none text-muted hover:text-pink-400 cursor-pointer" : "text-decoration-none text-light hover:text-pink-400"}>
                                        {key.value.toUpperCase()}
                                    </Link>
                                </ListItem>
                            </List>)}
                        </div>
                    </Col>
                    <Col xs={2} className="text-light fs-4">
                        <Typography className={theme.light ? "text-gray-600 font-600" : "text-light font-600"} sx={{ fontSize: "22px" }}>
                            Customer Service
                        </Typography>
                        <div className="d-flex flex-column">
                            {footerList[0].customerService.map((key,index) => <List dense disablePadding key={index}>
                                <ListItem sx={{ fontSize: "15px" }} className="ps-0">
                                    <Link href={`/${key.route}`} className={theme.light ? "text-decoration-none text-muted cursor-pointer" : "text-light cursor-pointer text-decoration-none"}>
                                        {key.value}
                                    </Link>
                                </ListItem>
                            </List>)}
                        </div>
                    </Col>
                    <Col xs={2} className="text-light fs-4">
                        <Typography className={theme.light ? "text-gray-600" : "text-light"} sx={{ fontSize: "22px" }}>
                            Policy
                        </Typography>
                        <div className="d-flex flex-column">
                            {footerList[0].policy.map((key, index) => <List dense disablePadding key={index}>
                                <ListItem sx={{ fontSize: "15px" }} className={theme.light ? "text-gray-400 ps-0" : "text-light ps-0"}>
                                    <Link className="" href={`/${key.route}`}>
                                        {key.value}
                                    </Link>
                                </ListItem>
                            </List>)}
                        </div>
                    </Col>
                    <Col xs={2} className="text-light fw-bold my-auto fs-4">
                        <div className="">
                            <img className="" src="	https://codeswear.com/pay.png" />
                        </div>
                    </Col>
                    {/* <Col xs={2} className="text-light fw-bold my-auto fs-4">
                        Fifth
                    </Col> */}
                </Row>
            </footer>
        </>
    )
}
export default Footer;